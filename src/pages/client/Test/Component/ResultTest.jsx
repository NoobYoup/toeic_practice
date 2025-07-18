import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import {
    getDetailFirstUser,
    getDetailPartUser,
    getQuestionIndex,
    getAvailableParts,
} from '@/services/resultService.jsx';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

import styles from './ResultTest.module.scss';
import classNames from 'classnames/bind';
import CongratulationModal from '@/components/client/Modal/CongratulationModal.jsx';
import { useCallback } from 'react';

const cx = classNames.bind(styles);

function ResultTest() {
    const { id } = useParams();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activePart, setActivePart] = useState(1);
    // Persist global question numbering across part fetches
    const globalIndexRef = useRef({});
    const [questionIndexMap, setQuestionIndexMap] = useState(null);

    const [showCongrats, setShowCongrats] = useState(false);

    // Kiểm tra và hiển thị modal chúc mừng nếu là bài thi đầu vào và chưa từng hiện
    const checkAndShowCongrats = useCallback(
        (data) => {
            if (data?.da_hoan_thanh === true) {
                // const congratsKey = `congrats_shown_${id}`;
                // if (!localStorage.getItem(congratsKey)) {
                setShowCongrats(true);
                // localStorage.setItem(congratsKey, '1');
                // }
            }
        },
        [id],
    );

    // Parts list fetched from backend
    const [parts, setParts] = useState([]);

    // Fetch a specific part's data and merge into state
    const fetchPartData = async (partId) => {
        setLoading(true);
        try {
            let res;
            if (partId === 1) {
                res = await getDetailFirstUser(id);
            } else {
                res = await getDetailPartUser(id, partId);
            }
            const prevResult = result;
            checkAndShowCongrats(res.data?.data);

            setResult(res.data?.data);
            setActivePart(partId);
            if (!res.data?.data?.bai_thi_nguoi_dung?.cau_hoi_cua_bai_thi) {
                setResult({ ...res.data?.data, bai_thi_nguoi_dung: prevResult?.bai_thi_nguoi_dung });
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    // Pre-fetch global question index once on mount or when id changes
    useEffect(() => {
        const fetchQuestionIndex = async () => {
            try {
                const res = await getQuestionIndex(id);
                const mapping = {};
                res.data?.data?.forEach((item) => {
                    if (item.id_cau_hoi && item.thu_tu) {
                        mapping[item.id_cau_hoi] = item.thu_tu;
                    }
                });
                globalIndexRef.current = mapping; // Seed global mapping
                setQuestionIndexMap(mapping); // trigger re-render
            } catch (error) {
                console.error('Lỗi khi lấy thứ tự câu hỏi:', error);
            }
        };
        fetchQuestionIndex();
    }, [id]);

    // Process data once result or questionIndexMap is available
    const processedData = useMemo(() => {
        if (!result) return null;

        const {
            cau_tra_loi: answers,
            bai_thi_nguoi_dung: { cau_hoi_cua_bai_thi: examQuestions, ten_bai_thi, so_luong_cau_hoi },
            thoi_gian_ket_thuc,
            tong_diem,
            diem_nghe,
            diem_doc,
        } = result;

        // Map questionId -> question detail + part info for quick lookup
        const questionMap = {};
        const partMap = {};

        // Pre-fill partMap with static parts to ensure consistent ordering and indexing
        parts.forEach((p) => {
            partMap[p.id_phan] = {
                id_phan: p.id_phan,
                ten_phan: p.ten_phan,
                loai_phan: p.loai_phan || null,
                total: 0,
                correct: 0,
            };
        });

        // Build maps but skip questions that are null (e.g. chưa được seed từ backend)
        examQuestions.forEach((item) => {
            if (!item?.cau_hoi || !item.cau_hoi?.phan) return; // safeguard
            questionMap[item.cau_hoi.id_cau_hoi] = item.cau_hoi;

            const { id_phan, ten_phan, loai_phan } = item.cau_hoi.phan;
            // partMap was pre-filled; just increase total
            partMap[id_phan].total += 1;
        });

        // Counters
        let correct = 0;
        let incorrect = 0;
        let blank = 0;

        // Build enriched answers list
        const questionsDetail = answers.map((ans) => {
            const q = questionMap[ans.id_cau_hoi];
            const partId = q?.phan?.id_phan;
            let status = 'blank';
            if (ans.da_tra_loi) {
                status = ans.la_dung ? 'correct' : 'incorrect';
            }

            if (status === 'correct') {
                correct += 1;
                if (partId && partMap[partId]) {
                    partMap[partId].correct += 1;
                }
            } else if (status === 'incorrect') {
                incorrect += 1;
            } else {
                blank += 1;
            }

            return {
                ...ans,
                question: q,
                status,
                globalIndex: globalIndexRef.current[ans.id_cau_hoi] || 0,
            };
        });

        return {
            examName: ten_bai_thi,

            finishedAt: thoi_gian_ket_thuc,
            score: tong_diem,
            listeningScore: diem_nghe,
            readingScore: diem_doc,
            counts: { correct, incorrect, blank },
            parts: Object.values(partMap).sort((a, b) => a.id_phan - b.id_phan),
            examQuestions,
            questionsDetail,
            totalQuestions: so_luong_cau_hoi,
        };
    }, [result, questionIndexMap, parts]);

    // Set default active part once data loaded

    // Fetch available parts when component mounts or id changes
    useEffect(() => {
        const loadParts = async () => {
            try {
                const res = await getAvailableParts(id);
                const list = res.data?.parts || [];
                // Chỉ giữ "Part X" trước dấu ':' để hiển thị gọn
                const formatted = list.map((p) => ({ ...p, ten_phan: p.ten_phan.split(':')[0].trim() }));
                setParts(formatted);
                if (list.length) {
                    setActivePart(list[0].id_phan);
                    fetchPartData(list[0].id_phan);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách phần:', error);
            }
        };
        loadParts();
    }, [id]);

    return (
        <>
            <CongratulationModal
                isOpen={showCongrats}
                onClose={() => setShowCongrats(false)}
                totalScore={processedData?.score}
                readingScore={processedData?.readingScore}
                listeningScore={processedData?.listeningScore}
            />

            <div className="container-fluid min-vh-100 p-0">
                {loading || !processedData ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <>
                        <header className={`${cx('results-header')}`}>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h1>
                                            <i className="fas fa-chart-line me-3"></i>Kết quả: {processedData.examName}
                                        </h1>
                                        <p className="lead mb-0">
                                            Hoàn thành vào:{' '}
                                            {dayjs(processedData.finishedAt).locale('vi').format('DD/MM/YYYY - HH:mm')}
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                        <button className="btn btn-light btn-lg me-2" onClick={() => window.print()}>
                                            <i className="fas fa-print me-2"></i>In kết quả
                                        </button>
                                        <button className="btn btn-outline-light btn-lg">
                                            <i className="fas fa-share me-2"></i>Chia sẻ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Part selector */}
                        <div className="mb-3 px-3">
                            {parts.map((p) => (
                                <button
                                    key={p.id_phan}
                                    className={`${cx('part-label', {
                                        active: activePart === p.id_phan,
                                    })} me-2 border-0`}
                                    onClick={() => fetchPartData(p.id_phan)}
                                >
                                    {/* {p.ten_phan.split(':')[0]} */}
                                    {p.ten_phan}
                                </button>
                            ))}
                        </div>

                        <div className="row g-4 px-3">
                            <div className="col-lg-9">
                                {/* Question list (group Part 3 & 4 by audio) */}
                                {(() => {
                                    const questionsInPart = processedData.questionsDetail.filter(
                                        (q) => Number(q.question?.phan?.id_phan) === Number(activePart),
                                    );

                                    const isAudioGrouped = [3, 4].includes(Number(activePart));
                                    const isPassageGrouped = activePart === 6 || activePart === 7;

                                    if (!isAudioGrouped && !isPassageGrouped) {
                                        // Render as before
                                        // Find global index of each question in the full question list for stable numbering
                                        // Đảm bảo thứ tự câu hỏi đúng thứ tự xuất hiện trong danh sách gốc
                                        // Order by global index to ensure consistent numbering
                                        const orderedQuestionsInPart = [...questionsInPart].sort(
                                            (a, b) => a.globalIndex - b.globalIndex,
                                        );
                                        return orderedQuestionsInPart.map((item, idx) => (
                                            <div
                                                className={`${cx('results-container')} p-4 mb-4`}
                                                key={item.id_cau_tra_loi}
                                            >
                                                <div className="d-flex justify-content-between">
                                                    <h6>Câu {item.globalIndex}:</h6>
                                                    {item.lua_chon_da_chon === null && (
                                                        <span className="badge bg-warning px-3 py-2 mb-3 d-flex align-items-center">
                                                            Bỏ trống
                                                        </span>
                                                    )}
                                                </div>

                                                {item.question.hinh_anh && (
                                                    <div className="mb-4 text-center">
                                                        <img
                                                            src={item.question.hinh_anh.url_phuong_tien}
                                                            alt={`Question ${item.globalIndex} Image`}
                                                            className="img-fluid rounded"
                                                        />
                                                    </div>
                                                )}

                                                {item.question.noi_dung && (
                                                    <h5 className={`${cx('question-text')}`}>
                                                        {item.question.noi_dung}
                                                    </h5>
                                                )}

                                                <div className={`${cx('answer-options')}`}>
                                                    {item.question.lua_chon.map((choice) => {
                                                        const isUserChoice =
                                                            choice.ky_tu_lua_chon === item.lua_chon_da_chon;
                                                        const isCorrectChoice =
                                                            choice.ky_tu_lua_chon === item.question.dap_an_dung;
                                                        return (
                                                            <div
                                                                key={choice.ky_tu_lua_chon}
                                                                className={cx('answer-option', {
                                                                    correct: isCorrectChoice,
                                                                    'user-incorrect': isUserChoice && !item.la_dung,
                                                                })}
                                                            >
                                                                <strong>{choice.ky_tu_lua_chon}.</strong>{' '}
                                                                {choice.noi_dung}
                                                                {/* {isUserChoice && (
                                                                    <span className="badge bg-danger ms-2">
                                                                        Bạn chọn
                                                                    </span>
                                                                )}
                                                                {isCorrectChoice && (
                                                                    <span className="badge bg-success ms-2">
                                                                        Đáp án đúng
                                                                    </span>
                                                                )} */}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {item.question.giai_thich && (
                                                    <div className={`${cx('explanation-box')}`}>
                                                        <h6>
                                                            <i className="fas fa-lightbulb me-2"></i>Giải thích
                                                        </h6>
                                                        <p className="mb-0">{item.question.giai_thich}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ));
                                    }

                                    if (isAudioGrouped) {
                                        // Group by audio id
                                        const groupMap = {};
                                        questionsInPart.forEach((q) => {
                                            const audioId = q.question.am_thanh?.id_phuong_tien || 'no-audio';
                                            if (!groupMap[audioId]) {
                                                groupMap[audioId] = {
                                                    audioUrl: q.question.am_thanh?.url_phuong_tien,
                                                    questions: [],
                                                };
                                            }
                                            groupMap[audioId].questions.push(q);
                                        });

                                        // We'll rely on each question's own globalIndex and render groups in the correct order
                                        const audioGroups = Object.entries(groupMap)
                                            .map(([audioId, group]) => ({ ...group, audioId }))
                                            .sort((a, b) => a.questions[0].globalIndex - b.questions[0].globalIndex);

                                        return audioGroups.map((group) => {
                                            group.questions.sort((a, b) => a.globalIndex - b.globalIndex);
                                            return (
                                                <div
                                                    key={group.audioId}
                                                    className={`${cx('results-container')} p-4 mb-4`}
                                                >
                                                    {group.audioUrl && (
                                                        <audio controls src={group.audioUrl} className="w-100 mb-3" />
                                                    )}

                                                    {group.questions.map((item) => {
                                                        return (
                                                            <div className="mb-3" key={item.id_cau_tra_loi}>
                                                                <div className="d-flex justify-content-between">
                                                                    <h6>Câu {item.globalIndex}:</h6>
                                                                    {item.lua_chon_da_chon === null && (
                                                                        <span className="badge bg-warning px-3 py-2 mb-3 d-flex align-items-center">
                                                                            Bỏ trống
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {item.question.noi_dung && (
                                                                    <h5 className={`${cx('question-text')}`}>
                                                                        {item.question.noi_dung}
                                                                    </h5>
                                                                )}

                                                                <div className={`${cx('answer-options')}`}>
                                                                    {item.question.lua_chon.map((choice) => {
                                                                        const isUserChoice =
                                                                            choice.ky_tu_lua_chon ===
                                                                            item.lua_chon_da_chon;
                                                                        const isCorrectChoice =
                                                                            choice.ky_tu_lua_chon ===
                                                                            item.question.dap_an_dung;
                                                                        return (
                                                                            <div
                                                                                key={choice.ky_tu_lua_chon}
                                                                                className={cx('answer-option', {
                                                                                    correct: isCorrectChoice,
                                                                                    'user-incorrect':
                                                                                        isUserChoice && !item.la_dung,
                                                                                })}
                                                                            >
                                                                                <strong>
                                                                                    {choice.ky_tu_lua_chon}.
                                                                                </strong>{' '}
                                                                                {choice.noi_dung}
                                                                                {/* {isUserChoice && (
                                                                                <span className="badge bg-danger ms-2">
                                                                                    Bạn chọn
                                                                                </span>
                                                                            )}
                                                                            {isCorrectChoice && (
                                                                                <span className="badge bg-success ms-2">
                                                                                    Đáp án đúng
                                                                                </span>
                                                                            )} */}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>

                                                                {item.question.giai_thich && (
                                                                    <div className={`${cx('explanation-box')}`}>
                                                                        <h6>
                                                                            <i className="fas fa-lightbulb me-2"></i>
                                                                            Giải thích
                                                                        </h6>
                                                                        <p className="mb-0">
                                                                            {item.question.giai_thich}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        });
                                    }

                                    // Passage grouped (Part 6, 7)
                                    const passageMap = {};
                                    questionsInPart.forEach((q) => {
                                        const passageId = q.question.doan_van?.id_doan_van || 'no-passage';
                                        if (!passageMap[passageId]) {
                                            passageMap[passageId] = {
                                                passage: q.question.doan_van,
                                                questions: [],
                                            };
                                        }
                                        passageMap[passageId].questions.push(q);
                                    });

                                    // rely on globalIndex
                                    return Object.values(passageMap).map((group, idxGroup) => (
                                        <div
                                            className="card border-0 shadow mb-4"
                                            style={{ borderRadius: '10px' }}
                                            key={group.passage?.id_doan_van || `group-${idxGroup}`}
                                        >
                                            <div className="card-body">
                                                <div className="row p-2">
                                                    <div className="col-lg-8 bg-secondary-subtle rounded-3 p-4">
                                                        {group.passage && (
                                                            <div className="mb-4">
                                                                {group.passage.tieu_de && (
                                                                    <h6
                                                                        className="mb-2"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: group.passage.tieu_de,
                                                                        }}
                                                                    ></h6>
                                                                )}

                                                                {/* Nội dung đoạn văn */}
                                                                {group.passage.noi_dung && (
                                                                    <div
                                                                        className="mb-2"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: group.passage.noi_dung,
                                                                        }}
                                                                    ></div>
                                                                )}

                                                                {/* Passage media */}
                                                                {Array.isArray(group.passage.danh_sach_phuong_tien) &&
                                                                    group.passage.danh_sach_phuong_tien.length > 0 && (
                                                                        <div className="d-flex flex-wrap gap-3 mb-2">
                                                                            {group.passage.danh_sach_phuong_tien.map(
                                                                                (media) => {
                                                                                    const isImage =
                                                                                        /\.(jpeg|jpg|gif|png)$/.test(
                                                                                            media.url_phuong_tien,
                                                                                        );
                                                                                    const isAudio =
                                                                                        /\.(mp3|wav|ogg)$/.test(
                                                                                            media.url_phuong_tien,
                                                                                        );

                                                                                    if (isImage) {
                                                                                        return (
                                                                                            <img
                                                                                                key={
                                                                                                    media.id_phuong_tien
                                                                                                }
                                                                                                src={
                                                                                                    media.url_phuong_tien
                                                                                                }
                                                                                                alt="passage"
                                                                                                className="img-fluid rounded border"
                                                                                                style={{
                                                                                                    maxWidth: '100%',
                                                                                                }}
                                                                                            />
                                                                                        );
                                                                                    }

                                                                                    if (isAudio) {
                                                                                        return (
                                                                                            <audio
                                                                                                key={
                                                                                                    media.id_phuong_tien
                                                                                                }
                                                                                                controls
                                                                                                className="w-100"
                                                                                            >
                                                                                                <source
                                                                                                    src={
                                                                                                        media.url_phuong_tien
                                                                                                    }
                                                                                                    type="audio/mpeg"
                                                                                                />
                                                                                                Audio not supported.
                                                                                            </audio>
                                                                                        );
                                                                                    }

                                                                                    return null;
                                                                                },
                                                                            )}
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-lg-4">
                                                        {group.questions
                                                            .sort((a, b) => a.globalIndex - b.globalIndex)
                                                            .map((item) => {
                                                                return (
                                                                    <div
                                                                        key={item.id_cau_tra_loi}
                                                                        id={`question-${item.globalIndex}`}
                                                                        className="mb-4"
                                                                    >
                                                                        <div className="d-flex justify-content-between">
                                                                            <h6 className="mb-2">
                                                                                Câu {item.globalIndex}:
                                                                            </h6>
                                                                            {item.lua_chon_da_chon === null && (
                                                                                <span className="badge bg-warning px-3 py-2 mb-3 d-flex align-items-center">
                                                                                    Bỏ trống
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        {/* Question content */}
                                                                        {item.question.noi_dung && (
                                                                            <p
                                                                                className="fw-semibold"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: item.question.noi_dung,
                                                                                }}
                                                                            ></p>
                                                                        )}

                                                                        <div className={`${cx('answer-options')}`}>
                                                                            {item.question.lua_chon.map((choice) => {
                                                                                const isUserChoice =
                                                                                    choice.ky_tu_lua_chon ===
                                                                                    item.lua_chon_da_chon;
                                                                                const isCorrectChoice =
                                                                                    choice.ky_tu_lua_chon ===
                                                                                    item.question.dap_an_dung;
                                                                                return (
                                                                                    <div
                                                                                        key={choice.ky_tu_lua_chon}
                                                                                        className={cx('answer-option', {
                                                                                            correct: isCorrectChoice,
                                                                                            'user-incorrect':
                                                                                                isUserChoice &&
                                                                                                !item.la_dung,
                                                                                        })}
                                                                                    >
                                                                                        <strong>
                                                                                            {choice.ky_tu_lua_chon}.
                                                                                        </strong>{' '}
                                                                                        {choice.noi_dung}
                                                                                        {/* {isUserChoice && (
                                                                                        <span className="badge bg-danger ms-2">
                                                                                            Bạn chọn
                                                                                        </span>
                                                                                    )}
                                                                                    {isCorrectChoice && (
                                                                                        <span className="badge bg-success ms-2">
                                                                                            Đáp án đúng
                                                                                        </span>
                                                                                    )} */}
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                            <div className="col-lg-3">
                                <div className={cx('sidebar-container')}>
                                    <div className={`${cx('score-card')}`}>
                                        <div className={`${cx('score-number')}`}>{processedData.score}</div>
                                        <h4>Tổng điểm TOEIC</h4>
                                        <div className="row text-center mt-3">
                                            <div className="col-6">
                                                <div className="h5 mb-1">{processedData.listeningScore}</div>
                                                <small>Listening</small>
                                            </div>
                                            <div className="col-6">
                                                <div className="h5 mb-1">{processedData.readingScore}</div>
                                                <small>Reading</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${cx('section-score')}`}>
                                        <h5 className="mb-3">
                                            <i className="fas fa-chart-pie me-2"></i>Tổng quan kết quả
                                        </h5>
                                        <div className="row text-center mb-3">
                                            <div className="col-4">
                                                <div className="h4 text-success">{processedData.counts.correct}</div>
                                                <small className="text-muted">Đúng</small>
                                            </div>
                                            <div className="col-4">
                                                <div className="h4 text-danger">{processedData.counts.incorrect}</div>
                                                <small className="text-muted">Sai</small>
                                            </div>
                                            <div className="col-4">
                                                <div className="h4 text-secondary">{processedData.counts.blank}</div>
                                                <small className="text-muted">Bỏ trống</small>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Part stats */}
                                    {['listening', 'reading'].map((type) => {
                                        const icon = type === 'listening' ? 'fa-headphones' : 'fa-book-open';
                                        const partsOfType = processedData.parts.filter((p) => p.loai_phan === type);
                                        if (partsOfType.length === 0) return null;

                                        return (
                                            <div key={type} className={cx('section-score')}>
                                                <h5 className="mb-3">
                                                    <i className={`fas ${icon} me-2`}></i>
                                                    {type === 'listening' ? 'Listening Section' : 'Reading Section'}
                                                </h5>
                                                {partsOfType.map((p) => (
                                                    <div key={p.id_phan} className="row mb-2">
                                                        <div className="col">{p.ten_phan.split(':')[0]}:</div>
                                                        <div className="col-auto">
                                                            <span className="badge bg-success">
                                                                {p.correct}/{p.total}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}

                                    <div className={`${cx('legend')}`}>
                                        <h6 className="mb-3">Chú thích</h6>
                                        <div className={`${cx('legend-item')}`}>
                                            <div className={`${cx('legend-color')} bg-success`}></div>
                                            <small>Câu trả lời đúng</small>
                                        </div>
                                        <div className={`${cx('legend-item')}`}>
                                            <div className={`${cx('legend-color')} bg-danger`}></div>
                                            <small>Câu trả lời sai</small>
                                        </div>
                                        <div className={`${cx('legend-item')}`}>
                                            <div className={`${cx('legend-color')} bg-warning`}></div>
                                            <small>Câu bỏ trống</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ResultTest;
