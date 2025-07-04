import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { getAllRole, deleteRole } from '@/services/roleService';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

function Role() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchAllRole = async () => {
        setLoading(true);
        try {
            const res = await getAllRole();
            console.log(res);
            setRoles(res.data?.data || res.data); // tuỳ cấu trúc API
        } catch (error) {
            console.error(error);
            setError(error);
            toast.error('Không thể tải danh sách vai trò');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllRole();
    }, []);

    // Pagination helpers
    const pageCount = Math.ceil(roles.length / itemsPerPage);
    const displayedRoles = roles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleDeleteRole = async (roleId) => {
        try {
            const res = await deleteRole(roleId);
            toast.success(res.data.message);
            await fetchAllRole();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý vai trò</h2>
                {/* Placeholder for add role */}
                <Link to="create-role" className="btn btn-primary">
                    <i className="fas fa-plus-circle me-2"></i>Thêm vai trò
                </Link>
            </div>
            {loading ? (
                <div className="text-center py-5">
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
            ) : error ? (
                <p className="text-danger">Đã xảy ra lỗi khi tải dữ liệu</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên vai trò</th>
                                <th>Mô tả</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedRoles.map((role) => (
                                <tr key={role.id_vai_tro}>
                                    <td>{role.id_vai_tro}</td>
                                    <td>
                                        {role.ten_vai_tro === 'quan_tri_vien'
                                            ? 'Quản trị viên'
                                            : role.ten_vai_tro === 'nguoi_dung'
                                            ? 'Người dùng'
                                            : role.ten_vai_tro === 'giang_vien'
                                            ? 'Giảng viên'
                                            : role.ten_vai_tro}
                                    </td>
                                    <td>{role.mo_ta}</td>
                                    <td>
                                        {role.thoi_gian_tao
                                            ? format(new Date(role.thoi_gian_tao), 'dd/MM/yyyy HH:mm:ss', {
                                                  locale: vi,
                                              })
                                            : ''}
                                    </td>
                                    <td>
                                        {role.thoi_gian_cap_nhat
                                            ? format(new Date(role.thoi_gian_cap_nhat), 'dd/MM/yyyy HH:mm:ss', {
                                                  locale: vi,
                                              })
                                            : ''}
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <Link
                                                to={`detail-role/${role.id_vai_tro}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                            <Link
                                                to={`edit-role/${role.id_vai_tro}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteRole(role.id_vai_tro)}
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {pageCount > 1 && (
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            forcePage={currentPage - 1}
                            onPageChange={handlePageClick}
                            pageCount={pageCount}
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
                    )}
                </div>
            )}
        </div>
    );
}

export default Role;
