import styles from '@/pages/client/Blog/Blog.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

import { getGrammarHome } from '@/services/grammarService';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

function Grammar() {
    const [grammars, setGrammars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        limit: 10,
        page: 1,
    });
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        danh_muc: '',
    });

    // Gọi API khi filters hoặc currentPage thay đổi
    useEffect(() => {
        fetchGrammarHome();
    }, [filters, currentPage]);

    const fetchGrammarHome = async () => {
        setLoading(true);
        try {
            // Log params để debug
            const res = await getGrammarHome(currentPage, filters);
            setGrammars(res.data.data);
            setPagination((prev) => ({
                ...prev,
                total: res.data.pagination.total,
                limit: res.data.pagination.limit,
            }));
            setCategories(res.data.danhMucNguPhap);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Tạo options cho Select, thêm option 'Tất cả'
    const categoryOptions = [
        { value: '', label: 'Tất cả' },
        ...categories.map((category) => ({
            value: String(category.id_danh_muc),
            label: category.ten_danh_muc,
        })),
    ];

    // Lấy option đã chọn dựa trên filters
    const selectedCategory = categoryOptions.find((opt) => String(opt.value) === String(filters.danh_muc ?? ''));

    // Khi chọn danh mục, lưu vào localStorage, reset về trang 1
    const handleSelectChange = (selectedOption) => {
        setCurrentPage(1);
        setFilters((prev) => ({
            ...prev,
            danh_muc: selectedOption.value,
        }));
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    return (
        <>
            <header className={cx('blog-header')}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mx-auto text-center">
                            <h1 className="fw-bold mb-3">Ngữ pháp TOEIC</h1>
                            <p className="lead mb-4">Học ngữ pháp TOEIC từ cơ bản đến nâng cao.</p>
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
                    <>
                        <div className="d-flex justify-content-end my-3">
                            <Select
                                options={categoryOptions}
                                value={selectedCategory}
                                className="w-25"
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className={cx('blog-content')}>
                            {(!grammars || grammars.length === 0) && (
                                <p className="text-center text-muted">Không có ngữ pháp nào.</p>
                            )}
                            {grammars &&
                                grammars.length > 0 &&
                                grammars.map((grammar) => (
                                    <div key={grammar.id_tai_lieu}>
                                        <div className="card my-5 border-0 shadow p-4" style={{ borderRadius: '10px' }}>
                                            <h5 id="intro">{grammar.tieu_de}</h5>
                                            <hr />
                                            <div className="card-body">
                                                <p className="fs-4 fst-italic">{grammar.noi_dung}</p>
                                                <ul className="d-flex align-items-center">
                                                    <h5 className="text-decoration-underline mb-0">Ví dụ:</h5>

                                                    <li className="fs-5 list-unstyled ms-2">{grammar.vi_du}</li>
                                                </ul>
                                                <ul className="d-flex align-items-center">
                                                    <h5 className="text-decoration-underline mb-0">Ghi chú:</h5>

                                                    <li className="list-unstyled ms-2 fs-5">{grammar.ghi_chu}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {pagination.total > 0 && (
                                <ReactPaginate
                                    previousLabel={'Trước'}
                                    nextLabel={'Sau'}
                                    breakLabel={'...'}
                                    forcePage={currentPage - 1}
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
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Grammar;
