import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDetailBlog } from '@/services/blogService';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import classNames from 'classnames/bind';
import styles from './DetailBlog.module.scss';

const cx = classNames.bind(styles);

function DetailBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    // Kiểm tra quyền truy cập
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                console.error('Lỗi decode token:', error);
                toast.error('Phiên đăng nhập không hợp lệ');
            }
        }
    }, []);

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const res = await getDetailBlog(id);
            setBlog(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Lấy chi tiết bài viết thất bại');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            fetchBlog();
        }
    }, [id]);

    // Kiểm tra quyền xem chi tiết
    if (!user || !user.permissions.includes('BLOG_DETAIL')) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Không có quyền truy cập!</h4>
                    <p>Bạn không có quyền xem chi tiết bài viết.</p>
                    <hr />
                    <Link to="/admin/tab-blog/blog" className="btn btn-outline-danger">
                        Quay lại danh sách
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container py-4">
                <div className="text-center py-5">
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Không tìm thấy bài viết!</h4>
                    <p>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                    <hr />
                    <Link to="/admin/tab-blog/blog" className="btn btn-outline-warning">
                        Quay lại danh sách
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-3">Chi tiết bài viết</h2>

            <div className="row">
                <div className="col-md-6">
                    {blog.hinh_anh && (
                        <div className={`${cx('blog-image-container')} card-body`}>
                            <img
                                src={blog.hinh_anh.url_phuong_tien}
                                alt={blog.tieu_de}
                                className={`${cx('blog-image')} img-fluid`}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <div className={`${cx('image-error')} mt-2`} style={{ display: 'none' }}>
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                Không thể tải ảnh
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <h5 className="mb-2">
                        <i className="fas fa-info-circle me-2"></i>
                        Thông tin cơ bản
                    </h5>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="d-flex">
                                <strong className={`${cx('info-label')} me-2`}>ID bài viết:</strong>
                                <span className={`${cx('info-value')} fs-6`}>{blog.id_bai_viet}</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex">
                                <strong className={`${cx('info-label')} me-2`}>Tiêu đề:</strong>
                                <span className={`${cx('info-value')} fs-6`}>{blog.tieu_de}</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex">
                                <strong className={`${cx('info-label')} me-2`}>Trạng thái:</strong>
                                <span
                                    className={`${cx('status-badge')} ${
                                        blog.blog_status === 'approved'
                                            ? cx('status-approved')
                                            : blog.blog_status === 'pending'
                                            ? cx('status-pending')
                                            : cx('status-rejected')
                                    }`}
                                >
                                    {blog.blog_status === 'approved'
                                        ? 'Đã duyệt'
                                        : blog.blog_status === 'pending'
                                        ? 'Chờ duyệt'
                                        : 'Từ chối'}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex">
                                <strong className={`${cx('info-label')} me-2`}>Danh mục:</strong>
                                <span className={cx('info-value')}>
                                    {blog.danh_muc_bai_viet?.ten_danh_muc || 'N/A'}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex">
                                <strong className={`${cx('info-label')} me-2`}>Người đăng:</strong>
                                <span className={cx('info-value')}>{blog.nguoi_dung?.ten_dang_nhap || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex">
                                <strong className={`${cx('info-label')} me-2`}>Ngày tạo:</strong>
                                <span className={cx('info-value')}>
                                    {blog.thoi_gian_tao
                                        ? format(new Date(blog.thoi_gian_tao), 'dd/MM/yyyy HH:mm:ss', {
                                              locale: vi,
                                          })
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex">
                                <strong className={`${cx('info-label')} me-2`}>Ngày cập nhật:</strong>
                                <span className={cx('info-value')}>
                                    {blog.thoi_gian_cap_nhat
                                        ? format(new Date(blog.thoi_gian_cap_nhat), 'dd/MM/yyyy HH:mm:ss', {
                                              locale: vi,
                                          })
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="mt-3">
                <i className="fas fa-file-alt me-2"></i>
                Nội dung bài viết
            </h5>
            <div className="card-body">
                <div className={cx('blog-content')} dangerouslySetInnerHTML={{ __html: blog.noi_dung }} />
            </div>
        </div>
    );
}

export default DetailBlog;
