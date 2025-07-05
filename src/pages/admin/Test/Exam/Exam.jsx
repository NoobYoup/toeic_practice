import { Link } from 'react-router-dom';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import styles from './Exam.module.scss';
import { getAllExam, deleteExam } from '@/services/examService';
import { getMe } from '@/services/userService';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Exam() {
    const [exams, setExams] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 });

    const [optionsTrangThai, setOptionsTrangThai] = useState([{ value: '', label: 'Tất cả trạng thái' }]);
    const [optionsNamXuatBan, setOptionsNamXuatBan] = useState([{ value: '', label: 'Tất cả năm xuất bản' }]);

    const fetchExams = async () => {
        setLoading(true);
        try {
            const res = await getAllExam(currentPage, filters);
            console.log(res.data.data);
            setExams(res.data.data);
            setPagination((prev) => ({
                ...prev,
                total: res.data.pagination.total,
                limit: res.data.pagination.limit,
            }));
            setOptionsTrangThai([
                { value: '', label: 'Tất cả trạng thái' },
                ...res.data.dsTrangThai.map((item) => ({
                    value: item,
                    label:
                        item === 'da_xuat_ban'
                            ? 'Đã xuất bản'
                            : item === 'luu_tru'
                            ? 'Lưu trữ'
                            : item === 'nhap'
                            ? 'Nháp'
                            : item,
                })),
            ]);
            setOptionsNamXuatBan([
                { value: '', label: 'Tất cả năm xuất bản' },
                ...res.data.dsNamXuatBan.map(({ nam_xuat_ban }) => ({
                    value: nam_xuat_ban,
                    label: nam_xuat_ban,
                })),
            ]);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await getMe();
            setCurrentUser(res.data);
        } catch (err) {
            console.error('Failed to fetch current user', err);
        }
    };

    useEffect(() => {
        fetchExams();
        fetchCurrentUser();
    }, [currentPage, filters]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleSelectChange = (selected, { name }) => {
        setFilters((prev) => ({ ...prev, [name]: selected.value }));
        setCurrentPage(1);
    };

    const handleDeleteExam = async (examId) => {
        try {
            const res = await deleteExam(examId);
            toast.success(res.data.message);
            await fetchExams();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    const handleUpdate = () => {
        setFilters({});
        setCurrentPage(1);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý đề thi</h2>
                <div>
                    <Link to="create-exam" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm đề thi
                    </Link>
                </div>
            </div>

            <div className="row g-3 mb-3">
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
                <div className="col-md-3">
                    <Select
                        name="nam_xuat_ban"
                        options={optionsNamXuatBan}
                        onChange={handleSelectChange}
                        value={
                            optionsNamXuatBan.find((opt) => opt.value === (filters.nam_xuat_ban ?? '')) ||
                            optionsNamXuatBan[0]
                        }
                    />
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
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
                                        <th>Tên bài thi</th>
                                        <th>Mô tả</th>
                                        <th>Mức độ điểm</th>
                                        <th>Số câu hỏi</th>
                                        <th>Năm xuất bản</th>
                                        <th>Bài thi đầu vào</th>
                                        <th>Loại bài thi</th>
                                        <th>Trạng thái</th>
                                        <th>Người tạo</th>
                                        <th>Thời gian tạo</th>
                                        <th>Thời gian cập nhật</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams.length === 0 ? (
                                        <tr>
                                            <td colSpan={13} className="text-center text-muted">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    ) : (
                                        exams.map((exam) => (
                                            <tr key={exam.id_bai_thi}>
                                                <td>{exam.id_bai_thi}</td>
                                                <td>{exam.ten_bai_thi}</td>
                                                <td>{exam.mo_ta}</td>
                                                <td>{exam.muc_do_diem}</td>
                                                <td>{exam.so_luong_cau_hoi}</td>
                                                <td>{exam.nam_xuat_ban}</td>
                                                <td>{exam.la_bai_thi_dau_vao ? 'Có' : 'Không'}</td>
                                                <td>{exam.loai_bai_thi === 'tu_do' ? 'Tự do' : 'Chuẩn'}</td>
                                                <td>{exam.trang_thai === 'da_xuat_ban' ? 'Đã xuất bản' : 'Nháp'}</td>
                                                <td>
                                                    {currentUser
                                                        ? currentUser.vai_tro === 'quan_tri_vien'
                                                            ? 'Quản trị viên'
                                                            : 'Giáo viên'
                                                        : ''}
                                                </td>
                                                <td>
                                                    {format(new Date(exam.thoi_gian_tao), 'dd/MM/yyyy HH:mm', {
                                                        locale: vi,
                                                    })}
                                                </td>
                                                <td>
                                                    {format(new Date(exam.thoi_gian_cap_nhat), 'dd/MM/yyyy HH:mm', {
                                                        locale: vi,
                                                    })}
                                                </td>
                                                <td>
                                                    <div className="btn-group">
                                                        <Link
                                                            to={`detail-exam/${exam.id_bai_thi}`}
                                                            // onClick={() => localStorage.setItem('examId', exam.id_bai_thi)}
                                                            className="btn btn-sm btn-outline-info"
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </Link>
                                                        <Link
                                                            to={`edit-exam/${exam.id_bai_thi}`}
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteExam(exam.id_bai_thi)}
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
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
        </>
    );
}

export default Exam;
