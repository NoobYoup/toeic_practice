import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import classNames from 'classnames/bind';
import styles from '../CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function Part5QuestionForm(formData, setFormData) {
    return (
        <>
            <div className={cx('requirement-info')}>
                <h6>
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 5:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Không có file nghe, không có hình ảnh</li>
                    <li>1 câu hỏi điền từ vào chỗ trống</li>
                    <li>4 lựa chọn A, B, C, D (hiển thị text)</li>
                </ul>
            </div>

            <div className="mb-3">
                <label htmlFor="questionContent" className="form-label">
                    Nội dung câu hỏi
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.noi_dung}
                    onChange={(event, editor) => setFormData({ ...formData, noi_dung: editor.getData() })}
                    config={{ placeholder: 'Nhập nội dung tại đây...' }}
                />
            </div>

            {['A', 'B', 'C', 'D'].map((option, index) => (
                <div className="mb-3" key={option}>
                    <input
                        type="radio"
                        className="form-check-input me-2"
                        id={`option${option}`}
                        name="answerOption"
                        value={option}
                        onChange={(e) => setFormData({ ...formData, dap_an_dung: e.target.value })}
                    />
                    <label htmlFor={`option${option}`} className="form-label">
                        Lựa chọn {option}
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id={`option${option}`}
                        value={formData.lua_chon && formData.lua_chon[index] ? formData.lua_chon[index].noi_dung : ''}
                        onChange={(e) => {
                            const updatedOptions = [...formData.lua_chon];
                            updatedOptions[index].noi_dung = e.target.value;
                            setFormData({ ...formData, lua_chon: updatedOptions });
                        }}
                    />
                </div>
            ))}

            <div className="mb-3">
                <label htmlFor="questionExplanation" className="form-label">
                    Giải thích (nếu có)
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.giai_thich}
                    onChange={(event, editor) => setFormData({ ...formData, giai_thich: editor.getData() })}
                    config={{ placeholder: 'Nhập nội dung tại đây...' }}
                />
            </div>
        </>
    );
}

export default Part5QuestionForm;
