import { Link } from 'react-router-dom';
import styles from '../Blog.module.scss';
import classNames from 'classnames/bind';
import { getMyBlog } from '@/services/blogService';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const DEFAULT_AVATAR = '/images/logo_black.png';

function MyBlog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await getMyBlog();
            setBlogs(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
            <div className="container min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Bài viết của tôi</h1>

                    <Link to="create" className="btn btn-primary">
                        Thêm bài viết
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <div className="row">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <div className="col-md-3" key={blog.id_bai_viet}>
                                    <div className={cx('blog-card')}>
                                        <Link to={`/my-blog/detail/${blog.id_bai_viet}`}>
                                            <img
                                                src={blog.hinh_anh.url_phuong_tien}
                                                alt="TOEIC Test"
                                                className="blog-card-img w-100 mb-2"
                                            />
                                        </Link>
                                        <div className="card-body p-2">
                                            <a href="#" className={cx('category-badge')}>
                                                {blog.id_danh_muc}
                                            </a>
                                            <h3 className={cx('card-title')}>
                                                <Link
                                                    to={`/my-blog/detail/${blog.id_bai_viet}`}
                                                    className="text-decoration-none text-dark"
                                                >
                                                    {blog.tieu_de}
                                                </Link>
                                            </h3>
                                            <p className={cx('card-text')}>{blog.noi_dung}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={DEFAULT_AVATAR}
                                                        alt="Author"
                                                        className={`${cx('author-img')} me-2`}
                                                    />
                                                    <span className="text-muted small">{blog.id_nguoi_dung}</span>
                                                </div>
                                                <small className="text-muted">
                                                    {format(new Date(blog.thoi_gian_tao), 'dd/MM/yyyy', { locale: vi })}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <span className="text-muted">Bạn chưa có bài viết nào</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyBlog;
