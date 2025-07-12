import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { getDetailBlog, updateBlog, getAllCategory } from '@/services/blogService';

import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import classNames from 'classnames/bind';
import styles from '@/pages/client/Account/EditAccount/EditAccount.module.scss';

const cx = classNames.bind(styles);

function EditBlog() {
    const { id } = useParams();
    // State for form fields
    const [tieu_de, setTieuDe] = useState('');
    const [noi_dung, setNoiDung] = useState('');
    const [id_danh_muc, setIdDanhMuc] = useState(null);
    const [hinh_anh, setHinhAnh] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    // Fetch blog detail
    const fetchBlog = async () => {
        setLoading(true);
        try {
            const res = await getDetailBlog(id);
            const data = res.data.data;
            setTieuDe(data.tieu_de || '');
            setNoiDung(data.noi_dung || '');
            setIdDanhMuc(data.id_danh_muc || null);
            setPreviewUrl(data.hinh_anh.url_phuong_tien || null);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Lấy chi tiết bài viết thất bại');
        }
        setLoading(false);
    };

    // Fetch categories and convert to react-select options
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategory();
            const options = (res.data.data || []).map((item) => ({
                value: item.id_danh_muc,
                label: item.ten_danh_muc,
            }));
            setCategoryOptions(options);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Lấy danh mục thất bại');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlog();
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Handle new image selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHinhAnh(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tieu_de || !noi_dung || !id_danh_muc) {
            toast.warn('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        setLoading(true);
        try {
            const payload = { tieu_de, noi_dung, id_danh_muc, hinh_anh };
            const res = await updateBlog(id, payload);
            toast.success(res.data.message || 'Cập nhật thành công');
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Cập nhật thất bại');
        }
        setLoading(false);
    };

    return (
        <div className="container py-4 min-vh-100">
            <>
                <h3 className="mb-4">Chỉnh sửa bài viết</h3>

                {/* Image section */}
                <div className={`${cx('edit-section')} shadow`}>
                    <h4 className="section-title mb-4">Ảnh bài viết</h4>
                    <div className="row align-items-center">
                        <div className="col-md-8 text-center">
                            <div>
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Blog"
                                        className="img-fluid"
                                        style={{ borderRadius: '10px' }}
                                    />
                                ) : (
                                    <div className="text-muted">Chưa có ảnh</div>
                                )}
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
                                <i className="fas fa-upload me-2"></i>Chọn ảnh mới
                            </label>
                        </div>
                    </div>
                </div>

                {/* Basic info section */}
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
                                    isLoading={loading && categoryOptions.length === 0}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label">Nội dung *</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={noi_dung}
                                    onChange={(_, editor) => setNoiDung(editor.getData())}
                                />
                            </div>
                        </div>
                        <div className="edit-section">
                            <div className="d-flex justify-content-end align-items-center">
                                <button type="submit" className="btn btn-primary me-3" disabled={loading}>
                                    {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                    Lưu thay đổi
                                </button>
                                <Link to="/admin/blog" className="btn btn-outline-secondary">
                                    Hủy bỏ
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        </div>
    );
}

export default EditBlog;
