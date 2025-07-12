import { Link } from 'react-router-dom';
import styles from '../Blog.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const DEFAULT_AVATAR = '/images/logo_black.png';

function MyBlog() {
    return (
        <>
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Bài viết của tôi</h1>
                    <Link to="create" className="btn btn-primary">
                        Thêm bài viết
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className={cx('blog-card')}>
                            <Link to="/my-blog/detail">
                                <img src={DEFAULT_AVATAR} alt="TOEIC Test" className="blog-card-img w-100 mb-2" />
                            </Link>
                            <div className="card-body p-2">
                                <a href="#" className={cx('category-badge')}>
                                    Chiến lược học tập
                                </a>
                                <h3 className={cx('card-title')}>
                                    <a href="./detail_blog.html" className="text-decoration-none text-dark">
                                        10 Chiến lược làm bài thi TOEIC hiệu quả cho người mới bắt đầu
                                    </a>
                                </h3>
                                <p className={cx('card-text')}>
                                    Nếu bạn đang bắt đầu hành trình chinh phục TOEIC, việc hiểu rõ cấu trúc bài thi và
                                    có chiến lược phù hợp sẽ giúp bạn tự tin hơn và đạt được điểm số như mong muốn.
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img src={DEFAULT_AVATAR} alt="Author" className={`${cx('author-img')} me-2`} />
                                        <span className="text-muted small">Nguyễn Minh Tuấn</span>
                                    </div>
                                    <small className="text-muted">05/05/2025</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                                    <i className="fas fa-chevron-left small"></i>
                                </a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    4
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    5
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <i className="fas fa-chevron-right small"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default MyBlog;
