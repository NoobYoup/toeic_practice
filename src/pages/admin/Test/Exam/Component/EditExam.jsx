import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ChooseQuestion from './Modal/ChooseQuestion';
import { editExam, getDraftExam, approveExam } from '@/services/examService';

function EditExam() {
    const { id } = useParams();
    const navigate = useNavigate();

    /* ------------------------------------------------------------ */
    /* STATE                                                         */
    /* ------------------------------------------------------------ */
    const [tenBaiThi, setTenBaiThi] = useState('');
    const [thoiGianBaiThi, setThoiGianBaiThi] = useState('');
    const [namXuatBan, setNamXuatBan] = useState('');
    const [laBaiThiDauVao, setLaBaiThiDauVao] = useState(false);

    const [content, setContent] = useState('');
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const [loading, setLoading] = useState(false); // loading for update
    const [fetching, setFetching] = useState(true); // fetching existing data
    const [approving, setApproving] = useState(false);

    /* ------------------------------------------------------------ */
    /* FETCH EXISTING EXAM                                           */
    /* ------------------------------------------------------------ */
    useEffect(() => {
        const fetchExam = async () => {
            setFetching(true);
            try {
                const res = await getDraftExam(id);
                const data = res.data.data;
                setTenBaiThi(data.ten_bai_thi || '');
                setThoiGianBaiThi(data.thoi_gian_bai_thi || data.thoi_gian_thi || '');
                setNamXuatBan(data.nam_xuat_ban);
                setLaBaiThiDauVao(Boolean(data.la_bai_thi_dau_vao));
                setContent(data.mo_ta || '');
                // Nếu API trả về danh sách câu hỏi => lưu để hiển thị
                if (Array.isArray(data.cau_hoi_cua_bai_thi)) {
                    setSelectedQuestions(data.cau_hoi_cua_bai_thi.map((item) => item.cau_hoi));
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
                toast.error(err?.response?.data?.message || 'Không thể tải thông tin đề thi!');
                navigate('/admin/test/exam');
            }
            setFetching(false);
        };
        if (id) fetchExam();
    }, [id, navigate]);

    /* ------------------------------------------------------------ */
    /* HANDLERS                                                      */
    /* ------------------------------------------------------------ */
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
            console.log(payload);
            const res = await editExam(id, payload);
            toast.success(res.data.message);
            navigate('/admin/test/exam');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            toast.error(err?.response?.data?.message);
        }
        setLoading(false);
    };

    const handleApproveExam = async () => {
        if (!id) return;
        setApproving(true);
        try {
            const res = await approveExam(id);
            toast.success(res.data.message || 'Đã duyệt đề thi');
            navigate('/admin/test/exam');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            toast.error(err?.response?.data?.message || 'Duyệt đề thi thất bại');
        }
        setApproving(false);
    };

    /* ------------------------------------------------------------ */
    /* RENDER                                                        */
    /* ------------------------------------------------------------ */
    if (fetching) {
        return (
            <div className="text-center ">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    return (
        <>
            <h1>Sửa đề thi</h1>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="question-form">
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="examName" className="form-label">
                                        Tên đề thi
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="examName"
                                        placeholder="Nhập tên đề thi"
                                        value={tenBaiThi}
                                        onChange={(e) => setTenBaiThi(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="examTime" className="form-label">
                                        Thời gian làm bài (phút)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="examTime"
                                        placeholder="Nhập thời gian làm bài"
                                        value={thoiGianBaiThi}
                                        onChange={(e) => setThoiGianBaiThi(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="examYear" className="form-label">
                                        Năm xuất bản
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="examYear"
                                        placeholder="Nhập năm xuất bản"
                                        value={namXuatBan}
                                        onChange={(e) => setNamXuatBan(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="form-check-label">Bài thi đầu vào</label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={laBaiThiDauVao}
                                        onChange={(e) => setLaBaiThiDauVao(e.target.checked)}
                                    />
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
                            <Link to="/admin/test/exam" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Quản lý câu hỏi */}
            <h1 className="mt-4">Quản lý câu hỏi</h1>
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
                                                <td>{q.phan?.loai_phan === 'listening' ? 'Listening' : 'Reading'}</td>
                                                <td>{q.phan?.ten_phan}</td>
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
                        <button
                            type="button"
                            className="btn btn-success"
                            disabled={approving || !id}
                            onClick={handleApproveExam}
                        >
                            {approving && <i className="fas fa-spinner fa-spin me-2"></i>}
                            Duyệt đề thi
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal choose question */}
            <ChooseQuestion
                isOpen={showChooseModal}
                onClose={() => setShowChooseModal(false)}
                onSelect={(qs) =>
                    setSelectedQuestions((prev) => [
                        ...prev,
                        ...qs.filter((q) => !prev.find((p) => p.id_cau_hoi === q.id_cau_hoi)),
                    ])
                }
                examId={id}
                initialSelectedIds={selectedQuestions.map((q) => q.id_cau_hoi)}
            />
        </>
    );
}

export default EditExam;
