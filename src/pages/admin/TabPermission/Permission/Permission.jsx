import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { jwtDecode } from 'jwt-decode';
import { getAllPermission, deletePermission } from '@/services/permissionService';

function RolePermission() {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchAllPermission = async () => {
        setLoading(true);
        try {
            const res = await getAllPermission();

            setPermissions(res.data?.data || res.data); // tuỳ cấu trúc API
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllPermission();
    }, []);

    // Pagination helpers
    const pageCount = Math.ceil(permissions.length / itemsPerPage);
    const displayedPermissions = permissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageClick = (selectedItem) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const handleDeletePermission = async (permissionId) => {
        try {
            const res = await deletePermission(permissionId);
            toast.success(res.data.message);
            await fetchAllPermission();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý quyền</h2>
                {user.permissions.includes('PERMISSION_CREATE') ? (
                    <Link to="create-permission" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm quyền
                    </Link>
                ) : (
                    <button className="btn btn-primary" disabled>
                        <i className="fas fa-plus-circle me-2"></i>Thêm quyền
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
                                <th>Tên quyền</th>
                                <th>Mã quyền</th>
                                <th>Thời gian tạo</th>
                                <th>Thời gian cập nhật</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.permissions.includes('PERMISSION_VIEW') && displayedPermissions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                displayedPermissions.map((permission) => (
                                    <tr key={permission.id_quyen}>
                                        <td>{permission.id_quyen}</td>
                                        <td>
                                            {permission.ten_quyen === 'quan_tri_vien'
                                                ? 'Quản trị viên'
                                                : permission.ten_quyen === 'nguoi_dung'
                                                ? 'Người dùng'
                                                : permission.ten_quyen === 'giang_vien'
                                                ? 'Giảng viên'
                                                : permission.ten_quyen}
                                        </td>
                                        <td>{permission.ma_quyen}</td>
                                        <td>{new Date(permission.thoi_gian_tao).toLocaleString()}</td>
                                        <td>{new Date(permission.thoi_gian_cap_nhat).toLocaleString()}</td>
                                        <td className="text-center">
                                            <div className="btn-group">
                                                {user.permissions.includes('PERMISSION_DETAIL') ? (
                                                    <Link
                                                        to={`detail-permission/${permission.id_quyen}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                ) : (
                                                    <button className="btn btn-sm btn-outline-primary" disabled>
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                )}
                                                {user.permissions.includes('PERMISSION_UPDATE') ? (
                                                    <Link
                                                        to={`edit-permission/${permission.id_quyen}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                ) : (
                                                    <button className="btn btn-sm btn-outline-primary" disabled>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                )}
                                                {user.permissions.includes('PERMISSION_DELETE') ? (
                                                    <button
                                                        onClick={() => handleDeletePermission(permission.id_quyen)}
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

export default RolePermission;
