import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllExam } from '@/services/examService.jsx';

import styles from './ListTest.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ListTest() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page] = useState(1);
    // const [totalPages] = useState(1); // chưa sử dụng tới

    // Hiện tại chưa cần bộ lọc nên bỏ qua

    useEffect(() => {
        const fetchExams = async () => {
            setLoading(true);
            try {
                const response = await getAllExam(page);
                setExams(response.data.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
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

            <div className="container min-vh-100 d-flex flex-column">
                <div className="my-3">
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="row g-3 p-3">
                            <div className="col-3">
                                <Select
                                    options={[
                                        { label: 'Tất cả độ khó', value: '' },
                                        { label: 'Dễ', value: 'easy' },
                                        { label: 'Trung bình', value: 'medium' },
                                        { label: 'Khó', value: 'hard' },
                                    ]}
                                    defaultValue={{ label: 'Tất cả độ khó', value: '' }}
                                />
                            </div>
                            <div className="col-3">
                                <Select
                                    options={[
                                        { label: 'Tất cả năm xuất bản', value: '' },
                                        { label: '2024', value: '2024' },
                                        { label: '2023', value: '2023' },
                                        { label: '2022', value: '2022' },
                                    ]}
                                    defaultValue={{ label: 'Tất cả năm xuất bản', value: '' }}
                                />
                            </div>
                        </div>
                    </div>

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
                                        <div className="col-lg-3 col-md-6" key={exam.id_bai_thi}>
                                            <div className="test-card card h-100 border-0 shadow-sm p-2">
                                                <div className="card-body d-flex flex-column">
                                                    <Link
                                                        to={`/detail-test/${exam.id_bai_thi}`}
                                                        className="text-decoration-none"
                                                    >
                                                        <h5 className="mb-2 text-truncate" title={exam.ten_bai_thi}>
                                                            {exam.ten_bai_thi}
                                                        </h5>
                                                    </Link>
                                                    <p className="card-text text-muted mb-3">
                                                        {exam.la_bai_thi_dau_vao
                                                            ? 'Bài thi đầu vào'
                                                            : 'Đề thi luyện tập'}
                                                    </p>

                                                    <div className="test-info mb-3 mt-auto">
                                                        <div className="row mb-2">
                                                            <div className="col-6 d-flex align-items-center">
                                                                <i className="far fa-clock text-muted me-2"></i>
                                                                <span className="text-muted">
                                                                    {exam.thoi_gian_bai_thi ||
                                                                        exam.thoi_gian_thi ||
                                                                        '--'}{' '}
                                                                    phút
                                                                </span>
                                                            </div>
                                                            {/* Tạm thời hiển thị điểm tối đa ở đây */}
                                                            <div className="col-6 d-flex align-items-center">
                                                                <i className="far fa-list-alt text-muted me-2"></i>
                                                                <span className="text-muted">
                                                                    {exam.diem_toi_da || '--'} điểm
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6 d-flex align-items-center">
                                                                <i className="far fa-question-circle text-muted me-2"></i>
                                                                <span className="text-muted">
                                                                    {exam.so_luong_cau_hoi || 200} câu
                                                                </span>
                                                            </div>
                                                            <div className="col-6 d-flex align-items-center">
                                                                <i className="far fa-calendar-alt text-muted me-2"></i>
                                                                <span className="text-muted">
                                                                    {exam.nam_xuat_ban
                                                                        ? new Date(exam.nam_xuat_ban).getFullYear()
                                                                        : '--'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        to={`/detail-test/${exam.id_bai_thi}`}
                                                        className="btn btn-outline-primary w-100 mt-auto"
                                                    >
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
