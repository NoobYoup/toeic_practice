import { DEFAULT_AVATAR, DEFAULT_BACKGROUND } from '@/constants/default';
import styles from '@/pages/client/Blog/Component/DetailBlog.module.scss';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { getDetailMyBlog } from '@/services/blogService';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function DetailMyBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);

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
                                    <img src={DEFAULT_AVATAR} alt="Author" className={`${cx('author-img')} me-4`} />
                                    <div>
                                        <h5 className="fw-bold">Trần Minh Trung</h5>
                                        <p className="text-muted">Trùm STU.</p>
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

                            {/* <div className={`${cx('comments')}`}>
                            <h4 className="fw-bold mb-4">Bình luận (4)</h4>

                            <div className={`${cx('comment')} mb-4`}>
                                <div className="d-flex">
                                    <img src={DEFAULT_AVATAR} alt="User" className={`${cx('author-img')} me-3`} />
                                    <div>
                                        <h6 className="fw-bold mb-1">Trần Thanh Hà</h6>
                                        <p className="text-muted small mb-2">05/05/2025 • 10:15</p>
                                        <p>
                                            Bài viết rất bổ ích! Tôi đã áp dụng chiến lược scanning trong phần Reading
                                            và thấy cải thiện rõ rệt về tốc độ làm bài. Cảm ơn tác giả!
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <a href="#" className="text-muted me-3">
                                                <i className="far fa-thumbs-up me-1"></i> Thích (12)
                                            </a>
                                            <a href="#" className="text-muted">
                                                <i className="far fa-comment me-1"></i> Phản hồi
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="comment mb-4">
                                <div className="d-flex">
                                    <img src={DEFAULT_AVATAR} alt="User" className={`${cx('author-img')} me-3`} />
                                    <div>
                                        <h6 className="fw-bold mb-1">Lê Minh Đức</h6>
                                        <p className="text-muted small mb-2">04/05/2025 • 16:23</p>
                                        <p>
                                            Tôi sắp thi TOEIC vào tháng tới và đang rất lo lắng về phần nghe. Có thể
                                            chia sẻ thêm về cách cải thiện kỹ năng nghe cho Part 3 và 4 được không ạ?
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <a href="#" className="text-muted me-3">
                                                <i className="far fa-thumbs-up me-1"></i> Thích (5)
                                            </a>
                                            <a href="#" className="text-muted">
                                                <i className="far fa-comment me-1"></i> Phản hồi
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 ms-5">
                                    <div className="d-flex">
                                        <img src={DEFAULT_AVATAR} alt="Author" className={`${cx('author-img')} me-3`} />
                                        <div>
                                            <h6 className="fw-bold mb-1">
                                                Nguyễn Minh Tuấn <span className="badge bg-primary">Tác giả</span>
                                            </h6>
                                            <p className="text-muted small mb-2">04/05/2025 • 19:45</p>
                                            <p>
                                                Chào bạn Đức, để cải thiện Part 3-4, tôi khuyên bạn nên luyện nghe nói
                                                từ podcast hoặc TED Talks thường xuyên. Thử luyện tập ghi chú nhanh các
                                                thông tin quan trọng và tập trung vào ý chính thay vì cố gắng hiểu từng
                                                từ. Chúc bạn may mắn!
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="text-muted me-3">
                                                    <i className="far fa-thumbs-up me-1"></i> Thích (3)
                                                </a>
                                                <a href="#" className="text-muted">
                                                    <i className="far fa-comment me-1"></i> Phản hồi
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        </div>

                        <div className="col-lg-4">
                            <div className={`${cx('toc')}`}>
                                <Link
                                    to={`/my-blog/edit/${blog?.id_bai_viet}`}
                                    className="btn btn-success text-white mb-3"
                                >
                                    <i className="fas fa-edit"></i> Chỉnh sửa bài viết
                                </Link>
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
