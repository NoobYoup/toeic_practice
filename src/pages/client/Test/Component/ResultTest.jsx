import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
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
import QuestionResult from './QuestionResult.jsx';
import AudioGroupResult from './AudioGroupResult.jsx';
import PassageGroupResult from './PassageGroupResult.jsx';

const cx = classNames.bind(styles);

function ResultTest() {
    const { id } = useParams();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activePart, setActivePart] = useState(1);
    // lưu số thứ tự câu hỏi
    const globalIndexRef = useRef({});
    const [questionIndexMap, setQuestionIndexMap] = useState(null);

    const [showCongrats, setShowCongrats] = useState(false);

    // Kiểm tra và hiển thị modal chúc mừng nếu là bài thi đầu vào và chưa từng hiện
    const checkAndShowCongrats = useCallback(
        (data) => {
            if (data?.da_hoan_thanh === true) {
                const congratsKey = `modal_chuc_mung_${id}`;
                if (!localStorage.getItem(congratsKey)) {
                    setShowCongrats(true);
                    localStorage.setItem(congratsKey, '1');
                }
            }
        },
        [id],
    );

    // danh sách phần
    const [parts, setParts] = useState([]);

    // load api từ backend dữ liệu phần
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

    // lấy số thứ tự câu hỏi
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
                globalIndexRef.current = mapping;
                setQuestionIndexMap(mapping); // lưu số thứ tự câu hỏi
            } catch (error) {
                console.error('Lỗi khi lấy thứ tự câu hỏi:', error);
            }
        };
        fetchQuestionIndex();
    }, [id]);

    // xử lý dữ liệu
    const processedData = useMemo(() => {
        if (!result) return null;

        const {
            cau_tra_loi: answers,
            bai_thi_nguoi_dung: { cau_hoi_cua_bai_thi, ten_bai_thi, so_luong_cau_hoi },
            thoi_gian_ket_thuc,
            tong_diem,
            diem_nghe,
            diem_doc,
        } = result;

        // ánh xạ id câu hỏi -> chi tiết câu hỏi + thông tin phần
        const questionMap = {};
        const partMap = {};

        // lưu thông tin phần
        parts.forEach((p) => {
            partMap[p.id_phan] = {
                id_phan: p.id_phan,
                ten_phan: p.ten_phan,
                loai_phan: p.loai_phan || null,
                total: 0,
                correct: 0,
            };
        });

        // lưu thông tin câu hỏi
        cau_hoi_cua_bai_thi.forEach((item) => {
            if (!item?.cau_hoi || !item.cau_hoi?.phan) return; // bảo vệ
            questionMap[item.cau_hoi.id_cau_hoi] = item.cau_hoi;

            const { id_phan } = item.cau_hoi.phan;
            // partMap đã được lưu trước; chỉ tăng tổng số câu hỏi của phần đó
            partMap[id_phan].total += 1;
        });

        // đếm số câu trả lời đúng, sai, bỏ trống
        let correct = 0;
        let incorrect = 0;
        let blank = 0;

        // lưu thông tin câu hỏi
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
            cau_hoi_cua_bai_thi,
            questionsDetail,
            totalQuestions: so_luong_cau_hoi,
        };
    }, [result, questionIndexMap, parts]);

    // lấy phần mặc định

    // lấy danh sách phần
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
                                        // sắp xếp câu hỏi theo số thứ tự câu hỏi
                                        const orderedQuestionsInPart = [...questionsInPart].sort(
                                            (a, b) => a.globalIndex - b.globalIndex,
                                        );
                                        return orderedQuestionsInPart.map((item) => (
                                            <QuestionResult key={item.id_cau_tra_loi} item={item} cx={cx} />
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

                                        // sắp xếp câu hỏi theo số thứ tự câu hỏi
                                        const audioGroups = Object.entries(groupMap)
                                            .map(([audioId, group]) => ({ ...group, audioId }))
                                            .sort((a, b) => a.questions[0].globalIndex - b.questions[0].globalIndex);

                                        return audioGroups.map((group) => (
                                            <AudioGroupResult key={group.audioId} group={group} cx={cx} />
                                        ));
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

                                    // sắp xếp câu hỏi theo số thứ tự câu hỏi
                                    return Object.values(passageMap).map((group, idxGroup) => (
                                        <PassageGroupResult
                                            key={group.passage?.id_doan_van || `group-${idxGroup}`}
                                            group={group}
                                            cx={cx}
                                        />
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
