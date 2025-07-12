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

    const token = localStorage.getItem('user_token');
    const user = jwtDecode(token);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await getMyBlog();
            console.log(res);
            setBlogs(res.data.data);
        } catch (err) {
            console.error(err);
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
                    {user.permissions.includes('BLOG_CREATE') && (
                        <Link to="create" className="btn btn-primary">
                            Thêm bài viết
                        </Link>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <div className="row">
                        {user.permissions.includes('BLOG_VIEW') &&
                            blogs.map((blog) => (
                                <div className="col-md-3">
                                    <div className={cx('blog-card')}>
                                        <Link to="/my-blog/detail">
                                            <img
                                                src={DEFAULT_AVATAR}
                                                alt="TOEIC Test"
                                                className="blog-card-img w-100 mb-2"
                                            />
                                        </Link>
                                        <div className="card-body p-2">
                                            <a href="#" className={cx('category-badge')}>
                                                {blog.id_danh_muc}
                                            </a>
                                            <h3 className={cx('card-title')}>
                                                <a href="./detail_blog.html" className="text-decoration-none text-dark">
                                                    {blog.tieu_de}
                                                </a>
                                            </h3>
                                            <p className={cx('card-text')}>{blog.noi_dung}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={DEFAULT_AVATAR}
                                                        alt="Author"
                                                        className={`${cx('author-img')} me-2`}
                                                    />
                                                    <span className="text-muted small">
                                                        {jwtDecode(blog.user_id).name}
                                                    </span>
                                                </div>
                                                <small className="text-muted">
                                                    {format(blog.created_at, 'dd/MM/yyyy')}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyBlog;
