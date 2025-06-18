import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { getAllQuestion } from '@/services/questionService';
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

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const res = await getAllQuestion(pagination.page, filters);
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

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý Ngân Hàng Câu Hỏi</h2>
                <div>
                    <button className="btn btn-success me-2">
                        <i className="fas fa-file-excel me-2"></i>Import Excel
                    </button>
                    <Link to="create-question" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm Câu Hỏi
                    </Link>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
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
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-md-3">
                        <Select
                            name="id_phan"
                            options={optionsPhan}
                            onChange={handleSelectChange}
                            defaultValue={optionsPhan[0]}
                        />
                    </div>
                    <div className="col-md-3">
                        <Select
                            name="muc_do_kho"
                            options={optionsMucDo}
                            onChange={handleSelectChange}
                            defaultValue={optionsMucDo[0]}
                        />
                    </div>
                    <div className="col-md-3">
                        <Select
                            name="trang_thai"
                            options={optionsTrangThai}
                            onChange={handleSelectChange}
                            defaultValue={optionsTrangThai[0]}
                        />
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
                                            <th>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="selectAll"
                                                    />
                                                </div>
                                            </th>
                                            <th>ID</th>
                                            <th>Loại</th>
                                            <th>Phần</th>
                                            <th>Nội dung câu hỏi</th>
                                            <th>Độ khó</th>
                                            <th>Nguồn gốc</th>
                                            <th>Trạng thái</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questions.length > 0 ? (
                                            questions.map((question) => (
                                                <tr key={question.id_cau_hoi}>
                                                    <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" />
                                                        </div>
                                                    </td>
                                                    <td className="">{question.id_cau_hoi}</td>
                                                    <td className="">
                                                        {question.phan.loai_phan === 'listening' ? (
                                                            <span
                                                                className={`${cx(
                                                                    'badge',
                                                                    'question-type-listening',
                                                                )} rounded-pill px-3 py-2`}
                                                            >
                                                                {question.phan.loai_phan === 'listening' ? 'Listening' : ''}
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
                                                    <td className="">
                                                        {question.phan.ten_phan}
                                                    </td>
                                                    <td className="">
                                                        <div className="d-flex align-items-center">
                                                            {question.noi_dung}
                                                        </div>
                                                    </td>
                                                    <td className="">
                                                        {question.muc_do_kho === 'de'
                                                            ? 'Dễ'
                                                            : question.muc_do_kho === 'trung_binh'
                                                            ? 'Trung bình'
                                                            : 'Khó'}
                                                    </td>
                                                    <td className="">
                                                        {question.nguon_goc === 'thu_cong' ? 'Thủ công' : ''}
                                                    </td>
                                                    <td className="">
                                                        {question.trang_thai === 'da_xuat_ban'
                                                            ? 'Đã xuất bản'
                                                            : question.trang_thai === 'luu_tru'
                                                            ? 'Lưu trữ'
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`detail-question/${question.id_cau_hoi}`}
                                                            className="btn btn-sm btn-outline-info me-1"
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </Link>
                                                        <Link
                                                            to={`edit-question/${question.id_cau_hoi}`}
                                                            className="btn btn-sm btn-outline-primary me-1"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9" className="text-center">
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
        </>
    );
}

export default Question;
