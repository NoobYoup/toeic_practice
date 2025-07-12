import { getAllBlog, deleteBlog } from '@/services/blogService';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await getAllBlog(currentPage);
            setBlogs(res.data.data);
            setPagination((prev) => ({
                ...prev,
                total: res.data.pagination.total,
                limit: res.data.pagination.limit,
            }));
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            const res = await deleteBlog(blogId);
            toast.success(res.data.message);
            await fetchBlogs();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Danh sách bài viết</h2>
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
                                        <th>Tên bài viết</th>
                                        <th>Nội dung</th>
                                        <th>Tên danh mục</th>
                                        <th>Người đăng</th>
                                        <th>Trạng thái</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th className="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.permissions.includes('BLOG_VIEW') && blogs.length > 0 ? (
                                        blogs.map((blog) => (
                                            <tr key={blog.id_bai_viet}>
                                                <td>{blog.id_bai_viet}</td>
                                                <td>
                                                    {blog.tieu_de.length > 20
                                                        ? blog.tieu_de.slice(0, 20) + '...'
                                                        : blog.tieu_de}
                                                </td>
                                                <td>
                                                    {blog.noi_dung.length > 20
                                                        ? blog.noi_dung.slice(0, 20) + '...'
                                                        : blog.noi_dung}
                                                </td>
                                                <td>{blog.danh_muc_bai_viet.ten_danh_muc}</td>
                                                <td>{blog.nguoi_dung.ten_dang_nhap}</td>
                                                <td>{blog.blog_status}</td>
                                                <td>
                                                    {blog.thoi_gian_tao
                                                        ? format(new Date(blog.thoi_gian_tao), 'dd/MM/yyyy HH:mm:ss', {
                                                              locale: vi,
                                                          })
                                                        : ''}
                                                </td>
                                                <td>
                                                    {blog.thoi_gian_cap_nhat
                                                        ? format(
                                                              new Date(blog.thoi_gian_cap_nhat),
                                                              'dd/MM/yyyy HH:mm:ss',
                                                              {
                                                                  locale: vi,
                                                              },
                                                          )
                                                        : ''}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        {user.permissions.includes('BLOG_DETAIL') ? (
                                                            <Link
                                                                to={`detail/${blog.id_bai_viet}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('BLOG_UPDATE') ? (
                                                            <Link
                                                                to={`edit/${blog.id_bai_viet}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('BLOG_DELETE') ? (
                                                            <button
                                                                onClick={() => handleDeleteBlog(blog.id_bai_viet)}
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

export default Blog;
