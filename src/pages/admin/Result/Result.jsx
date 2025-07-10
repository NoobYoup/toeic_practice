import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

import { getAllResultExam } from '@/services/resultService.jsx';

function Result() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Client-side pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const res = await getAllResultExam();
            console.log(res);
            setResults(res.data?.data || []);
            setPagination((prev) => ({ ...prev, total: res.data?.data?.length || 0 }));
        } catch (err) {
            console.error(err);
            setError(err);
            // toast.error(err.response?.data?.message || 'Không thể tải dữ liệu');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    // Slice data for current page
    const startIdx = (currentPage - 1) * pagination.limit;
    const currentData = results.slice(startIdx, startIdx + pagination.limit);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý kết quả</h2>
            </div>

            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <div className="text-center">
                            <i className="fas fa-spinner fa-spin fa-2x"></i>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>ID bài thi</th>
                                        <th>Bắt đầu</th>
                                        <th>Kết thúc</th>
                                        <th>Điểm Nghe</th>
                                        <th>Điểm Đọc</th>
                                        <th>Tổng điểm</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.permissions.includes('RESULT_VIEW') && currentData.length === 0 ? (
                                        <tr>
                                            <td colSpan={11} className="text-center text-muted">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    ) : (
                                        currentData.map((item) => (
                                            <tr key={item.id_bai_lam_nguoi_dung}>
                                                <td>{item.id_bai_lam_nguoi_dung}</td>
                                                <td>{item.nguoi_dung_lam_bai?.ho_so?.ho_ten}</td>
                                                <td>{item.nguoi_dung_lam_bai?.email}</td>
                                                <td>{item.id_bai_thi}</td>
                                                <td>
                                                    {item.thoi_gian_bat_dau
                                                        ? format(new Date(item.thoi_gian_bat_dau), 'dd/MM/yyyy HH:mm', {
                                                              locale: vi,
                                                          })
                                                        : ''}
                                                </td>
                                                <td>
                                                    {item.thoi_gian_ket_thuc
                                                        ? format(
                                                              new Date(item.thoi_gian_ket_thuc),
                                                              'dd/MM/yyyy HH:mm',
                                                              { locale: vi },
                                                          )
                                                        : ''}
                                                </td>
                                                <td>{item.diem_nghe}</td>
                                                <td>{item.diem_doc}</td>
                                                <td>{item.tong_diem}</td>
                                                <td>{item.da_hoan_thanh ? 'Hoàn thành' : 'Chưa hoàn thành'}</td>

                                                <td>
                                                    <div className="btn-group">
                                                        {user.permissions.includes('RESULT_DETAIL') ? (
                                                            <Link
                                                                to={`detail-result/${item.id_bai_lam_nguoi_dung}`}
                                                                // onClick={() => localStorage.setItem('examId', exam.id_bai_thi)}
                                                                className="btn btn-sm btn-outline-info"
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-info" disabled>
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

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
            </div>
        </>
    );
}

export default Result;
