import { Link } from 'react-router-dom';
import { getAllExamPublic } from '@/services/examService.jsx';
import { useState, useEffect } from 'react';

function PracticeSection() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Hiện tại chưa cần bộ lọc nên bỏ qua

    useEffect(() => {
        const fetchExams = async () => {
            setLoading(true);
            try {
                const response = await getAllExamPublic(page);

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
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchExams();
    }, [page]);

    return (
        <section className="practice-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Đề thi luyện tập</h2>
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
                                {exams.length > 4
                                    ? exams.slice(0, 4).map((exam) => (
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
                                                                      {exam.nam_xuat_ban ? exam.nam_xuat_ban : '--'}
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
                                      ))
                                    : exams.map((exam) => (
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
                                                                      {exam.nam_xuat_ban ? exam.nam_xuat_ban : '--'}
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
                                <div className="text-center">
                                    <Link to={`/list-test`} className="btn btn-outline-primary">
                                        Xem thêm
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Phân trang đơn giản */}
                        {totalPages > 1 && (
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    className="btn btn-outline-secondary me-2"
                                    disabled={page === 1}
                                    onClick={() => setPage((prev) => prev - 1)}
                                >
                                    Trước
                                </button>
                                <span className="align-self-center">
                                    {page} / {totalPages}
                                </span>
                                <button
                                    className="btn btn-outline-secondary ms-2"
                                    disabled={page === totalPages}
                                    onClick={() => setPage((prev) => prev + 1)}
                                >
                                    Sau
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default PracticeSection;
