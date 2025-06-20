import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ChooseQuestion from './Modal/ChooseQuestion';
import { createExam, addQuestionToExam, approveExam } from '@/services/examService';

function CreateExam() {
    const [tenBaiThi, setTenBaiThi] = useState('');
    const [thoiGianBaiThi, setThoiGianBaiThi] = useState('');
    const [namXuatBan, setNamXuatBan] = useState('');
    const [laBaiThiDauVao, setLaBaiThiDauVao] = useState(false);

    const [content, setContent] = useState('');
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [approving, setApproving] = useState(false);
    const [addingQuestions, setAddingQuestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [examId, setExamId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ten_bai_thi: tenBaiThi,
                mo_ta: content,
                thoi_gian_bai_thi: Number(thoiGianBaiThi),
                la_bai_thi_dau_vao: laBaiThiDauVao,
                nam_xuat_ban: Number(namXuatBan),
            };
            const res = await createExam(payload);
            console.log(res);
            setExamId(res.data.data.id_bai_thi); // Lưu ID bài thi vào state
            toast.success(res.data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        }
        setLoading(false);
    };

    // Gọi khi thêm câu hỏi vào đề thi (nếu còn dùng ở nơi khác)
    const handleAddQuestions = async () => {
        if (!examId || selectedQuestions.length === 0) return;
        const ids = selectedQuestions.map((q) => q.id_cau_hoi);
        setAddingQuestions(true);
        try {
            const res = await addQuestionToExam(examId, ids);
            toast.success(res.data.message || 'Đã thêm câu hỏi vào đề thi');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Thêm câu hỏi thất bại');
        }
        setAddingQuestions(false);
    };

    const handleApproveExam = async () => {
        if (!examId) return;
        setApproving(true);
        try {
            const res = await approveExam(examId);
            toast.success(res.data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setApproving(false);
    };

    return (
        <>
            <h1>Thông tin đề thi</h1>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="question-form">
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <div class="form-group">
                                    <label for="examName" class="form-label">
                                        Tên đề thi
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="examName"
                                        placeholder="Nhập tên đề thi"
                                        value={tenBaiThi}
                                        onChange={(e) => setTenBaiThi(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div class="form-group">
                                    <label for="examTime" class="form-label">
                                        Thời gian làm bài (phút)
                                    </label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="examTime"
                                        placeholder="Nhập thời gian làm bài"
                                        value={thoiGianBaiThi}
                                        onChange={(e) => setThoiGianBaiThi(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div class="form-group">
                                    <label for="examTime" class="form-label">
                                        Năm xuất bản
                                    </label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="examYear"
                                        placeholder="Nhập năm xuất bản"
                                        value={namXuatBan}
                                        onChange={(e) => setNamXuatBan(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div class="form-check form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        checked={laBaiThiDauVao}
                                        onChange={(e) => setLaBaiThiDauVao(e.target.checked)}
                                    />
                                    <label class="form-check-label">Bài thi đầu vào</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionContent" className="form-label">
                                Mô tả
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                                config={{
                                    placeholder: 'Mô tả ngắn về đề thi',
                                }}
                            />
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Tạo nháp
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {examId && (
                <>
                    <h1>Chọn câu hỏi</h1>
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group mb-3">
                                <div className="d-grid">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => setShowChooseModal(true)}
                                    >
                                        <i className="fas fa-list-check me-2"></i>Chọn câu hỏi từ ngân hàng
                                    </button>
                                </div>
                            </div>

                            {/* Hiển thị số câu hỏi đã chọn */}
                            {selectedQuestions.length > 0 && (
                                <>
                                    <p className="text-success">Đã chọn {selectedQuestions.length} câu hỏi</p>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Loại</th>
                                                    <th>Phần</th>
                                                    <th>Nội dung</th>
                                                    <th>Độ khó</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedQuestions.map((q) => (
                                                    <tr key={q.id_cau_hoi}>
                                                        <td>{q.id_cau_hoi}</td>
                                                        <td>
                                                            {q.phan.loai_phan === 'listening' ? 'Listening' : 'Reading'}
                                                        </td>
                                                        <td>{q.phan.ten_phan}</td>
                                                        <td style={{ maxWidth: '250px' }}>
                                                            <div className="text-truncate" style={{ maxWidth: '100%' }}>
                                                                {q.noi_dung}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {q.muc_do_kho === 'de'
                                                                ? 'Dễ'
                                                                : q.muc_do_kho === 'trung_binh'
                                                                ? 'Trung bình'
                                                                : 'Khó'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}

                            <div className="text-end">
                                <Link to="/admin/question-bank" type="button" className="btn btn-secondary me-2">
                                    Hủy
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    disabled={approving || !examId}
                                    onClick={handleApproveExam}
                                >
                                    {approving && <i className="fas fa-spinner fa-spin me-2"></i>}
                                    Duyệt đề thi
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal choose question */}
            <ChooseQuestion
                isOpen={showChooseModal}
                onClose={() => setShowChooseModal(false)}
                onSelect={(qs) => setSelectedQuestions(qs)}
                examId={examId}
            />
        </>
    );
}

export default CreateExam;
