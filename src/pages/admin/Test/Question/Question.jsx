import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getAllQuestion, importExcel, deleteQuestion } from '@/services/questionService';
import { toast } from 'react-toastify';
import styles from './QuestionBank.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Question() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 });
    const [filters, setFilters] = useState({});
    const [optionsTrangThai, setOptionsTrangThai] = useState([{ value: '', label: 'Tất cả trạng thái' }]);
    const [optionsMucDo, setOptionsMucDo] = useState([{ value: '', label: 'Tất cả mức độ' }]);
    const [optionsPhan, setOptionsPhan] = useState([{ value: '', label: 'Tất cả phần' }]);
    const [showImportModal, setShowImportModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [importing, setImporting] = useState(false);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const res = await getAllQuestion(pagination.page, filters);
            console.log(res.data.data);
            setQuestions(res.data.data);
            setPagination((prev) => ({
                ...prev,
                total: res.data.pagination.total,
                limit: res.data.pagination.limit,
            }));
            setOptionsTrangThai([
                { value: '', label: 'Tất cả trạng thái' },
                ...res.data.dsTrangThai.map((item) => ({
                    value: item,
                    label: item === 'da_xuat_ban' ? 'Đã xuất bản' : item === 'luu_tru' ? 'Lưu trữ' : item,
                })),
            ]);
            setOptionsMucDo([
                { value: '', label: 'Tất cả mức độ' },
                ...res.data.dsMucDoKho.map((item) => ({
                    value: item,
                    label: item === 'de' ? 'Dễ' : item === 'trung_binh' ? 'Trung bình' : item === 'kho' ? 'Khó' : item,
                })),
            ]);
            setOptionsPhan([
                { value: '', label: 'Tất cả phần' },
                ...res.data.dsPhan.map((item) => ({
                    value: item.id_phan.toString(),
                    label: item.ten_phan,
                })),
            ]);
        } catch (error) {
            console.log('Lỗi gọi API', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuestions();
    }, [pagination.page, filters]);

    const handlePageClick = (e) => {
        setPagination((prev) => ({ ...prev, page: e.selected + 1 }));
    };

    const handleSelectChange = (selected, { name }) => {
        setFilters((prev) => ({ ...prev, [name]: selected.value }));
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleImport = async () => {
        if (!selectedFile) {
            toast.warning('Vui lòng chọn file Excel để import');
            return;
        }

        setImporting(true);
        try {
            const response = await importExcel(selectedFile);
            toast.success(response.data.message);
            setShowImportModal(false);
            setSelectedFile(null);
            // Làm mới danh sách câu hỏi sau khi import
            fetchQuestions();
        } catch (error) {
            console.error('Lỗi khi import Excel:', error);
            toast.error(error.response?.data?.message);
        } finally {
            setImporting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteQuestion(id);
            toast.success(res.data.message);
            fetchQuestions();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
        }
    };

    const handleUpdate = () => {
        // Đặt lại filter về mặc định (rỗng)
        setFilters({});
        // Đặt lại trang về 1
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý Ngân Hàng Câu Hỏi</h2>
                <div>
                    <button className="btn btn-success me-2" onClick={() => setShowImportModal(true)}>
                        <i className="fas fa-file-excel me-2"></i>Import Excel
                    </button>

                    <Link to="create-question" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm Câu Hỏi
                    </Link>
                </div>
            </div>

            <div className="row mb-4">
                {/* <div className="col-md-4">
                    <div className={`${cx('card')} card text-white bg-primary`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Tổng số câu hỏi</h6>
                                    <h2 className="mb-0">{questions.length}</h2>
                                </div>
                                <i className="fas fa-question-circle fa-3x opacity-50"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${cx('card')} card text-white bg-info`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Câu hỏi Listening</h6>
                                    <h2 className="mb-0">
                                        {questions.filter((question) => question.phan.loai_phan === 'listening').length}
                                    </h2>
                                </div>
                                <i className="fas fa-headphones fa-3x opacity-50"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${cx('card')} card text-white bg-warning`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Câu hỏi Reading</h6>
                                    <h2 className="mb-0">
                                        {questions.filter((question) => question.phan.loai_phan === 'reading').length}
                                    </h2>
                                </div>
                                <i className="fas fa-book-open fa-3x opacity-50"></i>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="row g-3 mb-3">
                    <div className="col-md-3">
                        <Select
                            name="id_phan"
                            options={optionsPhan}
                            onChange={handleSelectChange}
                            value={optionsPhan.find((opt) => opt.value === (filters.id_phan ?? '')) || optionsPhan[0]}
                        />
                    </div>
                    <div className="col-md-3">
                        <Select
                            name="muc_do_kho"
                            options={optionsMucDo}
                            onChange={handleSelectChange}
                            value={
                                optionsMucDo.find((opt) => opt.value === (filters.muc_do_kho ?? '')) || optionsMucDo[0]
                            }
                        />
                    </div>
                    <div className="col-md-3">
                        <Select
                            name="trang_thai"
                            options={optionsTrangThai}
                            onChange={handleSelectChange}
                            value={
                                optionsTrangThai.find((opt) => opt.value === (filters.trang_thai ?? '')) ||
                                optionsTrangThai[0]
                            }
                        />
                    </div>
                    <div className="col-md-3 px-0">
                        <button className="btn btn-info d-block ms-auto" onClick={handleUpdate}>
                            <i className="fas fa-sync-alt me-2"></i>Cập nhật
                        </button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        {loading ? (
                            <div className="text-center">
                                <i className="fas fa-spinner fa-spin fa-2x"></i>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Loại</th>
                                            <th>Phần</th>
                                            <th>ID Đoạn văn</th>
                                            <th>ID Âm thanh</th>
                                            <th>ID Hình ảnh</th>
                                            <th>Nội dung câu hỏi</th>
                                            <th>Độ khó</th>
                                            <th>Nguồn gốc</th>
                                            <th>Trạng thái</th>
                                            <th>Ngày tạo</th>
                                            <th>Ngày cập nhật</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questions.length > 0 ? (
                                            questions.map((question) => (
                                                <tr key={question.id_cau_hoi}>
                                                    <td>{question.id_cau_hoi}</td>
                                                    <td>
                                                        {question.phan.loai_phan === 'listening' ? (
                                                            <span
                                                                className={`${cx(
                                                                    'badge',
                                                                    'question-type-listening',
                                                                )} rounded-pill px-3 py-2`}
                                                            >
                                                                {question.phan.loai_phan === 'listening'
                                                                    ? 'Listening'
                                                                    : ''}
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className={`${cx(
                                                                    'badge',
                                                                    'question-type-reading',
                                                                )} rounded-pill px-3 py-2`}
                                                            >
                                                                {question.phan.loai_phan === 'reading' ? 'Reading' : ''}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {question.phan.ten_phan && question.phan.ten_phan.length > 15
                                                            ? question.phan.ten_phan.slice(0, 15) + '...'
                                                            : question.phan.ten_phan}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {question.id_doan_van ? question.id_doan_van : 'Không'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {question.id_phuong_tien_am_thanh
                                                                ? question.id_phuong_tien_am_thanh
                                                                : 'Không'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {question.id_phuong_tien_hinh_anh
                                                                ? question.id_phuong_tien_hinh_anh
                                                                : 'Không'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {question.noi_dung && question.noi_dung.length > 20
                                                                ? question.noi_dung.slice(0, 20) + '...'
                                                                : question.noi_dung || 'Không có nội dung'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {question.muc_do_kho === 'de'
                                                            ? 'Dễ'
                                                            : question.muc_do_kho === 'trung_binh'
                                                            ? 'Trung bình'
                                                            : 'Khó'}
                                                    </td>
                                                    <td>
                                                        {question.nguon_goc === 'thu_cong'
                                                            ? 'Thủ công'
                                                            : question.nguon_goc === 'nhap_excel'
                                                            ? 'Nhập excel'
                                                            : ''}
                                                    </td>

                                                    <td>
                                                        {question.trang_thai === 'da_xuat_ban'
                                                            ? 'Đã xuất bản'
                                                            : question.trang_thai === 'luu_tru'
                                                            ? 'Lưu trữ'
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {format(new Date(question.thoi_gian_tao), 'dd/MM/yyyy HH:mm', {
                                                            locale: vi,
                                                        })}
                                                    </td>
                                                    <td>
                                                        {format(
                                                            new Date(question.thoi_gian_cap_nhat),
                                                            'dd/MM/yyyy HH:mm',
                                                            {
                                                                locale: vi,
                                                            },
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <Link
                                                                to={`detail-question/${question.id_cau_hoi}`}
                                                                className="btn btn-sm btn-outline-info"
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </Link>
                                                            <Link
                                                                to={`edit-question/${question.id_cau_hoi}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDelete(question.id_cau_hoi)}
                                                            >
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="13" className="text-center text-muted">
                                                    Không có dữ liệu
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
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
            </div>

            {/* Modal Import Excel */}
            {showImportModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Import câu hỏi từ Excel</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowImportModal(false);
                                        setSelectedFile(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="excelFile" className="form-label">
                                        Chọn file Excel
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="excelFile"
                                        accept=".xlsx, .xls"
                                        onChange={handleFileChange}
                                    />
                                    <div className="form-text">
                                        Vui lòng chọn file Excel theo đúng định dạng mẫu.
                                        <a href="/templates/import_question_template.xlsx" className="ms-2">
                                            Tải mẫu file
                                        </a>
                                    </div>
                                </div>
                                {selectedFile && (
                                    <div className="alert alert-info">
                                        <i className="fas fa-file-excel me-2"></i>
                                        {selectedFile.name}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowImportModal(false);
                                        setSelectedFile(null);
                                    }}
                                    disabled={importing}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleImport}
                                    disabled={!selectedFile || importing}
                                >
                                    {importing && <i className="fas fa-spinner fa-spin me-2"></i>}
                                    Import
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Question;
