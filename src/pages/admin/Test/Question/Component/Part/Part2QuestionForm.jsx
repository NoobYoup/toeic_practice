// Part2QuestionForm.jsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import classNames from 'classnames/bind';
import styles from '../CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function Part2QuestionForm({ formData, setFormData, handleAudioChange, audioPreview, removeAudio, formatFileSize }) {
    return (
        <>
            <div className={cx('requirement-info')}>
                <h6>
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 2:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Bắt buộc có 1 file âm thanh (bao gồm cả câu hỏi và 3 đáp án A, B, C)</li>
                </ul>
            </div>

            <div className="mb-3">
                <label htmlFor="questionAudio" className="form-label">
                    Âm thanh (bắt buộc cho Part 2)
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="questionAudio"
                    accept="audio/*"
                    onChange={handleAudioChange}
                />
                {audioPreview && (
                    <div className="mb-3 p-3 border rounded bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <p className="mb-0 fw-medium">{formData.audio?.name}</p>
                                <small className="text-muted">{formatFileSize(formData.audio?.size)}</small>
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={removeAudio}>
                                Xóa
                            </button>
                        </div>
                        <audio controls className="w-100 mt-3" style={{ maxWidth: '400px' }}>
                            <source src={audioPreview} />
                            Trình duyệt không hỗ trợ audio.
                        </audio>
                    </div>
                )}
            </div>

            <hr className="my-4" />

            <div className="mb-3">
                <label htmlFor="questionContent" className="form-label">
                    Nội dung câu hỏi (hỏi đáp ngắn)
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.noi_dung}
                    onChange={(event, editor) => setFormData({ ...formData, noi_dung: editor.getData() })}
                    config={{ placeholder: 'Nhập câu hỏi hỏi đáp ngắn...' }}
                />
            </div>

            {['A', 'B', 'C'].map((option, index) => (
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
                        value={formData.lua_chon[index].noi_dung}
                        onChange={(e) => {
                            const updatedOptions = [...formData.lua_chon];
                            updatedOptions[index].noi_dung = e.target.value;
                            setFormData({ ...formData, lua_chon: updatedOptions });
                        }}
                    />
                </div>
            ))}

            <hr className="my-4" />

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

export default Part2QuestionForm;
