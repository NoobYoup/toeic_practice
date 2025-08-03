import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { getAllExamSubmit } from '@/services/resultService';
import { jwtDecode } from 'jwt-decode';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

function Dashboard({ user }) {
    const [examData, setExamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalExams: 0,
        completedExams: 0,
        averageScore: 0,
        averageListening: 0,
        averageReading: 0,
        bestScore: 0,
        recentExams: [],
    });

    // Lấy dữ liệu bài thi của người dùng
    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const token = localStorage.getItem('user_token');
                if (!token) return;

                const decoded = jwtDecode(token);
                const userId = decoded.id_nguoi_dung;

                const response = await getAllExamSubmit(userId);
                const examResults = response.data.data;

                setExamData(examResults);

                // Tính toán thống kê
                if (examResults.length > 0) {
                    const completedExams = examResults.filter((exam) => exam.da_hoan_thanh);
                    const totalScores = completedExams.reduce((sum, exam) => sum + exam.tong_diem, 0);
                    const totalListening = completedExams.reduce((sum, exam) => sum + exam.diem_nghe, 0);
                    const totalReading = completedExams.reduce((sum, exam) => sum + exam.diem_doc, 0);
                    const bestScore = Math.max(...completedExams.map((exam) => exam.tong_diem));

                    setStats({
                        totalExams: examResults.length,
                        completedExams: completedExams.length,
                        averageScore: completedExams.length > 0 ? Math.round(totalScores / completedExams.length) : 0,
                        averageListening:
                            completedExams.length > 0 ? Math.round(totalListening / completedExams.length) : 0,
                        averageReading:
                            completedExams.length > 0 ? Math.round(totalReading / completedExams.length) : 0,
                        bestScore: bestScore || 0,
                        recentExams: completedExams.slice(0, 5), // 5 bài thi gần nhất
                    });
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu bài thi:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExamData();
    }, []);

    // Format thời gian
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Hiển thị loading
    if (loading) {
        return (
            <div className="container min-vh-100">
                <div className="text-center py-5">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                    <p className="mt-3">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container min-vh-100">
            <div className="row">
                {/* Cột chính - Thống kê tổng quan */}
                <div className="col-lg-8">
                    <h1 className="mb-4">
                        <i className="fas fa-chart-line me-2 text-primary"></i>
                        Tổng quan học tập
                    </h1>

                    {/* Thống kê tổng quan */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-6 col-lg-3">
                            <div className={`${cx('stat-card')} bg-primary text-white`}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-clipboard-list fa-2x"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h4 className="mb-0">{stats.totalExams}</h4>
                                        <small>Tổng bài thi</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className={`${cx('stat-card')} bg-success text-white`}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-check-circle fa-2x"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h4 className="mb-0">{stats.completedExams}</h4>
                                        <small>Đã hoàn thành</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className={`${cx('stat-card')} bg-info text-white`}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-star fa-2x"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h4 className="mb-0">{stats.averageScore}</h4>
                                        <small>Điểm TB</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className={`${cx('stat-card')} bg-warning text-white`}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-trophy fa-2x"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h4 className="mb-0">{stats.bestScore}</h4>
                                        <small>Điểm cao nhất</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thống kê chi tiết */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <div className={`${cx('detail-card')} border-start border-primary border-4`}>
                                <h5 className="text-primary mb-3">
                                    <i className="fas fa-headphones me-2"></i>
                                    Kỹ năng Listening
                                </h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fs-4 fw-bold">{stats.averageListening}</span>
                                    <span className="text-muted">điểm trung bình</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className={`${cx('detail-card')} border-start border-success border-4`}>
                                <h5 className="text-success mb-3">
                                    <i className="fas fa-book-open me-2"></i>
                                    Kỹ năng Reading
                                </h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fs-4 fw-bold">{stats.averageReading}</span>
                                    <span className="text-muted">điểm trung bình</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bài thi gần đây */}
                    {stats.recentExams.length > 0 && (
                        <div className={`${cx('recent-exams')} mb-4`}>
                            <h5 className="mb-3">
                                <i className="fas fa-history me-2 text-secondary"></i>
                                Bài thi gần đây
                            </h5>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Tên bài thi</th>
                                            <th>Điểm</th>
                                            <th>Listening</th>
                                            <th>Reading</th>
                                            <th>Ngày làm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.recentExams.map((exam) => (
                                            <tr key={exam.id_bai_lam_nguoi_dung}>
                                                <td>
                                                    <strong>{exam.bai_thi_nguoi_dung.ten_bai_thi}</strong>
                                                    {exam.bai_thi_nguoi_dung.la_bai_thi_dau_vao && (
                                                        <span className="badge bg-warning ms-2">Đầu vào</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            exam.tong_diem >= 600
                                                                ? 'bg-success'
                                                                : exam.tong_diem >= 400
                                                                ? 'bg-warning'
                                                                : 'bg-danger'
                                                        }`}
                                                    >
                                                        {exam.tong_diem}
                                                    </span>
                                                </td>
                                                <td>{exam.diem_nghe}</td>
                                                <td>{exam.diem_doc}</td>
                                                <td>{formatDate(exam.thoi_gian_ket_thuc)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Thông báo khi chưa có bài thi */}
                    {stats.totalExams === 0 && (
                        <div className={`${cx('empty-state')} text-center py-5`}>
                            <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">Chưa có bài thi nào</h5>
                            <p className="text-muted">Bắt đầu làm bài thi để xem thống kê học tập của bạn!</p>
                        </div>
                    )}
                </div>

                {/* Cột phụ - Thông tin cá nhân */}
                <div className="col-lg-4">
                    <div className={`${cx('info-card')} mt-3`}>
                        <h5 className="mb-3">
                            <i className="fas fa-user me-2"></i>
                            Thông tin cá nhân
                        </h5>
                        <div className="mb-3">
                            <strong>Họ tên:</strong> {user?.ho_so?.ho_ten || 'Chưa cập nhật'}
                        </div>
                        <div className="mb-3">
                            <strong>Email:</strong> {user?.email || 'Chưa cập nhật'}
                        </div>
                        <div className="mb-3">
                            <strong>Tên đăng nhập:</strong> {user?.ten_dang_nhap || 'Chưa cập nhật'}
                        </div>
                    </div>

                    <div className={`${cx('info-card')} mt-3`}>
                        <h5 className="mb-3">
                            <i className="fas fa-quote-left me-2"></i>
                            Giới thiệu
                        </h5>
                        {user?.ho_so?.gioi_thieu ? (
                            <p className="text-muted">{user.ho_so.gioi_thieu}</p>
                        ) : (
                            <div className={cx('empty-state')}>
                                <i className="fas fa-comment-slash"></i>
                                <p>Người dùng chưa thêm thông tin giới thiệu</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
