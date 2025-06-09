// Part1QuestionForm.jsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import classNames from 'classnames/bind';
import styles from '../CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function Part1QuestionForm({
    formData,
    setFormData,
    handleImageChange,
    imagePreview,
    removeImage,
    formatFileSize,
    handleAudioChange,
    audioPreview,
    removeAudio,
}) {
    return (
        <>
            <div className={cx('requirement-info')}>
                <h6>
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 1:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Bắt buộc có hình ảnh</li>
                    <li>Bắt buộc có 1 file âm thanh (bao gồm cả 4 đáp án A, B, C, D)</li>
                </ul>
            </div>

            <div className="mb-3">
                <label htmlFor="questionImage" className="form-label">
                    Hình ảnh (bắt buộc cho Part 1)
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
                    File âm thanh (cho câu hỏi Listening)
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

            <hr className="my-4" />

            <div className="mb-3">
                <label htmlFor="questionContent" className="form-label">
                    Nội dung câu hỏi (mô tả hình ảnh)
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.noi_dung}
                    onChange={(event, editor) => setFormData({ ...formData, noi_dung: editor.getData() })}
                    config={{ placeholder: 'Nhập mô tả hình ảnh...' }}
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
                    {/* <CKEditor
                                    editor={ClassicEditor}
                                    data={formData.lua_chon[index].noi_dung}
                                    onChange={(event, editor) => {
                                        const updatedOptions = [...formData.lua_chon];
                                        updatedOptions[index].noi_dung = editor.getData();
                                        setFormData({ ...formData, lua_chon: updatedOptions });
                                    }}
                                    config={{ placeholder: 'Nhập nội dung tại đây...' }}
                                /> */}
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

export default Part1QuestionForm;
