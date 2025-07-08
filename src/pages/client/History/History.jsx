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
    console.log(decoded);

    const [examSubmit, setExamSubmit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });

    const fetchAllExamSubmit = async (page = 1) => {
        setLoading(true);
        try {
            const res = await getAllExamSubmit(decoded.id_nguoi_dung, page, pagination.limit);
            console.log(res);
            const { data, pagination: pag } = res.data;
            setExamSubmit(data);
            setPagination(pag);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllExamSubmit(1);
    }, []);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        if (selectedPage !== pagination.page) {
            fetchAllExamSubmit(selectedPage);
        }
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
                        {/* <div className="row g-4 mb-4">
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-primary`}>24</div>
                                    <div className={cx('stat-label')}>Tổng bài thi</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-success`}>785</div>
                                    <div className={cx('stat-label')}>Điểm cao nhất</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-warning`}>658</div>
                                    <div className={cx('stat-label')}>Điểm trung bình</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className={`${cx('stat-card')} text-center`}>
                                    <div className={`${cx('stat-number')} text-info`}>18h 32m</div>
                                    <div className={cx('stat-label')}>Thời gian luyện tập</div>
                                </div>
                            </div>
                        </div> */}

                        <div className={cx('test-history-card')}>
                            {/* <div className={`${cx('filter-tabs')}  d-flex`}>
                                <a href="#" className={`${cx('filter-tab')} active`} data-filter="all">
                                    Tất cả
                                </a>
                                <a href="#" className={`${cx('filter-tab')}`} data-filter="full">
                                    Full Test
                                </a>
                                <a href="#" className={`${cx('filter-tab')}`} data-filter="mini">
                                    Mini Test
                                </a>
                                <a href="#" className={`${cx('filter-tab')}`} data-filter="practice">
                                    Practice
                                </a>
                            </div> */}

                            <div className="p-3 border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fas fa-search"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm bài thi..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <select className="form-select d-inline-block w-auto">
                                            <option>Sắp xếp theo ngày</option>
                                            <option>Sắp xếp theo điểm</option>
                                            <option>Sắp xếp theo loại bài thi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

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
                                                    <h6 className="mb-1 fw-bold">TOEIC Full Test #15</h6>
                                                    <span className={cx('test-type-badge', 'test-type-full')}>
                                                        Full Test
                                                    </span>
                                                    <div className="mt-2">
                                                        <span className={cx('time-badge')}>
                                                            <i className="fas fa-clock me-1"></i>120 phút
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={cx('skill-breakdown')}>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <small className="text-muted me-2">Listening:</small>
                                                            <strong>{exam.diem_nghe}</strong>
                                                        </div>

                                                        <div className="d-flex align-items-center mb-2">
                                                            <small className="text-muted me-2">Reading:</small>
                                                            <strong>{exam.diem_doc}</strong>
                                                        </div>
                                                        <div className="progress-bar-custom">
                                                            <div className="progress-fill bg-success"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 text-muted">
                                                    <i className="fas fa-calendar me-1"></i>
                                                    {format(new Date(exam.thoi_gian_bat_dau), 'dd/MM/yyyy', {
                                                        locale: vi,
                                                    })}
                                                    <br />
                                                    {/* <i className="fas fa-clock me-1"></i> */}
                                                    {/* {format(new Date(exam.created_at), 'HH:mm', { locale: vi })} */}
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

                            <div className="d-flex justify-content-center">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="Sau"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    pageCount={Math.ceil(pagination.total / pagination.limit)}
                                    previousLabel="Trước"
                                    renderOnZeroPageCount={null}
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    activeClassName="active"
                                    previousClassName="page-item"
                                    nextClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default History;
