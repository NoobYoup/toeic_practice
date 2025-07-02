import styles from './Test.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDetailExamPublic } from '@/services/examService';
import { submitResult } from '@/services/resultService';
import { jwtDecode } from 'jwt-decode';
import Part1Test from './Part/Part1Test.jsx';
import Part2Test from './Part/Part2Test.jsx';
import Part3Test from './Part/Part3Test.jsx';
import Part4Test from './Part/Part4Test.jsx';
import Part5Test from './Part/Part5Test.jsx';
import Part6Test from './Part/Part6Test.jsx';
import Part7Test from './Part/Part7Test.jsx';
import { toast } from 'react-toastify';

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
    const [submitError, setSubmitError] = useState(null);

    /* ------------------------------------------------------------ */
    /* FETCH EXAM                                                   */
    /* ------------------------------------------------------------ */
    useEffect(() => {
        if (!examId) {
            setLoading(false);
            return;
        }
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
        fetchExam();
    }, [examId]);

    /* ------------------------------------------------------------ */
    /* COUNTDOWN TIMER                                              */
    /* ------------------------------------------------------------ */
    useEffect(() => {
        if (!exam) return;
        const durationMinutes = exam.thoi_gian_bai_thi || exam.thoi_gian_thi;
        if (!durationMinutes) return;

        setRemainingSeconds(durationMinutes * 60);

        const intervalId = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev === null) return prev;
                if (prev <= 1) {
                    clearInterval(intervalId);
                    handleSubmit(); // tự động nộp bài khi hết thời gian
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [exam]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    /* ------------------------------------------------------------ */
    /* TÍNH THÔNG TIN MỖI PART                                      */
    /* ------------------------------------------------------------ */
    const questionCounts = {};
    if (exam && Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pId = item.cau_hoi.id_phan;
            questionCounts[pId] = (questionCounts[pId] || 0) + 1;
        });
    }

    const partInfos = [];
    let currentNumber = 1;
    for (let part = 1; part <= 7; part += 1) {
        const count = questionCounts[part] || 0;
        if (count > 0) {
            partInfos.push({ part, count, start: currentNumber, end: currentNumber + count - 1 });
            currentNumber += count;
        }
    }

    const listeningParts = partInfos.filter((p) => p.part <= 4);
    const readingParts = partInfos.filter((p) => p.part >= 5);
    const listeningTotal = listeningParts.reduce((sum, p) => sum + p.count, 0);
    const readingTotal = readingParts.reduce((sum, p) => sum + p.count, 0);

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

    const renderCurrentPart = () => {
        const props = { exam };
        switch (currentPart) {
            case 1:
                return <Part1Test {...props} />;
            case 2:
                return <Part2Test {...props} />;
            case 3:
                return <Part3Test {...props} />;
            case 4:
                return <Part4Test {...props} />;
            case 5:
                return <Part5Test {...props} />;
            case 6:
                return <Part6Test {...props} />;
            case 7:
                return <Part7Test {...props} />;
            default:
                return null;
        }
    };

    const buildAnswerPayload = () => {
        const checked = document.querySelectorAll('input[type="radio"]:checked');
        const answers = Array.from(checked).map((el) => {
            const idStr = el.name.split('_')[1];
            return { id_cau_hoi: Number(idStr), ky_tu_lua_chon: el.value };
        });
        return answers;
    };

    const handleSubmit = async () => {
        if (!exam) return;

        const token = localStorage.getItem('user_token');
        if (!token) {
            setSubmitError('Bạn cần đăng nhập lại.');
            return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id_nguoi_dung;

        const payload = {
            id_nguoi_dung: userId,
            id_bai_thi: exam.id_bai_thi,
            answers: buildAnswerPayload(),
        };

        console.log(payload);

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const res = await submitResult(payload);
            console.log(res);
            // xử lý khi nộp bài thi
            toast.success(res.message);
            navigate('/list-test');
        } catch (err) {
            console.log(err);
            setSubmitError(err.response?.data?.message || 'Có lỗi xảy ra khi nộp bài');
        }
        setIsSubmitting(false);
        toast.error(submitError);
    };

    const handleExit = () => {
        // xử lý khi thoát bài thi
        navigate('/list-test');
        window.location.reload();
    };

    useEffect(() => {
        // Warn user if they try to refresh or navigate back after selecting answers
        const handleBeforeUnload = (e) => {
            const answers = buildAnswerPayload();
            if (answers.length > 0) {
                e.preventDefault();
                // Chrome requires returnValue to be set
                e.returnValue = '';
            }
        };

        const handlePopState = () => {
            const answers = buildAnswerPayload();
            if (answers.length > 0) {
                const confirmLeave = window.confirm(
                    'Bạn đã chọn đáp án nhưng chưa nộp bài. Bạn có chắc chắn muốn rời khỏi trang?',
                );
                if (!confirmLeave) {
                    // Push the current state back so the user stays on the page
                    window.history.pushState(null, null, window.location.href);
                }
            }
        };

        // Push an extra history entry so we can detect the first back action
        window.history.pushState(null, null, window.location.href);
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

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
                                    {/* {submitError && <p className="text-danger small mb-0 me-auto">{submitError}</p>} */}
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && <i className="fas fa-spinner fa-spin me-2"></i>}
                                        Nộp bài
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exitTestModal"
                                    >
                                        <i className="fas fa-times-circle me-2"></i>Thoát bài thi
                                    </button>
                                </div>

                                <div className={`${cx('question-nav')}`}>
                                    {/* Listening */}
                                    {listeningParts.length > 0 && (
                                        <>
                                            <h5 className="mb-3">Listening ({listeningTotal} câu)</h5>
                                            {listeningParts.map((p) => (
                                                <div key={`part-${p.part}`} className="mb-3">
                                                    <div className="mb-2">
                                                        <strong>
                                                            Part {p.part}: Questions {p.start}-{p.end}
                                                        </strong>
                                                    </div>
                                                    <div className="mb-2">
                                                        {Array.from({ length: p.count }).map((_, idx) => (
                                                            <button
                                                                type="button"
                                                                key={p.start + idx}
                                                                className={cx(
                                                                    'question-number',
                                                                    'border-0',
                                                                    'bg-transparent',
                                                                )}
                                                                onClick={() =>
                                                                    handleJumpToQuestion(p.part, p.start + idx)
                                                                }
                                                            >
                                                                {p.start + idx}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <hr />
                                        </>
                                    )}

                                    {/* Reading */}
                                    {readingParts.length > 0 && (
                                        <>
                                            <h5 className="mb-3">Reading ({readingTotal} câu)</h5>
                                            {readingParts.map((p) => (
                                                <div key={`part-${p.part}`} className="mb-3">
                                                    <div className="mb-2">
                                                        <strong>
                                                            Part {p.part}: Questions {p.start}-{p.end}
                                                        </strong>
                                                    </div>
                                                    <div className="mb-2">
                                                        {Array.from({ length: p.count }).map((_, idx) => (
                                                            <button
                                                                type="button"
                                                                key={p.start + idx}
                                                                className={cx(
                                                                    'question-number',
                                                                    'border-0',
                                                                    'bg-transparent',
                                                                )}
                                                                onClick={() =>
                                                                    handleJumpToQuestion(p.part, p.start + idx)
                                                                }
                                                            >
                                                                {p.start + idx}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Test Confirmation Modal */}
            {/* <div
                className="modal fade"
                id="submitTestModal"
                tabIndex="-1"
                aria-labelledby="submitTestModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-top">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="submitTestModalLabel">
                                Xác nhận nộp bài
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Bạn chắc chắn muốn nộp bài? Sau khi nộp bạn sẽ không thể thay đổi câu trả lời.
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Nộp bài
                            </button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Exit Test Confirmation Modal */}
            <div
                className="modal fade"
                id="exitTestModal"
                tabIndex="-1"
                aria-labelledby="exitTestModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-top">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="exitTestModalLabel">
                                Xác nhận thoát bài thi
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Bạn chắc chắn muốn thoát? Tất cả kết quả làm bài hiện tại sẽ không được lưu lại.
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleExit}
                            >
                                Thoát
                            </button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Test;
