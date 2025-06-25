import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPassage } from '@/services/passageService';

function CreateParagraph() {
    const [passageData, setPassageData] = useState({
        tieu_de: '',
        noi_dung: '',
        id_phan: '6',
        loai_doan_van: 'single',
        hinh_anh: [],
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Chuẩn bị dữ liệu gửi đi dưới dạng multipart/form-data để có thể upload nhiều ảnh
            const formData = new FormData();
            formData.append('tieu_de', passageData.tieu_de);
            formData.append('noi_dung', passageData.noi_dung);
            formData.append('id_phan', passageData.id_phan);
            formData.append('loai_doan_van', passageData.loai_doan_van);

            // Thêm từng file ảnh vào formData (sử dụng mảng hinh_anh)
            (Array.isArray(passageData.hinh_anh) ? passageData.hinh_anh : []).forEach((file) => {
                formData.append('hinh_anh', file); // backend có thể đọc mảng cùng tên
            });

            await createPassage(formData);
            navigate('/admin/test/paragraph');
            toast.success('Tạo đoạn văn thành công!');
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };
    return (
        <>
            <h1>Thêm đoạn văn mới</h1>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="question-form">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="draftExam" className="form-label">
                                        Phần
                                    </label>
                                    <select
                                        className="form-select"
                                        id="draftExam"
                                        required
                                        value={passageData.id_phan}
                                        onChange={(e) =>
                                            setPassageData((prev) => ({ ...prev, id_phan: e.target.value }))
                                        }
                                    >
                                        <option value="6">Phần 6</option>
                                        <option value="7">Phần 7</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="draftExam" className="form-label">
                                        Loại đoạn văn
                                    </label>
                                    <select
                                        className="form-select"
                                        id="draftExam"
                                        required
                                        value={passageData.loai_doan_van}
                                        onChange={(e) =>
                                            setPassageData((prev) => ({ ...prev, loai_doan_van: e.target.value }))
                                        }
                                    >
                                        <option value="single">Single</option>
                                        <option value="double">Double</option>
                                        <option value="triple">Triple</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="titlePassage" className="form-label">
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titlePassage"
                                        placeholder="Nhập tiêu đề đoạn văn"
                                        value={passageData.tieu_de}
                                        onChange={(e) =>
                                            setPassageData((prev) => ({ ...prev, tieu_de: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionContent" className="form-label">
                                Nội dung
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={passageData.noi_dung}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setPassageData((prev) => ({ ...prev, noi_dung: data }));
                                }}
                                config={{
                                    placeholder: 'Nội dung đoạn văn',
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionImage" className="form-label">
                                Hình ảnh (Có thể chọn tối đa 3 ảnh hoặc không chọn)
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="questionImage"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                    const selectedFiles = Array.from(e.target.files);
                                    setPassageData((prev) => {
                                        const totalFiles = prev.hinh_anh.length + selectedFiles.length;
                                        if (totalFiles > 3) {
                                            toast.warning('Chỉ được chọn tối đa 3 hình ảnh');
                                            // Chỉ thêm số ảnh đủ để đạt 3
                                            const availableSlots = 3 - prev.hinh_anh.length;
                                            return {
                                                ...prev,
                                                hinh_anh: [...prev.hinh_anh, ...selectedFiles.slice(0, availableSlots)],
                                            };
                                        }
                                        return {
                                            ...prev,
                                            hinh_anh: [...prev.hinh_anh, ...selectedFiles],
                                        };
                                    });
                                }}
                            />
                            {passageData.hinh_anh.length > 0 && (
                                <div className="mt-3">
                                    {passageData.hinh_anh.map((file, index) => (
                                        <div key={index} className="mb-3 p-3 border rounded bg-light">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="flex-grow-1">
                                                    <p className="mb-0 fw-medium">{file.name}</p>
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt="Preview"
                                                        className="img-thumbnail mt-2"
                                                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger ms-3"
                                                    onClick={() =>
                                                        setPassageData((prev) => ({
                                                            ...prev,
                                                            hinh_anh: prev.hinh_anh.filter((_, i) => i !== index),
                                                        }))
                                                    }
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="text-end">
                            <Link to="/admin/test/paragraph" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Thêm đoạn văn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateParagraph;
