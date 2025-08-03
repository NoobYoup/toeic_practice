import styles from './History.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { getAllExamSubmit } from '@/services/resultService';

const cx = classNames.bind(styles);

function History() {
    const token = localStorage.getItem('user_token');
    const decoded = jwtDecode(token);

    const [examSubmit, setExamSubmit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAllExamSubmit = async () => {
        setLoading(true);
        try {
            const res = await getAllExamSubmit(decoded.id_nguoi_dung, currentPage);
            setExamSubmit(res.data.data);
            setPagination((prev) => ({
                ...prev,
                total: res.data.pagination.total,
                limit: res.data.pagination.limit,
            }));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllExamSubmit();
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };
    return (
        <>
            <header className={cx('page-header')}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bold mb-3">Lịch sử bài thi</h1>
                            <p className="lead mb-0">
                                Theo dõi tiến trình học tập và xem chi tiết kết quả các bài thi đã làm
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container min-vh-100">
                {loading ? (
                    <div className="text-center py-5">
                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <>
                        <div className="row g-4 mb-4">
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-primary`}>{examSubmit.length}</div>
                                    <div className={cx('stat-label')}>Tổng bài thi</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-success`}>
                                        {examSubmit.reduce((max, exam) => Math.max(max, exam.tong_diem), 0)}
                                    </div>
                                    <div className={cx('stat-label')}>Tổng điểm cao nhất</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-warning`}>
                                        {examSubmit.reduce((max, exam) => Math.max(max, exam.diem_doc), 0)}
                                    </div>
                                    <div className={cx('stat-label')}>Điểm Reading cao nhất</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-info`}>
                                        {examSubmit.reduce((max, exam) => Math.max(max, exam.diem_nghe), 0)}
                                    </div>
                                    <div className={cx('stat-label')}>Điểm Listening cao nhất</div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('test-history-card')}>
                            <div className={cx('test-results')}>
                                {examSubmit.length === 0 ? (
                                    <div className="text-center text-muted">Chưa có bài thi</div>
                                ) : (
                                    examSubmit.map((exam) => (
                                        <div className={cx('test-result-row')} key={exam.id_bai_lam_nguoi_dung}>
                                            <div className="row align-items-center">
                                                <div className="col-md-1">
                                                    <div className={cx('score-circle', 'score-excellent')}>
                                                        {exam.tong_diem}
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <h6 className="mb-1 fw-bold">
                                                        {exam.bai_thi_nguoi_dung.ten_bai_thi}
                                                    </h6>
                                                    <span className={cx('test-type-badge', 'test-type-full')}>
                                                        {exam.bai_thi_nguoi_dung.la_bai_thi_dau_vao === true
                                                            ? 'Bài thi đầu vào'
                                                            : 'Full Test'}
                                                    </span>
                                                    <div className="mt-2">
                                                        <span className={cx('time-badge')}>
                                                            <i className="fas fa-clock me-1"></i>
                                                            {exam.bai_thi_nguoi_dung.thoi_gian_bai_thi}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={cx('skill-breakdown')}>
                                                        <div className="d-flex align-items-center">
                                                            <small className="text-muted me-2 fs-6">Listening:</small>
                                                            <strong>{exam.diem_nghe}</strong>
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <small className="text-muted me-2 fs-6">Reading:</small>
                                                            <strong>{exam.diem_doc}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 text-muted">
                                                    <i className="fas fa-calendar me-1"></i>
                                                    {format(new Date(exam.thoi_gian_bat_dau), 'dd/MM/yyyy', {
                                                        locale: vi,
                                                    })}
                                                    <br />
                                                </div>
                                                <div className="col-md-2">
                                                    <div className={cx('action-buttons')}>
                                                        <Link
                                                            to={`/result-test/${exam.id_bai_lam_nguoi_dung}`}
                                                            className="btn btn-outline-primary btn-sm"
                                                        >
                                                            <i className="fas fa-eye me-1"></i>Chi tiết
                                                        </Link>
                                                        <Link
                                                            to={`/detail-test/${exam.id_bai_thi}`}
                                                            className="btn btn-outline-success btn-sm"
                                                        >
                                                            <i className="fas fa-redo me-1"></i>Làm lại
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {pagination.total > 0 && (
                                <div className="mt-3">
                                    <ReactPaginate
                                        previousLabel={'Trước'}
                                        nextLabel={'Sau'}
                                        breakLabel={'...'}
                                        forcePage={currentPage - 1}
                                        onPageChange={handlePageClick}
                                        pageCount={Math.ceil(pagination.total / pagination.limit)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        containerClassName={'pagination justify-content-center'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        breakClassName={'page-item'}
                                        breakLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default History;
