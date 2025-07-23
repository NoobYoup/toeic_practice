import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { jwtDecode } from 'jwt-decode';
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
    const [filters, setFilters] = useState({});

    const [optionsPhan, setOptionsPhan] = useState([{ value: '', label: 'Tất cả phần' }]);

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    async function fetchPassages() {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllPassage(currentPage, filters);

            setPassages(res.data.data || []);
            setPagination(res.data.pagination || { page: 1, limit: 7, total: 0 });
            setOptionsPhan([
                { value: '', label: 'Tất cả phần' },
                ...res.data.dsPhanCauHoi.map((item) => ({
                    value: item.id_phan.toString(),
                    label: item.ten_phan,
                })),
            ]);
        } catch (err) {
            setError('Không thể tải danh sách đoạn văn');
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchPassages();
    }, [currentPage, filters]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            window.confirm('Bạn có chắc chắn muốn xóa đoạn văn này không?');
            await deletePassage(id);
            fetchPassages();
            toast.success('Xóa đoạn văn thành công!');
            // setCurrentPage(1);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
        }
        setLoading(false);
    };

    const handleSelectChange = (selected, { name }) => {
        setFilters((prev) => ({ ...prev, [name]: selected.value }));
        setCurrentPage(1);
    };

    const handleUpdate = () => {
        setFilters({});
        setCurrentPage(1);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý đoạn văn</h2>
                <div>
                    {user.permissions.includes('PASSAGE_CREATE') ? (
                        <Link to="create" className="btn btn-primary">
                            <i className="fas fa-plus-circle me-2"></i>Thêm đoạn văn
                        </Link>
                    ) : (
                        <button className="btn btn-primary" disabled>
                            <i className="fas fa-plus-circle me-2"></i>Thêm đoạn văn
                        </button>
                    )}
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-md-3">
                    <Select
                        name="id_phan"
                        options={optionsPhan}
                        onChange={handleSelectChange}
                        value={optionsPhan.find((opt) => opt.value === (filters.id_phan ?? '')) || optionsPhan[0]}
                    />
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                    <button className="btn btn-info d-block ms-auto" onClick={handleUpdate}>
                        <i className="fas fa-sync-alt me-2"></i>Cập nhật
                    </button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center my-4">
                                <i className="fas fa-spinner fa-spin fa-2x"></i>
                            </div>
                        ) : (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tiêu đề</th>
                                        <th>Nội dung</th>
                                        <th>Loại đoạn văn</th>
                                        <th>Phần</th>
                                        <th>Thời gian tạo</th>
                                        <th>Thời gian cập nhật</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.permissions.includes('PASSAGE_VIEW') && passages.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center text-muted">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    ) : (
                                        passages.map((passage) => (
                                            <tr key={passage.id_doan_van}>
                                                <td>{passage.id_doan_van}</td>
                                                <td>
                                                    {passage.tieu_de && passage.tieu_de.length > 30
                                                        ? passage.tieu_de.slice(0, 30) + '...'
                                                        : passage.tieu_de || 'Không'}
                                                </td>
                                                <td>
                                                    <div className="passage-excerpt">
                                                        {passage.noi_dung && passage.noi_dung.length > 10
                                                            ? passage.noi_dung.slice(0, 50) + '...'
                                                            : passage.noi_dung || 'Không'}
                                                    </div>
                                                </td>
                                                <td>
                                                    {passage.loai_doan_van === 'single'
                                                        ? 'Single'
                                                        : passage.loai_doan_van === 'double'
                                                        ? 'Double'
                                                        : 'Triple'}
                                                </td>
                                                <td>{passage.id_phan}</td>
                                                <td>
                                                    {format(new Date(passage.thoi_gian_tao), 'dd/MM/yyyy HH:mm', {
                                                        locale: vi,
                                                    })}
                                                </td>
                                                <td>
                                                    {format(new Date(passage.thoi_gian_cap_nhat), 'dd/MM/yyyy HH:mm', {
                                                        locale: vi,
                                                    })}
                                                </td>

                                                <td>
                                                    <div className="btn-group">
                                                        {user.permissions.includes('PASSAGE_UPDATE') ? (
                                                            <Link
                                                                to={`/admin/test/paragraph/edit/${passage.id_doan_van}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('PASSAGE_DELETE') ? (
                                                            <button
                                                                onClick={() => handleDelete(passage.id_doan_van)}
                                                                className="btn btn-sm btn-outline-danger"
                                                            >
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-danger" disabled>
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

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
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Paragraph;
