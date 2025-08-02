import { useParams } from 'react-router-dom';
import { getDetailBlogPublic } from '@/services/blogService';
import { createComment, getCommentById, updateComment, deleteComment } from '@/services/commentService';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import styles from './DetailBlog.module.scss';
import classNames from 'classnames/bind';
import { DEFAULT_AVATAR, DEFAULT_BACKGROUND } from '@/constants/default';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(styles);

function DetailBlog() {
    // const { user } = useAuth();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    const [loading, setLoading] = useState(true);
    const [loadingComment, setLoadingComment] = useState(false);
    const [loadingReply, setLoadingReply] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [comment, setComment] = useState('');
    const [idBaiViet, setIdBaiViet] = useState(null);
    const [idBinhLuanCha, setIdBinhLuanCha] = useState(null);

    const [listComment, setListComment] = useState([]);

    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const token = localStorage.getItem('user_token');
    const user = token ? jwtDecode(token) : null;
    const userId = user ? user.id_nguoi_dung : null;

    const fetchBlog = async () => {
        setLoading(true);

        try {
            const res = await getDetailBlogPublic(id);
            setBlog(res.data.data);
            setIdBaiViet(res.data.data.id_bai_viet);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const fetchComment = async () => {
        setLoadingComment(true);

        try {
            const res = await getCommentById(idBaiViet);
            setListComment(res.data.data);
        } catch (error) {
            console.log(error);
        }

        setLoadingComment(false);
    };

    useEffect(() => {
        fetchBlog();
        fetchComment();
    }, [id, idBaiViet]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingComment(true);
        try {
            const payload = {
                id_bai_viet: idBaiViet,
                noi_dung: comment,
            };
            const res = await createComment(payload);
            toast.success(res.data.message);
            setComment('');
            fetchComment();
        } catch (error) {
            console.log(error);
            toast.error('Đăng nhập để bình luận');
        }
        setLoadingComment(false);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        setLoadingReply(true);
        try {
            const payload = {
                id_bai_viet: idBaiViet,
                noi_dung: replyContent,
                id_binh_luan_cha: idBinhLuanCha,
            };

            const res = await createComment(payload);
            toast.success(res.data.message);
            setReplyContent('');
            setReplyingCommentId(null);
            setIdBinhLuanCha(null);
            fetchComment();
        } catch (error) {
            console.log(error);
            toast.error('Đăng nhập để bình luận');
        }
        setLoadingReply(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);
        try {
            const payload = {
                noi_dung: editContent,
            };
            const res = await updateComment(editingCommentId, payload);
            toast.success(res.data.message);
            setEditContent('');
            setEditingCommentId(null);
            fetchComment();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        setLoadingUpdate(false);
    };

    const handleDelete = async (id) => {
        setLoadingDelete(true);
        try {
            window.confirm('Bạn có chắc chắn muốn xóa bình luận này không?');
            const res = await deleteComment(id);
            toast.success(res.data.message);
            // setIdBinhLuanCha(null);
            // setEditingCommentId(null);
            // setReplyContent('');
            // setReplyingCommentId(null);
            fetchComment();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        setLoadingDelete(false);
    };

    return (
        <>
            <header className={cx('blog-header')}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 mx-auto text-center">
                            <a href="#" className={`${cx('category-badge')} mb-3 d-inline-block`}>
                                {blog?.danh_muc_bai_viet.ten_danh_muc}
                            </a>
                            <h1 className="fw-bold">{blog?.danh_muc_bai_viet.mo_ta}</h1>
                            <div className="d-flex align-items-center justify-content-center mt-3">
                                <img
                                    src={blog?.nguoi_dung?.ho_so?.url_hinh_dai_dien || DEFAULT_AVATAR}
                                    alt="Author"
                                    className={`${cx('author-img')} me-2`}
                                />
                                <span className="me-3">{blog?.nguoi_dung.ten_dang_nhap}</span>
                                <span className="me-3">
                                    <i className="far fa-calendar me-1"></i>{' '}
                                    {new Date(blog?.thoi_gian_tao).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container min-vh-100">
                {loading ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className={cx('blog-content')}>
                                <h2 id="intro">{blog?.tieu_de}</h2>
                                <img
                                    src={blog?.hinh_anh?.url_phuong_tien || DEFAULT_BACKGROUND}
                                    alt="TOEIC Test"
                                    className="img-fluid rounded shadow mb-4"
                                />
                                <div
                                    className={cx('blog-content')}
                                    dangerouslySetInnerHTML={{ __html: blog?.noi_dung }}
                                />
                            </div>

                            <div className="author-box mt-3">
                                <div className="d-flex">
                                    <img
                                        src={blog?.nguoi_dung?.ho_so?.url_hinh_dai_dien || DEFAULT_AVATAR}
                                        alt="Author"
                                        className={`${cx('author-img')} me-4`}
                                    />
                                    <div>
                                        <h5 className="fw-bold">{blog?.nguoi_dung?.ho_so?.ho_ten}</h5>
                                        <p className="text-muted">{blog?.nguoi_dung?.ten_dang_nhap}</p>
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

                            <div className={`${cx('comments')} mb-5`}>
                                <h4 className="fw-bold mb-4">Bình luận ({listComment.length})</h4>

                                <div className="comment-input d-flex align-items-start my-4">
                                    <img
                                        src={DEFAULT_AVATAR}
                                        alt="User Avatar"
                                        className={`${cx('author-img')} me-3`}
                                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                    <form className="flex-grow-1 d-flex" onSubmit={handleSubmit}>
                                        <input
                                            className="form-control me-2"
                                            rows={2}
                                            placeholder="Nhập bình luận..."
                                            style={{ resize: 'none' }}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-primary align-self-end"
                                            disabled={loadingComment}
                                        >
                                            {loadingComment && <></>}
                                            Gửi
                                        </button>
                                    </form>
                                </div>

                                {listComment.map((item) => (
                                    <div className={`${cx('comment')} mb-4`} key={item.id_binh_luan}>
                                        <div className="d-flex">
                                            <img
                                                src={item.nguoi_dung.ho_so.url_hinh_dai_dien || DEFAULT_AVATAR}
                                                alt="User"
                                                className={`${cx('author-img')} me-3`}
                                            />

                                            <div className="flex-grow-1">
                                                <h6 className="fw-bold mb-1">{item.nguoi_dung.ten_dang_nhap}</h6>
                                                <p className="text-muted small mb-2">
                                                    {new Date(item.thoi_gian_tao).toLocaleString()}
                                                </p>

                                                {editingCommentId === item.id_binh_luan ? (
                                                    <form
                                                        className="d-flex align-items-center mb-2"
                                                        onSubmit={handleUpdate}
                                                    >
                                                        <input
                                                            className="form-control me-2"
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-success me-2"
                                                            disabled={loadingUpdate}
                                                        >
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            title="Hủy"
                                                            onClick={() => setEditingCommentId(null)}
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <p>{item.noi_dung}</p>
                                                )}
                                                <div className="d-flex align-items-center gap-2">
                                                    <a
                                                        href="#"
                                                        className="text-muted"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setReplyingCommentId(
                                                                replyingCommentId === item.id_binh_luan
                                                                    ? null
                                                                    : item.id_binh_luan,
                                                            );
                                                            setIdBinhLuanCha(
                                                                replyingCommentId === item.id_binh_luan
                                                                    ? null
                                                                    : item.id_binh_luan,
                                                            );

                                                            setReplyContent('');
                                                        }}
                                                    >
                                                        <i className="far fa-comment me-1"></i> Phản hồi
                                                    </a>
                                                    {item.id_nguoi_dung === userId && (
                                                        <>
                                                            <a
                                                                href="#"
                                                                className="text-muted ms-2"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setEditingCommentId(item.id_binh_luan);
                                                                    setEditContent(item.noi_dung);
                                                                }}
                                                            >
                                                                <i className="fas fa-edit"></i> Chỉnh sửa
                                                            </a>
                                                            <button
                                                                type="button"
                                                                className="text-muted ms-2 border-0 bg-transparent"
                                                                disabled={loadingDelete}
                                                                onClick={() => handleDelete(item.id_binh_luan)}
                                                            >
                                                                <i className="fas fa-trash-alt"></i> Xóa
                                                            </button>
                                                        </>
                                                    )}
                                                </div>

                                                {replyingCommentId === item.id_binh_luan && (
                                                    <div className="comment-reply-input d-flex align-items-start mt-3">
                                                        <img
                                                            src={DEFAULT_AVATAR}
                                                            alt="User Avatar"
                                                            className={`${cx('author-img')} me-3`}
                                                        />
                                                        <form onSubmit={handleReply} className="flex-grow-1 d-flex">
                                                            <input
                                                                className="form-control me-2"
                                                                placeholder="Nhập phản hồi..."
                                                                value={replyContent}
                                                                onChange={(e) => setReplyContent(e.target.value)}
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary align-self-end"
                                                                disabled={loadingReply}
                                                            >
                                                                {loadingReply && <></>}
                                                                Gửi
                                                            </button>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Render phản hồi 1 cấp */}
                                        {item.phan_hoi && item.phan_hoi.length > 0 && (
                                            <div className="mt-3 ms-5">
                                                {item.phan_hoi.map((reply) => (
                                                    <div className="d-flex mb-3" key={reply.id_binh_luan}>
                                                        <img
                                                            src={
                                                                reply.nguoi_dung?.ho_so?.url_hinh_dai_dien ||
                                                                DEFAULT_AVATAR
                                                            }
                                                            alt="Author"
                                                            className={`${cx('author-img')} me-3`}
                                                        />
                                                        <div>
                                                            <h6 className="fw-bold mb-1">
                                                                {reply.nguoi_dung?.ten_dang_nhap}
                                                                {reply.nguoi_dung?.id_nguoi_dung ===
                                                                    blog?.nguoi_dung?.id_nguoi_dung && (
                                                                    <span className="badge bg-primary ms-2">
                                                                        Tác giả
                                                                    </span>
                                                                )}
                                                            </h6>
                                                            <p className="text-muted small mb-2">
                                                                {new Date(reply.thoi_gian_tao).toLocaleString()}
                                                            </p>
                                                            {editingCommentId === reply.id_binh_luan ? (
                                                                <form
                                                                    className="d-flex align-items-center mb-2"
                                                                    onSubmit={handleUpdate}
                                                                >
                                                                    <input
                                                                        className="form-control me-2"
                                                                        value={editContent}
                                                                        onChange={(e) => setEditContent(e.target.value)}
                                                                    />
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-success me-2"
                                                                        disabled={loadingUpdate}
                                                                    >
                                                                        <i className="fas fa-check"></i>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary"
                                                                        title="Hủy"
                                                                        onClick={() => setEditingCommentId(null)}
                                                                    >
                                                                        <i className="fas fa-times"></i>
                                                                    </button>
                                                                </form>
                                                            ) : (
                                                                <p>{reply.noi_dung}</p>
                                                            )}
                                                            <div className="d-flex align-items-center gap-2">
                                                                {/* Không có nút phản hồi ở cấp con */}
                                                                {reply.id_nguoi_dung === userId && (
                                                                    <>
                                                                        <a
                                                                            href="#"
                                                                            className="text-muted ms-2"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setEditingCommentId(reply.id_binh_luan);
                                                                                setEditContent(reply.noi_dung);
                                                                            }}
                                                                        >
                                                                            <i className="fas fa-edit"></i> Chỉnh sửa
                                                                        </a>
                                                                        <button
                                                                            type="button"
                                                                            className="text-muted ms-2 border-0 bg-transparent"
                                                                            disabled={loadingDelete}
                                                                            onClick={() =>
                                                                                handleDelete(reply.id_binh_luan)
                                                                            }
                                                                        >
                                                                            <i className="fas fa-trash-alt"></i> Xóa
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <div className="col-lg-4">
                            <div className={`${cx('toc')}`}>
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
                        </div> */}
                    </div>
                )}
            </div>
        </>
    );
}

export default DetailBlog;
