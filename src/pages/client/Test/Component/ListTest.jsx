import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllExam } from '@/services/examService.jsx';

import styles from './ListTest.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ListTest() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Hiện tại chưa cần bộ lọc nên bỏ qua

    useEffect(() => {
        const fetchExams = async () => {
            setLoading(true);
            try {
                const response = await getAllExam(page);

                // Gán danh sách đề thi
                setExams(response.data.data);

                // Tính tổng số trang từ API (tùy thuộc vào cấu trúc response)
                const pagination = response.data.pagination;
                if (pagination) {
                    const { total = 1, limit = 1 } = pagination;
                    setTotalPages(Math.ceil(total / limit));
                } else if (response.data.totalPages) {
                    setTotalPages(response.data.totalPages);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchExams();
    }, [page]);

    return (
        <>
            <section className={cx('page-header')}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-8">
                            <h1 class="fw-bold mb-3">Các Đề Thi TOEIC</h1>
                            <p class="lead mb-0">
                                Lựa chọn từ hơn 300+ đề thi và bài luyện tập được thiết kế theo chuẩn ETS
                            </p>
                        </div>
                        {/* <div class="col-lg-4 text-center text-lg-end">
                            <div class="bg-opacity-20 rounded p-3">
                                <div class="d-flex justify-content-around">
                                    <div class="text-center">
                                        <div class="h4 fw-bold mb-0">350+</div>
                                        <small>Đề thi</small>
                                    </div>
                                    <div class="text-center">
                                        <div class="h4 fw-bold mb-0">10K+</div>
                                        <small>Câu hỏi</small>
                                    </div>
                                    <div class="text-center">
                                        <div class="h4 fw-bold mb-0">95%</div>
                                        <small>Độ chính xác</small>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="my-5">
                    {/* Hiển thị loading */}
                    {loading && (
                        <div className="text-center py-5">
                            <i className="fas fa-spinner fa-spin fa-2x"></i>
                        </div>
                    )}

                    {/* Hiển thị danh sách đề thi */}
                    {!loading && (
                        <>
                            {exams.length === 0 ? (
                                <p className="text-center">Chưa có đề thi nào.</p>
                            ) : (
                                <div className="row g-4">
                                    {exams.map((exam) => (
                                    <div className="col-lg-3 col-md-6">
                                        <div className="test-card card h-100 border-0 shadow p-2">
                                            <div className="card-body">
                                            <Link
                                                    to={`/detail-test/${exam.id_bai_thi}`}
                                                    className="text-decoration-none"
                                                >
                                                    <h5 className="mb-2 text-truncate" title={exam.ten_bai_thi}>
                                                        {exam.ten_bai_thi}
                                                    </h5>
                                                </Link>
                                                <p className="card-text text-muted">{exam.la_bai_thi_dau_vao ? 'Bài thi đầu vào' : 'Đề thi luyện tập'}</p>
                                                <div className="test-info mb-3">
                                                    <div className="row mb-2">
                                                        <div className="col-6 d-flex align-items-center">
                                                            <i className="far fa-clock text-muted me-2"></i>
                                                            <span className="text-muted">120 phút</span>
                                                        </div>
                                                        <div className="col-6 d-flex align-items-center">
                                                            <i className="far fa-user text-muted me-2"></i>
                                                            <span className="text-muted">100</span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6 d-flex align-items-center">
                                                            <i className="far fa-list-alt text-muted me-2"></i>
                                                            <span className="text-muted">7 phần</span>
                                                        </div>
                                                        <div className="col-6 d-flex align-items-center">
                                                            <i className="far fa-question-circle text-muted me-2"></i>
                                                            <span className="text-muted">200 câu</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link to="/detail-test" className="btn btn-outline-primary w-100">
                                                    Xem chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListTest;
