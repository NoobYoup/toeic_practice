import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { createQuestion } from '@/services/questionService';
import Part1QuestionForm from './Part/Part1QuestionForm';
import Part2QuestionForm from './Part/Part2QuestionForm';
import Part3QuestionForm from './Part/Part3QuestionForm';
import Part4QuestionForm from './Part/Part4QuestionForm';
import Part5QuestionForm from './Part/Part5QuestionForm';
import Part6QuestionForm from './Part/Part6QuestionForm';
import Part7QuestionForm from './Part/Part7QuestionForm';

import classNames from 'classnames/bind';
import styles from './CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function CreateQuestionBank() {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);
    const [formData, setFormData] = useState({
        id_phan: 1,
        noi_dung: '',
        dap_an_dung: '',
        giai_thich: '',
        passage: '', // Thêm trường cho đoạn văn (Part 6, 7)
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

    const partOptions = [
        { value: 1, label: 'Part 1 - Mô tả hình ảnh' },
        { value: 2, label: 'Part 2 - Hỏi đáp ngắn' },
        { value: 3, label: 'Part 3' },
        { value: 4, label: 'Part 4' },
        { value: 5, label: 'Part 5' },
        { value: 6, label: 'Part 6 - Đoạn văn' },
        { value: 7, label: 'Part 7 - Đoạn văn' },
    ];

    // Xử lý upload ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    // Xử lý upload audio
    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedAudio(file);
            setFormData({ ...formData, audio: file });
            const url = URL.createObjectURL(file);
            setAudioPreview(url);
        }
    };

    // Xóa ảnh
    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setFormData({ ...formData, image: null });
        const input = document.getElementById('questionImage');
        if (input) input.value = '';
    };

    // Xóa audio
    const removeAudio = () => {
        setSelectedAudio(null);
        if (audioPreview) URL.revokeObjectURL(audioPreview);
        setAudioPreview(null);
        setFormData({ ...formData, audio: null });
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

    // Render form theo part
    const renderQuestionForm = () => {
        switch (formData.id_phan) {
            case 1:
                return (
                    <Part1QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        handleImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        removeImage={removeImage}
                        formatFileSize={formatFileSize}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                    />
                );
            case 2:
                return (
                    <Part2QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                        formatFileSize={formatFileSize}
                    />
                );
            case 3:
                return (
                    <Part3QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        handleImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        removeImage={removeImage}
                        formatFileSize={formatFileSize}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                    />
                );
            case 4:
                return (
                    <Part4QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                    />
                );
            case 5:
                return <Part5QuestionForm formData={formData} setFormData={setFormData} />;
            case 6:
            case 7:
                return <Part6QuestionForm formData={formData} setFormData={setFormData} />;
            // Thêm case cho Part 3, 4, 5 nếu cần
            default:
                return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // // Validate theo part
        // let isValid = true;
        // if (!formData.noi_dung || !formData.dap_an_dung || formData.lua_chon.some((option) => !option.noi_dung)) {
        //     isValid = false;
        // }
        // if (formData.id_phan === 1 && !formData.image) {
        //     isValid = false;
        //     alert('Vui lòng upload hình ảnh cho Part 1.');
        // }
        // if (formData.id_phan === 2 && !formData.audio) {
        //     isValid = false;
        //     alert('Vui lòng upload file âm thanh cho Part 2.');
        // }
        // if ((formData.id_phan === 6 || formData.id_phan === 7) && !formData.passage) {
        //     isValid = false;
        //     alert('Vui lòng nhập đoạn văn cho Part 6 hoặc 7.');
        // }

        // if (!isValid) {
        //     alert('Vui lòng điền đầy đủ các trường bắt buộc.');
        //     setLoading(false);
        //     return;
        // }

        // // Tạo FormData
        // const data = new FormData();
        // data.append('id_phan', formData.id_phan);
        // data.append('noi_dung', formData.noi_dung);
        // data.append('dap_an_dung', formData.dap_an_dung);
        // data.append('giai_thich', formData.giai_thich);
        // data.append('muc_do_kho', formData.muc_do_kho);
        // data.append('trang_thai', formData.trang_thai);
        // data.append('nguon_goc', formData.nguon_goc);
        // data.append('lua_chon', JSON.stringify(formData.lua_chon));
        // if (formData.image) data.append('image', formData.image);
        // if (formData.audio) data.append('audio', formData.audio);
        // if (formData.passage) data.append('passage', formData.passage);

        try {
            await createQuestion({ hinh_anh: selectedImage, am_thanh: selectedAudio, data: formData });
            toast.success('Câu hỏi đã được tạo thành công!');
            // Reset form
            // setFormData({
            //     id_phan: 1,
            //     noi_dung: '',
            //     dap_an_dung: '',
            //     giai_thich: '',
            //     passage: '',
            //     muc_do_kho: 'de',
            //     trang_thai: 'da_xuat_ban',
            //     nguon_goc: 'thu_cong',
            //     lua_chon: [
            //         { ky_tu_lua_chon: 'A', noi_dung: '' },
            //         { ky_tu_lua_chon: 'B', noi_dung: '' },
            //         { ky_tu_lua_chon: 'C', noi_dung: '' },
            //         { ky_tu_lua_chon: 'D', noi_dung: '' },
            //     ],
            //     image: null,
            //     audio: null,
            // });
            // setSelectedImage(null);
            // setSelectedAudio(null);
            // setImagePreview(null);
            // setAudioPreview(null);
        } catch (error) {
            console.error('Lỗi khi tạo câu hỏi:', error);
            toast.error(error.response.data.message);
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
                                <Select
                                    options={partOptions}
                                    value={partOptions.find((option) => option.value === formData.id_phan)}
                                    onChange={(selected) => setFormData({ ...formData, id_phan: selected.value })}
                                    placeholder="Chọn phần"
                                />
                            </div>
                            <div className="col-md-4">
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
                                    <option value="de">Dễ</option>
                                    <option value="trung_binh">Trung bình</option>
                                    <option value="kho">Khó</option>
                                </select>
                            </div>
                            <div className="col-md-4">
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
                                    <option value="da_xuat_ban">Đã xuất bản</option>
                                    <option value="luu_tru">Lưu trữ</option>
                                </select>
                            </div>
                        </div>

                        {renderQuestionForm()}

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
