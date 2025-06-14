import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllPassage, deletePassage } from '@/services/passageService';
import styles from './Paragraph.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Paragraph() {
    const [passages, setPassages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, limit: 7, total: 0 });
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchPassages() {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllPassage(currentPage);
            setPassages(res.data.data || []);
            setPagination(res.data.pagination || { page: 1, limit: 7, total: 0 });
        } catch (err) {
            setError('Không thể tải danh sách đoạn văn');
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchPassages();
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deletePassage(id);
            fetchPassages();
            toast.success('Xóa đoạn văn thành công!');
            // setCurrentPage(1);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý đoạn văn</h2>
                <div>
                    <Link to="create" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm đoạn văn
                    </Link>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Tìm kiếm đoạn văn..." />
                                <button className="btn btn-outline-secondary" type="button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 text-end">
                            <div className="btn-group">
                                <button type="button" className="btn btn-outline-secondary">
                                    <i className="fas fa-filter me-1"></i>Lọc
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Tất cả
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Đang hoạt động
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Bản nháp
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center my-4">
                                <i className="fas fa-spinner fa-spin fa-2x"></i>
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="selectAll" />
                                            </div>
                                        </th>
                                        <th>ID</th>
                                        <th>Tiêu đề</th>
                                        <th>Nội dung</th>
                                        <th>Phần</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passages.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center text-muted">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    ) : (
                                        passages.map((passage) => (
                                            <tr key={passage.id_doan_van}>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td>{passage.id_doan_van}</td>
                                                <td>
                                                    <strong>{passage.tieu_de}</strong>
                                                </td>
                                                <td>
                                                    <div className="passage-excerpt">
                                                        {passage.noi_dung.length > 100
                                                            ? passage.noi_dung.slice(0, 100) + '...'
                                                            : passage.noi_dung}
                                                    </div>
                                                </td>

                                                <td>{passage.id_phan}</td>
                                                <td>
                                                    {/* <Link
                                                        to={`/admin/paragraph/detail/${passage.id_doan_van}`}
                                                        className="btn btn-sm btn-outline-info me-1"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </Link> */}
                                                    <Link
                                                        to={`/admin/test/paragraph/edit/${passage.id_doan_van}`}
                                                        className="btn btn-sm btn-outline-primary me-1"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(passage.id_doan_van)}
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Sau"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={Math.ceil(pagination.total / pagination.limit)}
                            previousLabel="Trước"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            activeClassName="active"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            forcePage={currentPage - 1}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Paragraph;
