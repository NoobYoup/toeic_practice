import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { getAllRole, deleteRole } from '@/services/roleService';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { jwtDecode } from 'jwt-decode';

function Role() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchAllRole = async () => {
        setLoading(true);
        try {
            const res = await getAllRole();

            setRoles(res.data?.data || res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllRole();
    }, []);

    const pageCount = Math.ceil(roles.length / itemsPerPage);
    const displayedRoles = roles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleDeleteRole = async (roleId) => {
        try {
            window.confirm('Bạn có chắc chắn muốn xóa vai trò này không?');
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

                {user.permissions.includes('ROLE_CREATE') ? (
                    <Link to="create-role" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm vai trò
                    </Link>
                ) : (
                    <button className="btn btn-primary" disabled>
                        <i className="fas fa-plus-circle me-2"></i>Thêm vai trò
                    </button>
                )}
            </div>
            {loading ? (
                <div className="text-center py-5">
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
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
                            {user.permissions.includes('ROLE_VIEW') && roles.length > 0 ? (
                                displayedRoles.map((role) => (
                                    <tr key={role.id_vai_tro}>
                                        <td>{role.id_vai_tro}</td>
                                        <td>{role.ten_vai_tro}</td>
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
                                                {user.permissions.includes('ROLE_DETAIL') ? (
                                                    <Link
                                                        to={`detail-role/${role.id_vai_tro}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                ) : (
                                                    <button className="btn btn-sm btn-outline-primary" disabled>
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                )}

                                                {user.permissions.includes('ROLE_UPDATE') ? (
                                                    <Link
                                                        to={`edit-role/${role.id_vai_tro}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                ) : (
                                                    <button className="btn btn-sm btn-outline-primary" disabled>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                )}

                                                {user.permissions.includes('ROLE_DELETE') ? (
                                                    <button
                                                        onClick={() => handleDeleteRole(role.id_vai_tro)}
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-sm btn-outline-danger" disabled>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={13} className="text-center text-muted">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
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
