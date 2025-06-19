import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ChooseQuestion from './Modal/ChooseQuestion';
import { createExam } from '@/services/examService';

function CreateExam() {
    const [tenBaiThi, setTenBaiThi] = useState('');
    const [thoiGianBaiThi, setThoiGianBaiThi] = useState('');
    const [namXuatBan, setNamXuatBan] = useState('');
    const [laBaiThiDauVao, setLaBaiThiDauVao] = useState(false);

    const [content, setContent] = useState('');
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

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
            toast.success('Tạo đề thi thành công');
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Thêm đề thi mới</h1>
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
                                        min="0"
                                        max="120"
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
                                        min='2000'
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

                        <div class="form-group mb-3">
                            <label class="form-label">Chọn câu hỏi</label>
                            <div class="d-grid">
                                <button
                                    type="button"
                                    class="btn btn-outline-primary" onClick={() => setShowChooseModal(true)}
                                >
                                    <i class="fas fa-list-check me-2"></i>Chọn câu hỏi từ ngân hàng
                                </button>
                            </div>
                        </div>

                        {/* Hiển thị số câu hỏi đã chọn */}
                        {selectedQuestions.length > 0 && (
                            <p className="text-success">Đã chọn {selectedQuestions.length} câu hỏi</p>
                        )}

                        <div className="text-end">
                            <Link to="/admin/question-bank" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success" >
                                
                                Thêm đề thi
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal choose question */}
            <ChooseQuestion
                isOpen={showChooseModal}
                onClose={() => setShowChooseModal(false)}
                onSelect={(qs) => setSelectedQuestions(qs)}
            />
        </>
    );
}

export default CreateExam;
