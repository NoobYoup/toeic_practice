import classNames from 'classnames/bind';
import styles from './DetailTest.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetailExamPublic } from '@/services/examService';
import Login from '@/components/client/Modal/Login';
import Register from '@/components/client/Modal/Register';
import ForgotPassword from '@/components/client/Modal/ForgotPassword';

const cx = classNames.bind(styles);

function DetailTest() {
    const { id } = useParams();

    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentModal, setCurrentModal] = useState(null);
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('user_token'));
    const [startRequested, setStartRequested] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchExam = async () => {
            setLoading(true);
            try {
                const res = await getDetailExamPublic(id);
                console.log(res.data.data);
                setExam(res.data.data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchExam();
    }, [id]);

    const handleStartTest = () => {
        const token = localStorage.getItem('user_token');
        if (!token) {
            setCurrentModal('login');
            setStartRequested(true); // gắn cờ
        } else {
            navigate(`/test/${exam.id_bai_thi}`, { state: { examId: exam.id_bai_thi } });
        }
    };

    // Tự động điều hướng sau khi đã đăng nhập và người dùng có yêu cầu làm bài
    useEffect(() => {
        if (startRequested && isLogin && exam) {
            navigate(`/test/${exam.id_bai_thi}`, { state: { examId: exam.id_bai_thi } });
            setStartRequested(false); // gắn cờ
        }
    }, [startRequested, isLogin, exam, navigate]);

    return (
        <>
            {loading ? (
                <div className="text-center py-5 min-vh-100 d-flex flex-column ">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                </div>
            ) : (
                <>
                    <header className={cx('test-header')}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1>{exam?.ten_bai_thi}</h1>
                                </div>
                                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                    <button
                                        className="btn btn-light btn-lg"
                                        data-bs-toggle="modal"
                                        data-bs-target="#testInstructionsModal"
                                    >
                                        <i className="fas fa-info-circle me-2"></i>Hướng dẫn làm bài
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="container min-vh-100 d-flex flex-column">
                        <div className="card h-100 border-0 shadow p-5 my-5" style={{ borderRadius: '15px' }}>
                            <div className="row">
                                <div className="col-lg-8">
                                    <h4 className="fw-bold mb-3">Mô tả</h4>
                                    <p className="mb-4">{exam?.mo_ta}</p>

                                    <h5 className="fw-bold mb-3">Đặc điểm nổi bật:</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <i className="fas fa-check-circle text-success me-2"></i>Format đề thi chuẩn
                                            ETS 2023
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-check-circle text-success me-2"></i>Audio chất lượng
                                            cao với nhiều giọng địa phương
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-check-circle text-success me-2"></i>Đáp án chi tiết và
                                            giải thích
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-check-circle text-success me-2"></i>Phân tích kết quả
                                            theo từng part
                                        </li>
                                        <li className="mb-2">
                                            <i className="fas fa-check-circle text-success me-2"></i>Tính điểm theo
                                            thang chuẩn TOEIC
                                        </li>
                                    </ul>

                                    <h5 className="fw-bold mb-3">Phù hợp với:</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="list-unstyled">
                                                <li className="mb-2">
                                                    <i className="fas fa-user-check text-primary me-2"></i>Người mới bắt
                                                    đầu học TOEIC
                                                </li>
                                                <li className="mb-2">
                                                    <i className="fas fa-user-check text-primary me-2"></i>Học viên có
                                                    điểm {exam?.muc_do_diem}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="list-unstyled">
                                                <li className="mb-2">
                                                    <i className="fas fa-user-check text-primary me-2"></i>Muốn làm quen
                                                    với format đề thi
                                                </li>
                                                <li className="mb-2">
                                                    <i className="fas fa-user-check text-primary me-2"></i>Test năng lực
                                                    hiện tại
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="d-flex flex-column h-100">
                                        <div className="test-info-card">
                                            <h5 className="fw-bold mb-3">Thông tin đề thi</h5>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Số câu hỏi:</span>
                                                <strong>{exam?.so_luong_cau_hoi || 200} câu</strong>
                                            </div>

                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Tổng thời gian:</span>
                                                <strong>
                                                    {exam?.thoi_gian_bai_thi || exam?.thoi_gian_thi || '--'} phút
                                                </strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Mức độ điểm:</span>
                                                <strong>{exam?.muc_do_diem || '--'}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Năm xuất bản:</span>
                                                <strong>{exam?.nam_xuat_ban}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Ngày tạo:</span>
                                                <strong>{new Date(exam?.thoi_gian_tao).toLocaleString()}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <span>Cập nhật:</span>
                                                <strong>{new Date(exam?.thoi_gian_cap_nhat).toLocaleString()}</strong>
                                            </div>
                                            <hr className="my-4" />
                                        </div>
                                        <div className="mt-auto">
                                            <button className="btn btn-primary w-100 btn-lg" onClick={handleStartTest}>
                                                Bắt đầu làm bài
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="modal fade" id="testInstructionsModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Hướng dẫn làm bài thi TOEIC</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h5>Cấu trúc bài thi</h5>
                            <p>
                                Bài thi TOEIC gồm 2 phần chính: Listening (100 câu) và Reading (100 câu) với tổng thời
                                gian là 2 giờ.
                            </p>

                            <h6 className="mt-4">Phần Listening (45 phút)</h6>
                            <ul>
                                <li>
                                    <strong>Part 1:</strong> Photographs - 6 câu hỏi
                                </li>
                                <li>
                                    <strong>Part 2:</strong> Question-Response - 25 câu hỏi
                                </li>
                                <li>
                                    <strong>Part 3:</strong> Conversations - 39 câu hỏi
                                </li>
                                <li>
                                    <strong>Part 4:</strong> Short Talks - 30 câu hỏi
                                </li>
                            </ul>

                            <h6 className="mt-3">Phần Reading (75 phút)</h6>
                            <ul>
                                <li>
                                    <strong>Part 5:</strong> Incomplete Sentences - 30 câu hỏi
                                </li>
                                <li>
                                    <strong>Part 6:</strong> Text Completion - 16 câu hỏi
                                </li>
                                <li>
                                    <strong>Part 7:</strong> Reading Comprehension - 54 câu hỏi
                                </li>
                            </ul>

                            <h5 className="mt-4">Cách làm bài</h5>
                            <p>1. Đối với phần Listening, bạn sẽ nghe các đoạn ghi âm và chọn đáp án phù hợp.</p>
                            <p>2. Đối với phần Reading, bạn sẽ đọc các câu hỏi và đoạn văn để chọn đáp án đúng.</p>
                            <p>
                                3. Bạn có thể di chuyển giữa các câu hỏi bằng cách nhấp vào số câu hỏi ở thanh điều
                                hướng hoặc sử dụng nút "Câu tiếp theo" và "Câu trước".
                            </p>
                            <p>4. Bạn có thể đánh dấu câu hỏi để xem lại sau bằng cách nhấp vào biểu tượng cờ.</p>
                            <p>5. Theo dõi thời gian còn lại ở góc trên bên phải màn hình.</p>

                            <div className="alert alert-warning mt-3">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                <strong>Lưu ý:</strong> Trong phần Listening, audio sẽ được chia thành các đoạn nhỏ cho
                                từng câu hỏi (có thể nghe lại nhiều lần).
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                                Đã hiểu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auth Modals */}
            <Login
                key="login"
                isOpen={currentModal === 'login'}
                onSwitch={(modal) => setCurrentModal(modal)}
                onClose={() => setCurrentModal(null)}
                setIsLogin={setIsLogin}
            />

            <Register
                key="register"
                isOpen={currentModal === 'register'}
                onSwitch={(modal) => setCurrentModal(modal)}
                onClose={() => setCurrentModal(null)}
                setIsLogin={setIsLogin}
            />

            <ForgotPassword
                key="forgot"
                isOpen={currentModal === 'forgot'}
                onSwitch={(modal) => setCurrentModal(modal)}
                onClose={() => setCurrentModal(null)}
            />
        </>
    );
}

export default DetailTest;
