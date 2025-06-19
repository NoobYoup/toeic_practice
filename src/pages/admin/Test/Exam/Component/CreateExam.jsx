import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CreateExam() {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nội dung câu hỏi:', content);
        // Thêm logic gửi content về API tại đây
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
                                        id="examTime"
                                        placeholder="Nhập năm xuất bản"
                                        min='2000'
                                        
                                    />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" defaultChecked />
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

                        <div class="form-group mb-3">
                            <label class="form-label">Chọn câu hỏi</label>
                            <div class="d-grid">
                                <button
                                    type="button"
                                    class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#selectQuestionsModal"
                                >
                                    <i class="fas fa-list-check me-2"></i>Chọn câu hỏi từ ngân hàng
                                </button>
                            </div>
                        </div>

                        <div className="text-end">
                            <Link to="/admin/question-bank" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success">
                                Thêm đề thi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateExam;
