import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import classNames from 'classnames/bind';
import styles from '../CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function Part3QuestionForm({
    formData,
    setFormData,
    questions,
    onChangeQuestion,
    imagePreview,
    handleImageChange,
    removeImage,
    formatFileSize,
    audioPreview,
    handleAudioChange,
    removeAudio,
}) {
    if (!Array.isArray(questions)) return null;

    return (
        <>
            <div className={cx('requirement-info')}>
                <h6>
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 3:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Tùy chọn có hình ảnh (tùy đề)</li>
                    <li>Bắt buộc có file âm thanh (đoạn hội thoại)</li>
                </ul>
            </div>

            <div className="mb-3">
                <label htmlFor="questionImage" className="form-label">
                    Hình ảnh (Tùy chọn)
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="questionImage"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imagePreview && (
                    <div className="mb-3 p-3 border rounded bg-light">
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                                <p className="mb-0 fw-medium">{formData.image?.name}</p>
                                <small className="text-muted">{formatFileSize(formData.image?.size)}</small>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="img-thumbnail mt-2"
                                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                                />
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-danger ms-3" onClick={removeImage}>
                                Xóa
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-3" id="audioSection">
                <label htmlFor="questionAudio" className="form-label">
                    Âm thanh (Bắt buộc cho part 1)
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="questionAudio"
                    accept="audio/*"
                    onChange={handleAudioChange}
                />
            </div>

            {audioPreview && (
                <div className="mb-3 p-3 border rounded bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div
                                className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: '32px', height: '32px' }}
                            >
                                <i className="fas fa-music text-success"></i>
                            </div>
                            <div>
                                <p className="mb-0 fw-medium">{formData.audio?.name}</p>
                                <small className="text-muted">{formatFileSize(formData.audio?.size)}</small>
                            </div>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={removeAudio}>
                            <i className="fas fa-trash-alt me-1"></i>Xóa
                        </button>
                    </div>
                    <div className="mt-3">
                        <audio controls className="w-100" style={{ maxWidth: '400px' }}>
                            <source src={audioPreview} />
                            Trình duyệt của bạn không hỗ trợ phát audio.
                        </audio>
                    </div>
                </div>
            )}

            {/* Render 3 câu hỏi */}
            {questions.map((q, idx) => (
                <div key={idx} className="border rounded p-3 mb-4">
                    <h6>Câu {idx + 1}</h6>

                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.noi_dung}
                            onChange={(event, editor) => onChangeQuestion(idx, 'noi_dung', editor.getData())}
                        />
                    </div>

                    {/* Lựa chọn và chọn đáp án */}
                    {['A', 'B', 'C', 'D'].map((option, index) => (
                        <div className="mb-3" key={option}>
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id={`q${idx}-option${option}`}
                                name={`answerOption${idx}`}
                                value={option}
                                checked={q.dap_an_dung === option}
                                onChange={(e) => onChangeQuestion(idx, 'dap_an_dung', e.target.value)}
                            />
                            <label htmlFor={`q${idx}-option${option}`} className="form-label">
                                Lựa chọn {option}
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id={`q${idx}-option${option}-input`}
                                value={q.lua_chon[index].noi_dung}
                                onChange={(e) => {
                                    const updatedOptions = [...q.lua_chon];
                                    updatedOptions[index].noi_dung = e.target.value;
                                    onChangeQuestion(idx, 'lua_chon', updatedOptions);
                                }}
                            />
                        </div>
                    ))}

                    {/* Giải thích */}
                    <div className="mb-3">
                        <label className="form-label">Giải thích</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.giai_thich}
                            onChange={(event, editor) => onChangeQuestion(idx, 'giai_thich', editor.getData())}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}

export default Part3QuestionForm;
