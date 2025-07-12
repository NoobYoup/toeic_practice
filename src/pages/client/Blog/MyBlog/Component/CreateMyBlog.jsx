import { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBlog, getAllCategory } from '@/services/blogService';

import classNames from 'classnames/bind';
import styles from '@/pages/client/Account/EditAccount/EditAccount.module.scss';

const cx = classNames.bind(styles);

function CreateMyBlog() {
    const [tieu_de, setTieuDe] = useState('');
    const [noi_dung, setNoiDung] = useState('');
    const [id_danh_muc, setIdDanhMuc] = useState(null);
    const [hinh_anh, setHinhAnh] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategory();
            console.log(res);
            const options = (res.data.data || []).map((item) => ({
                value: item.id_danh_muc,
                label: item.ten_danh_muc,
            }));
            setCategoryOptions(options);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHinhAnh(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                tieu_de,
                noi_dung,
                id_danh_muc,
                hinh_anh,
            };
            const res = await createBlog(payload);
            console.log(res);
            toast.success('Tạo bài viết thành công');
            // reset form
            setTieuDe('');
            setNoiDung('');
            setIdDanhMuc(null);
            setHinhAnh(null);
            setPreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <div className="container py-4 min-vh-100">
            <>
                <h3 className="mb-4">Thêm bài viết</h3>

                <div className={`${cx('edit-section')} shadow`}>
                    <h4 className="section-title mb-4">Ảnh bài viết</h4>
                    <div className="row align-items-center">
                        <div className="col-md-8 text-center">
                            <div>
                                <img
                                    src={previewUrl}
                                    alt="Blog Picture"
                                    className="img-fluid"
                                    id="avatarPreview"
                                    style={{ borderRadius: '10px' }}
                                />
                                <input
                                    type="file"
                                    id="avatarInput"
                                    accept="image/jpeg,image/png,image/gif"
                                    className="d-none"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <p className="text-muted mb-3">
                                Chọn ảnh có kích thước tối thiểu 200x200px. Định dạng: JPG, PNG, GIF.
                            </p>
                            <label htmlFor="avatarInput" className="btn btn-outline-primary me-2">
                                <i className="fas fa-upload me-2"></i>Tải ảnh lên
                            </label>
                        </div>
                    </div>
                </div>

                <div className={`${cx('edit-section')} shadow`}>
                    <h4 className="section-title mb-4">Thông tin cơ bản</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group mb-4">
                                <label htmlFor="tieu_de" className="form-label">
                                    Tiêu đề *
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="tieu_de"
                                    value={tieu_de}
                                    onChange={(e) => setTieuDe(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 form-group mb-4">
                                <label htmlFor="id_danh_muc" className="form-label">
                                    Danh mục *
                                </label>
                                <Select
                                    options={categoryOptions}
                                    value={categoryOptions.find((opt) => opt.value === id_danh_muc) || null}
                                    onChange={(opt) => setIdDanhMuc(opt?.value || null)}
                                    placeholder="Chọn danh mục..."
                                />
                            </div>

                            <div className=" form-group mb-4">
                                <div className="form-floating">
                                    <div className="mb-3">
                                        <label className="form-label">Nội dung *</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={noi_dung}
                                            onChange={(_, editor) => setNoiDung(editor.getData())}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="edit-section">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <button type="submit" className="btn btn-primary me-3" disabled={loading}>
                                        {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                        Lưu thay đổi
                                    </button>
                                    <Link to="/my-blog" className="btn btn-outline-secondary">
                                        Hủy bỏ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* <form onSubmit={handleSubmit}>
                  
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Tiêu đề *</label>
                        <input
                            type="text"
                            className="form-control"
                            value={tieu_de}
                            onChange={(e) => setTieuDe(e.target.value)}
                        />
                    </div>

                 
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Danh mục *</label>
                        <Select
                            options={categoryOptions}
                            value={categoryOptions.find((opt) => opt.value === id_danh_muc) || null}
                            onChange={(opt) => setIdDanhMuc(opt?.value || null)}
                            placeholder="Chọn danh mục..."
                        />
                    </div>

                  
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Hình ảnh *</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        {previewUrl && (
                            <img src={previewUrl} alt="preview" className="mt-2 border" style={{ maxWidth: '200px' }} />
                        )}
                    </div>

                  
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Nội dung *</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={noi_dung}
                            onChange={(_, editor) => setNoiDung(editor.getData())}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading && <i className="fas fa-spinner fa-spin me-2"></i>}Tạo bài viết
                        </button>
                    </div>
                </form> */}
            </>
        </div>
    );
}

export default CreateMyBlog;
