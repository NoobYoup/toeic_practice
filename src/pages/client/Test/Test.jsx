import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDetailExamPublic } from '@/services/examService';
import { submitExamToResult } from '@/services/resultService';
import { jwtDecode } from 'jwt-decode';
import PartWrapper from './Part/PartWrapper.jsx';
import Part3Test from './Part/Part3Test.jsx';
import Part4Test from './Part/Part4Test.jsx';
import Part6Test from './Part/Part6Test.jsx';
import Part7Test from './Part/Part7Test.jsx';
import { toast } from 'react-toastify';
import { chamDiemToeic } from '@/utils/toeicScoring';
import styles from './Test.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Test() {
    const location = useLocation();
    const { examId } = location.state || {};
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPart, setCurrentPart] = useState(1);
    const [scrollTarget, setScrollTarget] = useState(null);
    const [remainingSeconds, setRemainingSeconds] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answers, setAnswers] = useState({});

    // Sử dụng useRef để tránh vòng lặp vô hạn
    const lastPathnameRef = useRef(location.pathname);
    const isNavigatingRef = useRef(false);
    const isInitialMountRef = useRef(true);

    // Hàm xóa dữ liệu tạm khi nộp bài thành công hoặc hết giờ - tối ưu bằng useCallback
    const clearDraft = useCallback(() => {
        if (!examId) return;
        const draftKey = `toeic_exam_${examId}_draft`;
        localStorage.removeItem(draftKey);
    }, [examId]);

    // Cảnh báo khi rời trang nếu đã có đáp án
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (Object.keys(answers).length > 0) {
                e.preventDefault();
                e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang? Đáp án tạm thời sẽ bị xóa.';
                return e.returnValue;
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [answers]);

    // Theo dõi pathname, chặn chuyển route nếu đã có đáp án
    useEffect(() => {
        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            return;
        }
        if (isNavigatingRef.current) {
            return;
        }
        if (location.pathname === lastPathnameRef.current) {
            return;
        }
        const answersCount = Object.keys(answers).length;
        if (answersCount > 0) {
            const confirmLeave = window.confirm('Bạn có chắc chắn muốn rời khỏi trang? Đáp án tạm thời sẽ bị xóa.');
            if (confirmLeave) {
                clearDraft();
                lastPathnameRef.current = location.pathname;
            } else {
                isNavigatingRef.current = true;
                navigate(lastPathnameRef.current, { replace: true });
                setTimeout(() => {
                    isNavigatingRef.current = false;
                }, 100);
            }
        } else {
            lastPathnameRef.current = location.pathname;
        }
    }, [location.pathname, clearDraft, navigate, answers]);

    // Lưu đáp án và thời gian còn lại vào localStorage
    useEffect(() => {
        if (!examId) return;
        if (Object.keys(answers).length === 0 || !remainingSeconds) return;
        const draftKey = `toeic_exam_${examId}_draft`;
        const draftData = {
            answers,
            remainingSeconds,
            savedAt: Date.now(),
        };
        localStorage.setItem(draftKey, JSON.stringify(draftData));
    }, [answers, remainingSeconds, examId]);

    // // Thêm một useEffect để theo dõi sự thay đổi của answers và log ra
    // useEffect(() => {
    //     const answersCount = Object.keys(answers).length;
    //     console.log('Answers state changed:', {
    //         answersCount: answersCount,
    //         hasAnswers: answersCount > 0,
    //         answers: answers,
    //     });
    // }, [answers]);

    // // Thêm một useEffect để theo dõi sự thay đổi của location
    // useEffect(() => {
    //     console.log('Location changed:', {
    //         pathname: location.pathname,
    //         lastPathname: lastPathnameRef.current,
    //         isNavigating: isNavigatingRef.current,
    //     });
    // }, [location.pathname]);

    // Chặn click trên các Link khi có đáp án
    useEffect(() => {
        const answersCount = Object.keys(answers).length;
        if (answersCount === 0) return;
        const handleLinkClick = (event) => {
            const target = event.target.closest('a[href], [data-router-link]');
            if (target) {
                const confirmLeave = window.confirm('Bạn có chắc chắn muốn rời khỏi trang? Đáp án tạm thời sẽ bị xóa.');
                if (confirmLeave) {
                    clearDraft();
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        document.addEventListener('click', handleLinkClick, true);
        return () => {
            document.removeEventListener('click', handleLinkClick, true);
        };
    }, [answers, clearDraft]);

    // Chặn keyboard navigation (Alt+Left/Right)
    useEffect(() => {
        const answersCount = Object.keys(answers).length;
        if (answersCount === 0) return;
        const handleKeyDown = (event) => {
            if (event.altKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                const confirmLeave = window.confirm('Bạn có chắc chắn muốn rời khỏi trang? Đáp án tạm thời sẽ bị xóa.');
                if (confirmLeave) {
                    clearDraft();
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [answers, clearDraft]);

    // Override history methods để chặn navigation
    useEffect(() => {
        const answersCount = Object.keys(answers).length;
        if (answersCount === 0) return;
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;
        const originalBack = window.history.back;
        const originalForward = window.history.forward;
        const handleNavigation = (method, ...args) => {
            const confirmLeave = window.confirm('Bạn có chắc chắn muốn rời khỏi trang? Đáp án tạm thời sẽ bị xóa.');
            if (confirmLeave) {
                clearDraft();
                if (method === 'pushState') {
                    originalPushState.apply(window.history, args);
                } else if (method === 'replaceState') {
                    originalReplaceState.apply(window.history, args);
                } else if (method === 'back') {
                    originalBack.apply(window.history, args);
                } else if (method === 'forward') {
                    originalForward.apply(window.history, args);
                }
            }
        };
        window.history.pushState = (...args) => handleNavigation('pushState', ...args);
        window.history.replaceState = (...args) => handleNavigation('replaceState', ...args);
        window.history.back = (...args) => handleNavigation('back', ...args);
        window.history.forward = (...args) => handleNavigation('forward', ...args);
        return () => {
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
            window.history.back = originalBack;
            window.history.forward = originalForward;
        };
    }, [answers, clearDraft]);

    // Thêm một cách tiếp cận mạnh mẽ hơn - sử dụng unload event
    useEffect(() => {
        const answersCount = Object.keys(answers).length;
        if (answersCount === 0) return;

        const handleUnload = () => {
            console.log('Unload event detected, clearing draft');
            clearDraft();
        };

        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('unload', handleUnload);
        };
    }, [answers, clearDraft]);

    // load bài làm
    const fetchExam = async () => {
        setLoading(true);
        try {
            const res = await getDetailExamPublic(examId);

            setExam(res.data.data);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!examId) {
            setLoading(false);
            return;
        }
        fetchExam();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examId]);

    // Khi load xong exam, kiểm tra và load dữ liệu tạm nếu có
    useEffect(() => {
        if (!examId || !exam) return;
        const draftKey = `toeic_exam_${examId}_draft`;
        const draftStr = localStorage.getItem(draftKey);
        if (draftStr) {
            try {
                const draft = JSON.parse(draftStr);
                if (draft && draft.remainingSeconds > 0 && draft.answers) {
                    // console.log('Loading draft data:', draft);
                    setAnswers(draft.answers);
                    setRemainingSeconds(draft.remainingSeconds);
                    return; // Nếu có dữ liệu tạm thì không set lại timer mặc định
                }
            } catch (error) {
                console.error('Error parsing draft data:', error);
                // Nếu lỗi parse thì bỏ qua
            }
        }
        // Nếu không có dữ liệu tạm thì set timer mặc định
        const durationMinutes = exam.thoi_gian_bai_thi || exam.thoi_gian_thi;
        if (durationMinutes) {
            setRemainingSeconds(durationMinutes * 60);
        }
    }, [examId, exam]);

    // xử lý nộp bài
    const handleSubmit = useCallback(async () => {
        if (!exam || !Array.isArray(exam.cau_hoi_cua_bai_thi)) return;

        const token = localStorage.getItem('user_token');
        if (!token) {
            toast.error('Bạn cần đăng nhập lại.');
            return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id_nguoi_dung;

        // === B1: Chuẩn bị danh sách câu hỏi đầy đủ ===
        const allQuestions = exam.cau_hoi_cua_bai_thi.map((item) => ({
            id_cau_hoi: item.cau_hoi.id_cau_hoi,
            dap_an_dung: item.cau_hoi.dap_an_dung,
            phan: { loai_phan: item.cau_hoi.phan?.loai_phan || 'reading' },
        }));

        // === B2: Chuẩn bị câu trả lời người dùng ===
        const userAnswers = allQuestions.map((q) => ({
            id_cau_hoi: q.id_cau_hoi,
            lua_chon_da_chon: answers[q.id_cau_hoi] || '',
        }));

        // === B3: Chấm điểm bằng hàm chamDiemToeic ===
        const result = chamDiemToeic(allQuestions, userAnswers); // { diemNghe, diemDoc, tongDiem, chiTietCauTraLoi }

        const payload = {
            id_nguoi_dung: userId,
            id_bai_thi: exam.id_bai_thi,
            diem_nghe: result.diemNghe,
            diem_doc: result.diemDoc,
            tong_diem: result.tongDiem,
            chi_tiet_cau_tra_loi: result.chiTietCauTraLoi, // [{id_cau_hoi, lua_chon_da_chon, la_dung, da_tra_loi}]
        };

        setIsSubmitting(true);

        try {
            const res = await submitExamToResult(payload); // POST tới /api/results/submit-from-fe
            toast.success('Nộp bài thành công! Kết quả của bạn đã được lưu.');

            clearDraft(); // Xóa dữ liệu tạm khi nộp bài thành công

            navigate(`/result-test/${res.data.data.id_bai_lam_nguoi_dung}`, { state: { result: res.data.data } });
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Có lỗi xảy ra khi nộp bài';
            toast.error(msg);
        }

        setIsSubmitting(false);
    }, [exam, answers, navigate, clearDraft]); // Dependencies cho useCallback

    // thời gian đếm ngược - tối ưu dependencies
    useEffect(() => {
        if (!exam || remainingSeconds == null || remainingSeconds <= 0) return;

        const intervalId = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(intervalId);
                    handleSubmit(); // tự động nộp bài khi hết thời gian
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [exam, remainingSeconds, handleSubmit]); // Thêm handleSubmit vào dependencies

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // tính thông tin mỗi part
    const { partInfos, listeningParts, readingParts, listeningTotal, readingTotal } = useMemo(() => {
        if (!exam || !Array.isArray(exam.cau_hoi_cua_bai_thi)) {
            return { partInfos: [], listeningParts: [], readingParts: [], listeningTotal: 0, readingTotal: 0 };
        }

        // Tính số lượng câu hỏi mỗi part
        const questionCounts = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pId = item.cau_hoi.id_phan;
            questionCounts[pId] = (questionCounts[pId] || 0) + 1;
        });

        // Tạo thông tin cho từng part
        const partInfos = [];
        let currentNumber = 1;
        for (let part = 1; part <= 7; part += 1) {
            const count = questionCounts[part] || 0;
            if (count > 0) {
                partInfos.push({ part, count, start: currentNumber, end: currentNumber + count - 1 });
                currentNumber += count;
            }
        }

        // Phân loại Listening và Reading
        const listeningParts = partInfos.filter((p) => p.part <= 4);
        const readingParts = partInfos.filter((p) => p.part >= 5);
        const listeningTotal = listeningParts.reduce((sum, p) => sum + p.count, 0);
        const readingTotal = readingParts.reduce((sum, p) => sum + p.count, 0);

        return { partInfos, listeningParts, readingParts, listeningTotal, readingTotal };
    }, [exam]);

    // ánh xạ số thứ tự câu hỏi -> id câu hỏi
    const numberToQuestionId = useMemo(() => {
        if (!exam || !Array.isArray(exam.cau_hoi_cua_bai_thi)) return {};
        const byPart = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const part = item.cau_hoi.id_phan;
            if (!byPart[part]) byPart[part] = [];
            byPart[part].push(item.cau_hoi);
        });
        const map = {};
        let num = 1;
        for (let part = 1; part <= 7; part += 1) {
            if (byPart[part]) {
                byPart[part].forEach((q) => {
                    map[num] = q.id_cau_hoi;
                    num += 1;
                });
            }
        }
        return map;
    }, [exam]);

    // xử lý chuyển câu hỏi
    const handleJumpToQuestion = (part, number) => {
        if (currentPart !== part) {
            setCurrentPart(part);
        }
        setScrollTarget(number);
    };

    useEffect(() => {
        if (scrollTarget != null) {
            const el = document.getElementById(`question-${scrollTarget}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setScrollTarget(null);
        }
    }, [currentPart, scrollTarget]);

    // xử lý chọn đáp án
    const handleAnswerSelect = (questionId, choiceLetter) => {
        // console.log('Answer selected:', { questionId, choiceLetter });
        // console.log('Current answers count:', Object.keys(answers).length);
        setAnswers((prev) => {
            const newAnswers = { ...prev, [questionId]: choiceLetter };
            // console.log('New answers count:', Object.keys(newAnswers).length);
            return newAnswers;
        });
    };

    // render component tương ứng với part hiện tại
    const renderCurrentPart = () => {
        const props = { exam, selectedAnswers: answers, onSelectAnswer: handleAnswerSelect };

        // Các part đơn giản sử dụng PartWrapper
        if ([1, 2, 5].includes(currentPart)) {
            return <PartWrapper partId={currentPart} {...props} />;
        }

        // Các part phức tạp sử dụng component riêng
        switch (currentPart) {
            case 3:
                return <Part3Test {...props} />;
            case 4:
                return <Part4Test {...props} />;
            case 6:
                return <Part6Test {...props} />;
            case 7:
                return <Part7Test {...props} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (remainingSeconds === 0) {
            clearDraft(); // Xóa dữ liệu tạm khi hết giờ
        }
    }, [remainingSeconds, clearDraft]);

    if (loading) {
        return (
            <div className="text-center py-5 min-vh-100 d-flex flex-column ">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    if (!exam) {
        return (
            <div className="text-center py-5 min-vh-100 d-flex flex-column ">
                <p className="text-muted">Không tìm thấy bài thi!</p>
            </div>
        );
    }

    return (
        <>
            <h3 className="text-center my-3">{exam.ten_bai_thi}</h3>
            <div className="container-fluid mb-5 main-content">
                {/* Buttons chọn part */}
                {partInfos.map(({ part }) => (
                    <button
                        key={part}
                        className={cx('part-label', 'border-0', 'mt-3', 'me-2', { active: currentPart === part })}
                        onClick={() => setCurrentPart(part)}
                    >
                        {`PART ${part}`}
                    </button>
                ))}

                <div className="row g-4">
                    {/* Nội dung câu hỏi */}
                    <div className="col-lg-9">{renderCurrentPart()}</div>

                    {/* Thanh điều hướng câu hỏi */}
                    <div className="col-lg-3">
                        <div className={cx('sidebar-container')}>
                            <div className="shadow p-4 my-4" style={{ borderRadius: '10px' }}>
                                {/* Timer placeholder */}
                                <div className={`${cx('timer-container')} mb-4`}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="mb-0">Thời gian còn lại</h5>
                                    </div>
                                    <div className={`${cx('timer')} text-center`}>
                                        {remainingSeconds !== null ? formatTime(remainingSeconds) : '--:--'}
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mb-4">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && <i className="fas fa-spinner fa-spin me-2"></i>}
                                        Nộp bài
                                    </button>
                                </div>

                                <div className={`${cx('question-nav')}`}>
                                    {/* Hàm helper để render navigation cho từng section */}
                                    {(() => {
                                        const renderPartNavigation = (parts, title, total) => {
                                            if (parts.length === 0) return null;

                                            return (
                                                <>
                                                    <h5 className="mb-3">
                                                        {title} ({total} câu)
                                                    </h5>
                                                    {parts.map((p) => (
                                                        <div key={`part-${p.part}`} className="mb-3">
                                                            <div className="mb-2">
                                                                <strong>
                                                                    Part {p.part}: Questions {p.start}-{p.end}
                                                                </strong>
                                                            </div>
                                                            <div className="mb-2">
                                                                {Array.from({ length: p.count }).map((_, idx) => {
                                                                    const number = p.start + idx;
                                                                    const qId = numberToQuestionId[number];
                                                                    const answered = !!answers[qId];
                                                                    return (
                                                                        <button
                                                                            type="button"
                                                                            key={number}
                                                                            className={cx(
                                                                                'question-number',
                                                                                'border-0',
                                                                                {
                                                                                    answered: answered,
                                                                                },
                                                                            )}
                                                                            onClick={() =>
                                                                                handleJumpToQuestion(p.part, number)
                                                                            }
                                                                        >
                                                                            {number}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {title === 'Listening' && <hr />}
                                                </>
                                            );
                                        };

                                        return (
                                            <>
                                                {/* Listening Section */}
                                                {renderPartNavigation(listeningParts, 'Listening', listeningTotal)}

                                                {/* Reading Section */}
                                                {renderPartNavigation(readingParts, 'Reading', readingTotal)}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Test;
