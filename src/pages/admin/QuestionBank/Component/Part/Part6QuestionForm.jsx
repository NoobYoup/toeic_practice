// Part6QuestionForm.jsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Part6QuestionForm({ formData, setFormData }) {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="passage" className="form-label">
                    Đoạn văn
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.passage}
                    onChange={(event, editor) => setFormData({ ...formData, passage: editor.getData() })}
                    config={{ placeholder: 'Nhập đoạn văn cho Part 6...' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="questionContent" className="form-label">
                    Nội dung câu hỏi
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.noi_dung}
                    onChange={(event, editor) => setFormData({ ...formData, noi_dung: editor.getData() })}
                    config={{ placeholder: 'Nhập câu hỏi liên quan đến đoạn văn...' }}
                />
            </div>
        </>
    );
}

export default Part6QuestionForm;
