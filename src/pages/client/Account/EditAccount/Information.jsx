import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getProfile, updateProfile } from '@/services/userService.jsx';
import { toast } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';

const cx = classNames.bind(styles);

function Information() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        ten_dang_nhap: '',
        ho_ten: '',
        dia_chi: '',
        ngay_sinh: '',
        so_dien_thoai: '',
        gioi_thieu: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('user_token');

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await getProfile(token);
                const userData = res.data.data;
                setProfile(userData);
                setFormData({
                    ten_dang_nhap: userData.ten_dang_nhap || '',
                    ho_ten: userData.ho_so?.ho_ten || '',
                    dia_chi: userData.ho_so?.dia_chi || '',
                    ngay_sinh: userData.ho_so?.ngay_sinh || '',
                    so_dien_thoai: userData.ho_so?.so_dien_thoai || '',
                    gioi_thieu: userData.ho_so?.gioi_thieu || '',
                });
                setPreviewUrl(userData.ho_so?.url_hinh_dai_dien || '');
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Không thể tải thông tin hồ sơ');
            }
            setLoading(false);
        };

        if (token) {
            fetchProfile();
        } else {
            setError('Vui lòng đăng nhập để chỉnh sửa hồ sơ');
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        return () => {
            if (previewUrl && selectedFile) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl, selectedFile]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ prevData, ...prevData, [id]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setError('Chỉ hỗ trợ định dạng JPG, PNG, GIF');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Kích thước ảnh không được vượt quá 5MB');
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreviewUrl(profile?.ho_so?.url_hinh_dai_dien || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        setLoading(true);

        try {
            const res = await updateProfile(formData, selectedFile, token);
            setProfile((prev) => ({
                ...prev,
                ten_dang_nhap: formData.ten_dang_nhap,
                ho_so: {
                    ...prev.ho_so,
                    ho_ten: formData.ho_ten,
                    dia_chi: formData.dia_chi,
                    ngay_sinh: formData.ngay_sinh,
                    so_dien_thoai: formData.so_dien_thoai,
                    gioi_thieu: formData.gioi_thieu,
                    hinh_dai_dien: res.data.data.ho_so?.url_hinh_dai_dien,
                },
            }));
            setPreviewUrl(res.data.data.ho_so?.url_hinh_dai_dien);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            toast.success(res.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.error('Error updating profile:', err);
            toast.error(err.response.data.message);
        }
        setLoading(false);
    };

    if (error && !profile) {
        return (
            <div className="text-center text-danger">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className={`${cx('edit-section')} shadow`}>
                <h4 className="section-title mb-4">Ảnh đại diện</h4>
                <div className="row align-items-center">
                    <div className="col-md-3 text-center">
                        <div className={cx('avatar-upload')}>
                            <img
                                src={previewUrl || '/images/logo_black.png'}
                                alt="Profile Picture"
                                className={cx('avatar-preview')}
                                id="avatarPreview"
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
                    <div className="col-md-9">
                        <h6>Thay đổi ảnh đại diện</h6>
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
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    value={profile?.ho_so?.id_nguoi_dung || ''}
                                    readOnly
                                    disabled
                                    required
                                />
                                <label htmlFor="id">ID *</label>
                            </div>
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={profile?.email || ''}
                                    readOnly
                                    disabled
                                    required
                                />
                                <label htmlFor="email">Email *</label>
                            </div>
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ten_dang_nhap"
                                    value={formData.ten_dang_nhap}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="ten_dang_nhap">Tên đăng nhập *</label>
                            </div>
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ho_ten"
                                    value={formData.ho_ten}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="ho_ten">Họ và tên *</label>
                            </div>
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="so_dien_thoai"
                                    value={formData.so_dien_thoai}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="so_dien_thoai">Số điện thoại</label>
                            </div>
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <div className="form-floating">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="ngay_sinh"
                                    value={formData.ngay_sinh}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="ngay_sinh">Ngày sinh</label>
                            </div>
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dia_chi"
                                    value={formData.dia_chi}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="dia_chi">Địa chỉ</label>
                            </div>
                        </div>
                        <div className="col-md-12 form-group mb-4">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="gioi_thieu"
                                    value={formData.gioi_thieu}
                                    onChange={handleInputChange}
                                    style={{ height: '100px' }}
                                ></textarea>
                                <label htmlFor="gioi_thieu">Giới thiệu</label>
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
                                <Link to="/my-account" className="btn btn-outline-secondary">
                                    Hủy bỏ
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Information;
