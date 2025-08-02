import { DEFAULT_AVATAR } from '@/constants/default';
import styles from '@/pages/client/Blog/Component/DetailBlog.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteMyBlog, getDetailMyBlog } from '@/services/blogService';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function DetailMyBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchBlog = async () => {
        setLoading(true);
        try {
            const res = await getDetailMyBlog(id);
            setBlog(res.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const handleDeleteBlog = async () => {
        try {
            if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
                const res = await deleteMyBlog(id);
                toast.success(res.data.message);
                navigate('/my-blog');
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <>
            <div className="container min-vh-100">
                {loading ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            <div className={cx('blog-content')}>
                                <h2 id="intro">{blog?.tieu_de}</h2>
                                <img
                                    src={blog?.hinh_anh.url_phuong_tien}
                                    alt="TOEIC Test"
                                    className="img-fluid rounded shadow mb-4"
                                />
                                <div
                                    className={cx('blog-content')}
                                    dangerouslySetInnerHTML={{ __html: blog?.noi_dung }}
                                />
                            </div>

                            <div className="author-box">
                                <div className="d-flex">
                                    <img
                                        src={blog?.nguoi_dung.ho_so.url_hinh_dai_dien || DEFAULT_AVATAR}
                                        alt="Author"
                                        className={`${cx('author-img')} me-4`}
                                    />
                                    <div>
                                        <h5 className="fw-bold">{blog?.nguoi_dung.ho_so.ho_ten}</h5>
                                        <p className="text-muted">{blog?.nguoi_dung.ten_dang_nhap}</p>
                                        <div className="d-flex">
                                            <a href="#" className="me-2 text-primary">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#" className="me-2 text-primary">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="#" className="me-2 text-primary">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${cx('social-share')} my-5`}>
                                <h5 className="fw-bold mb-3">Chia sẻ bài viết</h5>
                                <div className="d-flex">
                                    <a href="#" className="bg-primary">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="bg-info">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="bg-success">
                                        <i className="fab fa-whatsapp"></i>
                                    </a>
                                    <a href="#" className="bg-danger">
                                        <i className="fab fa-pinterest"></i>
                                    </a>
                                    <a href="#" className="bg-secondary">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className={`${cx('toc')}`}>
                                <Link
                                    to={`/my-blog/edit/${blog?.id_bai_viet}`}
                                    className="btn btn-success text-white mb-3"
                                >
                                    <i className="fas fa-edit"></i> Chỉnh sửa bài viết
                                </Link>
                                <button onClick={handleDeleteBlog} className="btn btn-danger text-white ms-2 mb-3">
                                    <i className="fas fa-trash"></i> Xóa bài viết
                                </button>
                                <h5 className="fw-bold mb-3">Thông tin bài viết</h5>
                                <ul>
                                    <li>
                                        <span>Trạng thái: </span>
                                        <span className="text-muted fst-italic">{blog?.blog_status}</span>
                                    </li>
                                    <li>
                                        <span>Danh mục bài viết</span>
                                        <ul>
                                            <li>
                                                <span>ID danh mục: </span>
                                                <span className="text-muted fst-italic">{blog?.id_danh_muc}</span>
                                            </li>
                                            <li>
                                                <span>Tên danh mục: </span>
                                                <span className="text-muted fst-italic">
                                                    {blog?.danh_muc_bai_viet.ten_danh_muc}
                                                </span>
                                            </li>
                                            <li>
                                                <span>Mô tả danh mục: </span>
                                                <span className="text-muted fst-italic">
                                                    {blog?.danh_muc_bai_viet.mo_ta}
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span>ID bài viết: </span>
                                        <span className="text-muted fst-italic">{blog?.id_bai_viet}</span>
                                    </li>
                                    <li>
                                        <span>Ngày đăng: </span>
                                        <span className="text-muted fst-italic">
                                            {new Date(blog?.thoi_gian_tao).toLocaleString()}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Ngày cập nhật: </span>
                                        <span className="text-muted fst-italic">
                                            {new Date(blog?.thoi_gian_cap_nhat).toLocaleString()}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default DetailMyBlog;
