import { useState, useEffect } from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllQuestionExam, addQuestionToExam, updateQuestionExam } from '@/services/examService';
import { toast } from 'react-toastify';

/**
 * Modal chọn câu hỏi (sử dụng trong tạo đề thi)
 *
 * Props:
 *  - isOpen: boolean   : điều khiển bật / tắt modal
 *  - onClose: () => void : hàm đóng modal
 *  - onSelect: (questions: array) => void : callback khi người dùng chọn câu hỏi và nhấn Xác nhận
 */
function ChooseQuestion({ isOpen, onClose, onSelect, examId, initialSelectedIds = [] }) {
    /* States */
    const [questions, setQuestions] = useState([]);
    const [selectedIds, setSelectedIds] = useState(initialSelectedIds);
    const [selectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [filters, setFilters] = useState({});

    const [optionsPhan, setOptionsPhan] = useState([{ value: '', label: 'Tất cả phần' }]);
    const [optionsMucDo] = useState([
        { value: '', label: 'Tất cả độ khó' },
        { value: 'de', label: 'Dễ' },
        { value: 'trung_binh', label: 'Trung bình' },
        { value: 'kho', label: 'Khó' },
    ]);
    const [optionsTrangThai] = useState([
        { value: '', label: 'Tất cả trạng thái' },
        { value: 'da_xuat_ban', label: 'Đã xuất bản' },
        { value: 'luu_tru', label: 'Lưu trữ' },
    ]);

    const [pagination, setPagination] = useState({ page: 1, limit: 7, total: 0 });
    const [currentPage, setCurrentPage] = useState(1);

    /* Fetch */
    async function fetchQuestions() {
        setLoading(true);
        try {
            const res = await getAllQuestionExam(currentPage, filters);
            setQuestions(res.data.data || []);
            setPagination(res.data.pagination || { page: 1, limit: 7, total: 0 });
            // Lấy options phần
            if (res.data.dsPhan) {
                setOptionsPhan([
                    { value: '', label: 'Tất cả phần' },
                    ...res.data.dsPhan.map((item) => ({
                        value: item.id_phan.toString(),
                        label: item.ten_phan,
                    })),
                ]);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
        setLoading(false);
    }

    // Khi mở modal lần đầu: reset lựa chọn theo `initialSelectedIds`
    useEffect(() => {
        if (isOpen) {
            setSelectedIds(initialSelectedIds);
            // Khôi phục dữ liệu câu hỏi đã chọn (nếu cha truyền vào sau này ta có thể map từ ids -> objects)
            // Hiện tại chỉ reset mảng dữ liệu, giữ lại các id để checkbox hiển thị đúng
            setSelectedData([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Gọi API mỗi khi trang hoặc bộ lọc thay đổi (khi modal đang mở)
    useEffect(() => {
        if (isOpen) {
            fetchQuestions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, currentPage, filters]);

    /* Handlers */
    const handlePageClick = (e) => setCurrentPage(e.selected + 1);

    const handleSelectChange = (selected, { name }) => {
        setFilters((prev) => ({ ...prev, [name]: selected.value }));
        setCurrentPage(1);
    };

    const handleCheckbox = (question) => {
        const id = question.id_cau_hoi;
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
        setSelectedData((prev) => {
            if (prev.find((q) => q.id_cau_hoi === id)) {
                return prev.filter((q) => q.id_cau_hoi !== id);
            }
            return [...prev, question];
        });
    };

    const [adding, setAdding] = useState(false);

    const handleConfirm = async () => {
        if (!examId || selectedIds.length === 0) {
            onClose();
            return;
        }
        // Chỉ thêm những câu hỏi chưa có trước đó
        const newIds = selectedIds.filter((id) => !initialSelectedIds.includes(id));
        if (newIds.length === 0) {
            onClose();
            return;
        }
        setAdding(true);
        try {
            await addQuestionToExam(examId, newIds);
            toast.success('Đã thêm câu hỏi vào đề thi');
            if (onSelect) onSelect(selectedData);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Thêm câu hỏi thất bại');
        }
        setAdding(false);
    };

    const handleUpdateQuestionExam = async () => {
        if (!examId || selectedIds.length === 0) {
            toast.error('Vui lòng chọn ít nhất một câu hỏi!');
            return;
        }
        setUpdating(true);
        try {
            await updateQuestionExam(examId, { ds_cau_hoi: selectedIds });
            toast.success('Cập nhật danh sách câu hỏi thành công!');
            if (onSelect) onSelect(); // callback để reload ngoài EditExam
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Cập nhật câu hỏi thất bại');
        }
        setUpdating(false);
    };

    /* Animation variants */
    const backdrop = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modal = {
        hidden: { y: -50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -50, opacity: 0 },
    };

    // Thêm biến xác định chế độ
    const isEditMode = !!examId;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-backdrop show d-flex align-items-center justify-content-center"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded shadow w-100 mx-3"
                        style={{ maxWidth: '80%' }}
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Chọn câu hỏi</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="p-3">
                            {/* Filters */}
                            <div className="row g-3 mb-3">
                                <div className="col-md-3">
                                    <Select
                                        name="id_phan"
                                        options={optionsPhan}
                                        onChange={handleSelectChange}
                                        value={
                                            optionsPhan.find((opt) => opt.value === (filters.id_phan ?? '')) ||
                                            optionsPhan[0]
                                        }
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Select
                                        name="muc_do_kho"
                                        options={optionsMucDo}
                                        onChange={handleSelectChange}
                                        value={
                                            optionsMucDo.find((opt) => opt.value === (filters.muc_do_kho ?? '')) ||
                                            optionsMucDo[0]
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
                                <div className="col-md-3">
                                    <p className="mb-0 text-end text-muted">Đã chọn: {selectedIds.length} câu hỏi</p>
                                </div>
                            </div>

                            {/* Table */}
                            {loading ? (
                                <div className="text-center">
                                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                                </div>
                            ) : (
                                <div className="table-responsive" style={{ maxHeight: '60vh' }}>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            questions.length > 0 &&
                                                            questions.every((q) => selectedIds.includes(q.id_cau_hoi))
                                                        }
                                                        onChange={(e) => {
                                                            const currentPageIds = questions.map((q) => q.id_cau_hoi);
                                                            if (e.target.checked) {
                                                                const currentPageObjects = questions.filter((q) =>
                                                                    currentPageIds.includes(q.id_cau_hoi),
                                                                );
                                                                setSelectedData((prev) => {
                                                                    const merged = [...prev];
                                                                    currentPageObjects.forEach((q) => {
                                                                        if (
                                                                            !merged.find(
                                                                                (i) => i.id_cau_hoi === q.id_cau_hoi,
                                                                            )
                                                                        ) {
                                                                            merged.push(q);
                                                                        }
                                                                    });
                                                                    return merged;
                                                                });
                                                                // Merge current page ids to selectedIds (no duplicates)
                                                                setSelectedIds((prev) =>
                                                                    Array.from(new Set([...prev, ...currentPageIds])),
                                                                );
                                                            } else {
                                                                // Remove only current page ids from selectedIds
                                                                setSelectedIds((prev) =>
                                                                    prev.filter((id) => !currentPageIds.includes(id)),
                                                                );
                                                                setSelectedData((prev) =>
                                                                    prev.filter(
                                                                        (q) => !currentPageIds.includes(q.id_cau_hoi),
                                                                    ),
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </th>
                                                <th>ID</th>
                                                <th>Loại</th>
                                                <th>Phần</th>
                                                <th>ID Đoạn văn</th>
                                                <th>ID Âm thanh</th>
                                                <th>ID Hình ảnh</th>
                                                <th>Nội dung câu hỏi</th>
                                                <th>Độ khó</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {questions.length > 0 ? (
                                                questions.map((question) => (
                                                    <tr key={question.id_cau_hoi}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedIds.includes(question.id_cau_hoi)}
                                                                onChange={() => handleCheckbox(question)}
                                                            />
                                                        </td>
                                                        <td>{question.id_cau_hoi}</td>
                                                        <td>
                                                            {question.phan.loai_phan === 'listening'
                                                                ? 'Listening'
                                                                : 'Reading'}
                                                        </td>
                                                        <td>{question.phan.ten_phan}</td>
                                                        <td>{question.id_doan_van || 'Không có'}</td>
                                                        <td>
                                                            {question.id_phuong_tien_am_thanh
                                                                ? question.id_phuong_tien_am_thanh
                                                                : 'Không có'}
                                                        </td>
                                                        <td>
                                                            {question.id_phuong_tien_hinh_anh
                                                                ? question.id_phuong_tien_hinh_anh
                                                                : 'Không có'}
                                                        </td>
                                                        <td style={{ maxWidth: '250px' }}>
                                                            <div className="text-truncate" style={{ maxWidth: '100%' }}>
                                                                {question.noi_dung
                                                                    ? question.noi_dung
                                                                    : 'Không có nội dung'}
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
                                                            {question.trang_thai === 'da_xuat_ban'
                                                                ? 'Đã xuất bản'
                                                                : 'Lưu trữ'}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        Không có dữ liệu
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="d-flex justify-content-center mt-3">
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
                        <div className="p-3 border-top d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Hủy
                            </button>
                            {/* Chỉ hiện nút Cập nhật khi ở chế độ chỉnh sửa */}
                            {isEditMode && (
                                <button
                                    className="btn btn-success"
                                    onClick={handleUpdateQuestionExam}
                                    disabled={updating || selectedIds.length === 0}
                                >
                                    {updating ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin me-2"></i>Đang lưu...
                                        </>
                                    ) : (
                                        'Cập nhật câu hỏi'
                                    )}
                                </button>
                            )}
                            {/* Chỉ hiện nút Thêm khi ở chế độ tạo mới */}
                            {!isEditMode && (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleConfirm}
                                    disabled={selectedIds.length === 0 || adding}
                                >
                                    {adding ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin me-2"></i>Đang thêm...
                                        </>
                                    ) : (
                                        'Thêm câu hỏi'
                                    )}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ChooseQuestion;
