import { Link } from 'react-router-dom';

import styles from './Blog.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const DEFAULT_AVATAR = '/images/logo_black.png';

function Blog() {
    return (
        <>
            <header className={cx('blog-header')} style={{flex: '1 0 auto'}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mx-auto text-center">
                            <h1 className="fw-bold">Blog TOEIC Master</h1>
                            <p className="lead">
                                Cập nhật những bài viết chất lượng về kỹ năng, chiến lược làm bài thi và kinh nghiệm học
                                TOEIC hiệu quả
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                            <div className="mb-3 mb-md-0">
                                <span className="me-2">Hiển thị 1-9 của 42 bài viết</span>
                            </div>
                            <div className="d-flex">
                                <div className="me-3">
                                    <select className="form-select" defaultValue="">
                                        <option>Danh mục</option>
                                        <option>Chiến lược học tập</option>
                                        <option>Kỹ năng Reading</option>
                                        <option>Kỹ năng Listening</option>
                                        <option>Từ vựng TOEIC</option>
                                        <option>Ngữ pháp TOEIC</option>
                                        <option>Kinh nghiệm thi</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="form-select" defaultValue="">
                                        <option>Mới nhất</option>
                                        <option>Phổ biến nhất</option>
                                        <option>Đọc nhiều nhất</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className={cx('blog-card')}>
                                    <Link to="/blog/detail-blog">
                                        <img
                                            src={DEFAULT_AVATAR}
                                            alt="TOEIC Test"
                                            className="blog-card-img w-100 mb-2"
                                        />
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
                                            Nếu bạn đang bắt đầu hành trình chinh phục TOEIC, việc hiểu rõ cấu trúc bài
                                            thi và có chiến lược phù hợp sẽ giúp bạn tự tin hơn và đạt được điểm số như
                                            mong muốn.
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={DEFAULT_AVATAR}
                                                    alt="Author"
                                                    className={`${cx('author-img')} me-2`}
                                                />
                                                <span className="text-muted small">Nguyễn Minh Tuấn</span>
                                            </div>
                                            <small className="text-muted">05/05/2025</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('blog-card')}>
                                    <Link to="/blog/detail_blog">
                                        <img
                                            src={DEFAULT_AVATAR}
                                            alt="TOEIC Test"
                                            className="blog-card-img w-100 mb-2"
                                        />
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
                                            Nếu bạn đang bắt đầu hành trình chinh phục TOEIC, việc hiểu rõ cấu trúc bài
                                            thi và có chiến lược phù hợp sẽ giúp bạn tự tin hơn và đạt được điểm số như
                                            mong muốn.
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={DEFAULT_AVATAR}
                                                    alt="Author"
                                                    className={`${cx('author-img')} me-2`}
                                                />
                                                <span className="text-muted small">Nguyễn Minh Tuấn</span>
                                            </div>
                                            <small className="text-muted">05/05/2025</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={cx('blog-sidebar')}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <form className={cx('search-form')}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm bài viết..."
                                            />
                                            <button type="submit" className="btn btn-primary px-3">
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <h4 className="mb-3">Bài viết nổi bật</h4>
                            <div className={cx('featured-post')}>
                                <img src={DEFAULT_AVATAR} alt="Featured post" />
                                <div className={cx('featured-post-info')}>
                                    <h6>
                                        <a href="#" className="text-decoration-none text-dark">
                                            10 Chiến lược làm bài thi TOEIC hiệu quả cho người mới bắt đầu
                                        </a>
                                    </h6>
                                    <small>05/05/2025</small>
                                </div>
                            </div>
                            <div className={cx('featured-post')}>
                                <img src={DEFAULT_AVATAR} alt="Featured post" />
                                <div className={cx('featured-post-info')}>
                                    <h6>
                                        <a href="#" className="text-decoration-none text-dark">
                                            10 Chiến lược làm bài thi TOEIC hiệu quả cho người mới bắt đầu
                                        </a>
                                    </h6>
                                    <small>05/05/2025</small>
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

export default Blog;
