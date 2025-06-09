import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import { createQuestion } from '@/services/questionService';

import classNames from 'classnames/bind';
import styles from './CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function CreateQuestionBank() {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);
    const [formData, setFormData] = useState({
        id_phan: 1, // Mặc định là Part 1
        noi_dung: '',
        dap_an_dung: '',
        giai_thich: '',
        muc_do_kho: 'de',
        trang_thai: 'da_xuat_ban',
        nguon_goc: 'thu_cong',
        lua_chon: [
            { ky_tu_lua_chon: 'A', noi_dung: '' },
            { ky_tu_lua_chon: 'B', noi_dung: '' },
            { ky_tu_lua_chon: 'C', noi_dung: '' },
            { ky_tu_lua_chon: 'D', noi_dung: '' },
        ],
    });

    // Xử lý upload ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Xử lý upload audio
    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedAudio(file);
            const url = URL.createObjectURL(file);
            setAudioPreview(url);
        }
    };

    // Xóa ảnh
    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        const input = document.getElementById('questionImage');
        if (input) input.value = '';
    };

    // Xóa audio
    const removeAudio = () => {
        setSelectedAudio(null);
        if (audioPreview) {
            URL.revokeObjectURL(audioPreview);
        }
        setAudioPreview(null);
        const input = document.getElementById('questionAudio');
        if (input) input.value = '';
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate required fields
        if (!formData.noi_dung || !formData.dap_an_dung || formData.lua_chon.some((option) => !option.noi_dung)) {
            alert('Vui lòng điền đầy đủ nội dung câu hỏi, các lựa chọn và chọn đáp án đúng.');
            return;
        }

        // Create FormData object
        const data = new FormData();
        data.append('id_phan', formData.id_phan);
        data.append('noi_dung', formData.noi_dung);
        data.append('dap_an_dung', formData.dap_an_dung);
        data.append('giai_thich', formData.giai_thich);
        data.append('muc_do_kho', formData.muc_do_kho);
        data.append('trang_thai', formData.trang_thai);
        data.append('nguon_goc', formData.nguon_goc);
        data.append('lua_chon', JSON.stringify(formData.lua_chon)); // Stringify options array

        // Append files if they exist
        if (selectedImage) {
            data.append('image', selectedImage);
        }
        if (selectedAudio) {
            data.append('audio', selectedAudio);
        }

        try {
            const response = await createQuestion(data);
            console.log(response);
            alert('Câu hỏi đã được tạo thành công!');
            // Reset form after successful submission
            setFormData({
                id_phan: 1,
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                muc_do_kho: 'de',
                trang_thai: 'da_xuat_ban',
                nguon_goc: 'thu_cong',
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            });
            setSelectedImage(null);
            setSelectedAudio(null);
            setImagePreview(null);
            setAudioPreview(null);
        } catch (error) {
            console.error('Lỗi khi tạo câu hỏi:', error);
            alert('Có lỗi xảy ra khi tạo câu hỏi. Vui lòng thử lại.');
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Thêm câu hỏi mới</h1>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="question-form">
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="questionPart" className="form-label">
                                    Phần
                                </label>
                                <select
                                    className="form-select"
                                    id="addQuestionPart"
                                    value={formData.id_phan}
                                    onChange={(e) => setFormData({ ...formData, id_phan: parseInt(e.target.value) })}
                                    required
                                >
                                    <option value="" disabled>
                                        Chọn phần
                                    </option>
                                    <option value="1">Part 1</option>
                                    <option value="2">Part 2</option>
                                    <option value="3">Part 3</option>
                                    <option value="4">Part 4</option>
                                    <option value="5">Part 5</option>
                                    <option value="6">Part 6</option>
                                    <option value="7">Part 7</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="questionDifficulty" className="form-label">
                                        Độ khó
                                    </label>
                                    <select
                                        className="form-select"
                                        id="questionDifficulty"
                                        value={formData.muc_do_kho}
                                        onChange={(e) => setFormData({ ...formData, muc_do_kho: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>
                                            Chọn độ khó
                                        </option>
                                        <option value="de">Dễ</option>
                                        <option value="trung_binh">Trung bình</option>
                                        <option value="kho">Khó</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="questionStatus" className="form-label">
                                        Trạng thái
                                    </label>
                                    <select
                                        className="form-select"
                                        id="questionStatus"
                                        value={formData.trang_thai}
                                        onChange={(e) => setFormData({ ...formData, trang_thai: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>
                                            Chọn trạng thái
                                        </option>
                                        <option value="da_xuat_ban">Đã xuất bản</option>
                                        <option value="luu_tru">Lưu trữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionContent" className="form-label">
                                Nội dung câu hỏi
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event, editor) => {
                                    setFormData({ ...formData, noi_dung: editor.getData() });
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="mb-3" id="imageUploadSection">
                            <label htmlFor="questionImage" className="form-label">
                                Hình ảnh (nếu có)
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="questionImage"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        {imagePreview && (
                            <div className="mb-3 p-3 border rounded bg-light">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <div
                                                className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                                style={{ width: '32px', height: '32px' }}
                                            >
                                                <i className="fas fa-image text-primary"></i>
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-medium">{selectedImage.name}</p>
                                                <small className="text-muted">
                                                    {formatFileSize(selectedImage.size)}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="img-thumbnail"
                                                style={{
                                                    maxWidth: '200px',
                                                    maxHeight: '200px',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger ms-3"
                                        onClick={removeImage}
                                    >
                                        <i className="fas fa-trash-alt me-1"></i>Xóa
                                    </button>
                                </div>
                            </div>
                        )}

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
                                            <p className="mb-0 fw-medium">{selectedAudio.name}</p>
                                            <small className="text-muted">{formatFileSize(selectedAudio.size)}</small>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={removeAudio}
                                    >
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
                        <h5 className="mb-3">Các lựa chọn đáp án</h5>

                        <div className="mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id="optionA"
                                name="answerOption"
                                value="A"
                                onChange={(e) => setFormData({ ...formData, dap_an_dung: e.target.value })}
                            />
                            <label htmlFor="optionA" className="form-label">
                                Lựa chọn A
                            </label>

                            <CKEditor
                                editor={ClassicEditor}
                                data={formData.lua_chon[0].noi_dung}
                                onChange={(event, editor) => {
                                    const updatedOptions = [...formData.lua_chon];
                                    updatedOptions[0].noi_dung = editor.getData();
                                    setFormData({ ...formData, lua_chon: updatedOptions });
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id="optionB"
                                name="answerOption"
                                value="B"
                                onChange={(e) => setFormData({ ...formData, dap_an_dung: e.target.value })}
                            />
                            <label htmlFor="optionB" className="form-label">
                                Lựa chọn B
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formData.lua_chon[1].noi_dung}
                                onChange={(event, editor) => {
                                    const updatedOptions = [...formData.lua_chon];
                                    updatedOptions[1].noi_dung = editor.getData();
                                    setFormData({ ...formData, lua_chon: updatedOptions });
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id="optionC"
                                name="answerOption"
                                value="C"
                                onChange={(e) => setFormData({ ...formData, dap_an_dung: e.target.value })}
                            />
                            <label htmlFor="optionC" className="form-label">
                                Lựa chọn C
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formData.lua_chon[2].noi_dung}
                                onChange={(event, editor) => {
                                    const updatedOptions = [...formData.lua_chon];
                                    updatedOptions[2].noi_dung = editor.getData();
                                    setFormData({ ...formData, lua_chon: updatedOptions });
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id="optionD"
                                name="answerOption"
                                value="D"
                                onChange={(e) => setFormData({ ...formData, dap_an_dung: e.target.value })}
                            />
                            <label htmlFor="optionD" className="form-label">
                                Lựa chọn D
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formData.lua_chon[3].noi_dung}
                                onChange={(event, editor) => {
                                    const updatedOptions = [...formData.lua_chon];
                                    updatedOptions[3].noi_dung = editor.getData();
                                    setFormData({ ...formData, lua_chon: updatedOptions });
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionExplanation" className="form-label">
                                Giải thích (nếu có)
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formData.giai_thich}
                                onChange={(event, editor) => {
                                    setFormData({ ...formData, giai_thich: editor.getData() });
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="text-end">
                            <Link to="/admin/question-bank" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Thêm câu hỏi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateQuestionBank;
