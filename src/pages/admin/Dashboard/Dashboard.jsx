import styles from './Dashboard.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { getAllQuestion } from '@/services/questionService.jsx';
import { getAllExam } from '@/services/examService.jsx';
import { getAllUser } from '@/services/userService.jsx';
import { getAllResultExam } from '@/services/resultService.jsx';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Dashboard() {
    const [stats, setStats] = useState({ questions: 0, exams: 0, users: 0, results: 0 });
    const [loading, setLoading] = useState(false);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            const [questionRes, examRes, userRes, resultRes] = await Promise.all([
                getAllQuestion(1),
                getAllExam(1),
                getAllUser('', 1),
                getAllResultExam(),
            ]);

            const questionsTotal = questionRes.data.pagination?.total || questionRes.data.data.length || 0;
            const examsTotal = examRes.data.pagination?.total || examRes.data.data.length || 0;
            const usersTotal = userRes.data.pagination?.total || userRes.data.data.length || 0;
            const resultsTotal = resultRes.data.pagination?.total || resultRes.data.data.length || 0;

            setStats({ questions: questionsTotal, exams: examsTotal, users: usersTotal, results: resultsTotal });
        } catch (error) {
            console.error('Lỗi khi lấy thống kê:', error);
            // toast.error('Không thể tải dữ liệu thống kê');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Tổng Quan</h2>
                    <p className="text-muted">
                        Xin chào, Admin! Tổng quan hệ thống ngày {dayjs().format('DD/MM/YYYY')}
                    </p>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={fetchStats} disabled={loading}>
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin me-2"></i>Đang tải...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sync-alt me-2"></i>Cập nhật
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-primary', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-primary mb-1">TỔNG SỐ CÂU HỎI</h6>
                                    <h3 className="mb-0">{stats.questions}</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-question-circle text-primary`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-success', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-success mb-1">ĐỀ THI ĐÃ TẠO</h6>
                                    <h3 className="mb-0">{stats.exams}</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-file-alt text-success`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-info', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-info mb-1">NGƯỜI DÙNG</h6>
                                    <h3 className="mb-0">{stats.users}</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-users text-info`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-warning', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-warning mb-1">BÀI THI HOÀN THÀNH</h6>
                                    <h3 className="mb-0">{stats.results}</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-clipboard-check text-warning`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
