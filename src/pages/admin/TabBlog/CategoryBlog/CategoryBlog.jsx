import { getAllCategoryBlog, deleteCategoryBlog } from '@/services/categoryBlogService';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';

function CategoryBlog() {
    const [categoryBlogs, setCategoryBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 });

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchCategoryBlog = async () => {
        setLoading(true);
        try {
            const res = await getAllCategoryBlog(currentPage);
            setCategoryBlogs(res.data.data);
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
        fetchCategoryBlog();
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleDeleteCategoryBlog = async (roleId) => {
        try {
            window.confirm('Bạn có chắc chắn muốn xóa danh mục bài viết này không?');
            const res = await deleteCategoryBlog(roleId);
            toast.success(res.data.message);
            await fetchCategoryBlog();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Danh mục bài viết</h2>

                {user.permissions.includes('CATEGORY_CREATE') ? (
                    <Link to="create" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm danh mục
                    </Link>
                ) : (
                    <button className="btn btn-primary" disabled>
                        <i className="fas fa-plus-circle me-2"></i>Thêm danh mục
                    </button>
                )}
            </div>
            {loading ? (
                <div className="text-center py-5">
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên danh mục</th>
                                        <th>Mô tả</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th className="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.permissions.includes('CATEGORY_VIEW') && categoryBlogs.length > 0 ? (
                                        categoryBlogs.map((categoryBlog) => (
                                            <tr key={categoryBlog.id_danh_muc}>
                                                <td>{categoryBlog.id_danh_muc}</td>
                                                <td>{categoryBlog.ten_danh_muc}</td>
                                                <td>{categoryBlog.mo_ta}</td>
                                                <td>
                                                    {categoryBlog.thoi_gian_tao
                                                        ? format(
                                                              new Date(categoryBlog.thoi_gian_tao),
                                                              'dd/MM/yyyy HH:mm:ss',
                                                              {
                                                                  locale: vi,
                                                              },
                                                          )
                                                        : ''}
                                                </td>
                                                <td>
                                                    {categoryBlog.thoi_gian_cap_nhat
                                                        ? format(
                                                              new Date(categoryBlog.thoi_gian_cap_nhat),
                                                              'dd/MM/yyyy HH:mm:ss',
                                                              {
                                                                  locale: vi,
                                                              },
                                                          )
                                                        : ''}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        {user.permissions.includes('CATEGORY_DETAIL') ? (
                                                            <Link
                                                                to={`detail/${categoryBlog.id_danh_muc}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('CATEGORY_UPDATE') ? (
                                                            <Link
                                                                to={`edit/${categoryBlog.id_danh_muc}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('CATEGORY_DELETE') ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteCategoryBlog(categoryBlog.id_danh_muc)
                                                                }
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

                            <ReactPaginate
                                previousLabel={'Trước'}
                                nextLabel={'Sau'}
                                breakLabel={'...'}
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryBlog;
