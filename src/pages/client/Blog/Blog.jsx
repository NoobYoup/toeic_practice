import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllBlogPublic } from '@/services/blogService';
import { getAllCategoryBlog } from '@/services/categoryBlogService';
import Select from 'react-select';

import styles from './Blog.module.scss';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);
const DEFAULT_AVATAR = '/images/logo_black.png';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await getAllBlogPublic(currentPage);
            setBlogs(res.data.data);
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

    const fetchCategories = async () => {
        const res = await getAllCategoryBlog();
        setCategories(res.data.data);
    };

    useEffect(() => {
        fetchBlogs();
        fetchCategories();
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    return (
        <>
            <header className={cx('blog-header')} style={{ flex: '1 0 auto' }}>
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

            <div className="container min-vh-100 py-5">
                {loading ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                                    {/* <div className="mb-3 mb-md-0">
                                        <span className="me-2">Hiển thị 1-9 của 42 bài viết</span>
                                    </div> */}
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <Select
                                                options={categories.map((category) => ({
                                                    value: category.id_danh_muc,
                                                    label: category.ten_danh_muc,
                                                }))}
                                                // onChange={(selectedOption) => {
                                                //     setCurrentPage(1);
                                                //     setFilters({
                                                //         ...filters,
                                                //         id_danh_muc: selectedOption.value,
                                                //     });
                                                // }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {blogs.length > 0 ? (
                                        blogs.map((blog) => (
                                            <div className="col-md-3" key={blog.id_bai_viet}>
                                                <div className={cx('blog-card')}>
                                                    <Link to={`/blog/detail-blog/${blog.id_bai_viet}`}>
                                                        <img
                                                            src={blog.hinh_anh.url_phuong_tien}
                                                            alt="TOEIC Test"
                                                            className="blog-card-img w-100 mb-2"
                                                            style={{
                                                                objectFit: 'cover',
                                                                height: '200px',
                                                            }}
                                                        />
                                                    </Link>
                                                    <div className="card-body p-2">
                                                        <Link
                                                            to={`/blog/detail-blog/${blog.id_bai_viet}`}
                                                            className={cx('category-badge')}
                                                        >
                                                            {blog.danh_muc_bai_viet.ten_danh_muc}
                                                        </Link>
                                                        <h3 className={cx('card-title')}>
                                                            <Link
                                                                to={`/blog/detail-blog/${blog.id_bai_viet}`}
                                                                className="text-decoration-none text-dark"
                                                            >
                                                                {blog.tieu_de}
                                                            </Link>
                                                        </h3>
                                                        <p className={cx('card-text')}>{blog.noi_dung}</p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <img
                                                                    src={
                                                                        blog.nguoi_dung.ho_so.url_hinh_dai_dien ||
                                                                        DEFAULT_AVATAR
                                                                    }
                                                                    alt="Author"
                                                                    className={`${cx('author-img')} me-2`}
                                                                />
                                                                <span className="text-muted small">
                                                                    {blog.nguoi_dung.ten_dang_nhap}
                                                                </span>
                                                            </div>
                                                            <small className="text-muted">
                                                                {new Date(blog.thoi_gian_tao).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-5">
                                            <span className="text-muted">Không có bài viết nào</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <div className="col-md-4">
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
                            </div> */}
                        </div>

                        <div className="mt-3">
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
                    </>
                )}
            </div>
        </>
    );
}

export default Blog;
