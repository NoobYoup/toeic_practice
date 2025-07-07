import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { getDetailUser, editUser, updateUserRole } from '@/services/userService.jsx';
import { getAllRole } from '@/services/roleService.jsx';
import { toast } from 'react-toastify';
import Select from 'react-select';
import classNames from 'classnames/bind';
import styles from './EditUser.module.scss';

const cx = classNames.bind(styles);

function EditUser() {
    const { id } = useParams(); // lấy ID từ URL
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Ref for file input
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        ten_dang_nhap: '',
        email: '',
        trang_thai: 'hoat_dong',
        ho_ten: '',
        dia_chi: '',
        vai_tro: '',
        ngay_sinh: '',
        so_dien_thoai: '',
        gioi_thieu: '',
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [roles, setRoles] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);

    const fetchRoles = useCallback(async () => {
        try {
            const res = await getAllRole();
            const rolesData = res.data?.data || [];
            setRoles(rolesData);
            console.log(rolesData);

            const options = rolesData.map((role) => ({
                value: String(role.id_vai_tro),
                label: role.ten_vai_tro,
            }));
            setRoleOptions(options);
        } catch (error) {
            console.error('Lỗi khi tải danh sách vai trò:', error);
            toast.error('Không thể tải danh sách vai trò');
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    // Đồng bộ selectedRole khi danh sách roleOptions hoặc formData.vai_tro thay đổi
    useEffect(() => {
        if (roleOptions.length) {
            const found = roleOptions.find((opt) => opt.value === formData.vai_tro);
            setSelectedRole(found || null);
        }
    }, [roleOptions, formData.vai_tro]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await getDetailUser(id);
                console.log(res);
                const userData = res.data.data.user;

                // Flatten role id for easier access in UI state
                setUser({ ...userData, vai_tro: userData.nguoi_dung?.id_vai_tro });

                setFormData({
                    ten_dang_nhap: userData.nguoi_dung.ten_dang_nhap || '',
                    email: userData.nguoi_dung.email || '',
                    trang_thai: userData.trang_thai || 'hoat_dong',
                    ho_ten: userData.ho_ten || '',
                    dia_chi: userData.dia_chi || '',
                    vai_tro: String(userData.nguoi_dung?.id_vai_tro || ''),
                    ngay_sinh: userData.ngay_sinh || '',
                    so_dien_thoai: userData.so_dien_thoai || '',
                    gioi_thieu: userData.gioi_thieu || '',
                });

                setPreviewUrl(userData.url_hinh_dai_dien || '');
            } catch (err) {
                console.error('Error updating user:', err);
                if (err.response?.status === 401) {
                    setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                } else {
                    setError('Không thể cập nhật thông tin người dùng');
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            // Không gửi vai_tro cùng với editUser
            const { vai_tro, ...otherFields } = formData;
            const res = await editUser(id, otherFields, selectedFile);
            console.log('API Response:', res.data);
            toast.success(res.data.message);

            // setSuccess('Cập nhật thông tin người dùng thành công!');
            //Update user state with new image URL if returned
            if (res.data.data?.url_hinh_dai_dien) {
                setUser((prev) => ({
                    ...prev,
                    url_hinh_dai_dien: res.data.data.url_hinh_dai_dien,
                }));
                setPreviewUrl(res.data.data.url_hinh_dai_dien);
            }
            setSelectedFile(null); // Clear file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear file input
            }

            navigate(`/admin/user/detail-user/${id}`);
        } catch (err) {
            console.error('Error updating user:', err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    // Cập nhật vai trò riêng lẻ
    const handleUpdateRole = async () => {
        if (!selectedRole) {
            toast.error('Vui lòng chọn vai trò');
            return;
        }
        try {
            const res = await updateUserRole(id, selectedRole.value);
            toast.success(res.data?.message || 'Cập nhật vai trò thành công');
            navigate(`/admin/user/detail-user/${id}`);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Cập nhật vai trò thất bại');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setError('Chỉ hỗ trợ định dạng JPG, PNG, GIF');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                setError('Kích thước ảnh không được vượt quá 5MB');
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreviewUrl(user?.url_hinh_dai_dien || '');
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
                <p>Đang tải...</p>
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="text-center text-danger">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <div className={`${cx('profile-header')} shadow-sm`}>
                        <div className="row align-items-center">
                            <div className="col-md-3 text-center">
                                <img src={previewUrl || undefined} alt="Avatar" className={cx('profile-avatar')} />
                            </div>
                            <div className="col-md-9">
                                <h6>Thay đổi ảnh đại diện</h6>
                                <p className="text-muted mb-3">
                                    Chọn ảnh có kích thước tối thiểu 200x200px. Định dạng: JPG, PNG, GIF.
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="avatar-upload"
                                    className="d-none"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="avatar-upload" className="btn btn-outline-primary me-2">
                                    <i className="fas fa-upload me-2"></i>Tải ảnh lên
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    {success && (
                        <div className="alert alert-success" role="alert">
                            <i className="fas fa-check-circle me-2"></i>
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <i className="fas fa-exclamation-circle me-2"></i>
                            {error}
                        </div>
                    )}

                    <div className={cx('form-card')}>
                        <div className={cx('section-title')}>
                            <i className="fas fa-user"></i>
                            Cập nhật thông tin
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="userId" className={cx('form-label')}>
                                        <i className="fas fa-hashtag"></i>
                                        ID Người dùng
                                    </label>
                                    <input
                                        type="text"
                                        className={`${cx('form-control')} form-control`}
                                        id="userId"
                                        value={user?.id_nguoi_dung || ''}
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email" className={cx('form-label')}>
                                        <i className="fas fa-envelope"></i>
                                        Email <span className="required">*</span>
                                    </label>
                                    <div className={`${cx('input-group')} input-group`}>
                                        <input
                                            type="email"
                                            className={`${cx('form-control')} form-control`}
                                            id="email"
                                            value={user?.nguoi_dung?.email || ''}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="vai_tro" className={cx('form-label')}>
                                        <i className="fas fa-user-tag"></i>
                                        Vai trò <span className="required">*</span>
                                    </label>

                                    <Select
                                        id="vai_tro"
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isDisabled={loading || saving}
                                        isLoading={loading}
                                        isClearable={false}
                                        isSearchable={true}
                                        name="vai_tro"
                                        options={roleOptions}
                                        value={selectedRole}
                                        onChange={(selectedOption) => {
                                            if (!selectedOption) {
                                                setSelectedRole(null);
                                                setFormData((prev) => ({ ...prev, vai_tro: '' }));
                                                setUser((prev) => ({ ...prev, vai_tro: '' }));
                                                return;
                                            }
                                            const newValue = selectedOption.value;
                                            setSelectedRole(selectedOption);
                                            setFormData((prev) => ({ ...prev, vai_tro: newValue }));
                                            setUser((prev) => ({ ...prev, vai_tro: newValue }));
                                        }}
                                    />

                                    <div className="mt-2 d-flex align-items-center justify-content-between">
                                        <label htmlFor="vai_tro" className="form-label text-muted">
                                            *Lưu ý: Quản trị viên cấp quyền truy cập vào trang quản trị
                                        </label>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={handleUpdateRole}
                                            disabled={loading || saving}
                                        >
                                            {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                            Cập nhật vai trò
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="ten_dang_nhap" className={cx('form-label')}>
                                        <i className="fa-solid fa-input-text"></i>
                                        Tên đăng nhập <span className="required">*</span>
                                    </label>
                                    <div className={`${cx('input-group')} input-group`}>
                                        <span className={`${cx('input-group-text')} input-group-text`}>
                                            <i className="fa-solid fa-input-text"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className={`${cx('form-control')} form-control`}
                                            id="ten_dang_nhap"
                                            value={formData?.ten_dang_nhap}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="ho_ten" className={cx('form-label')}>
                                        <i className="fa-solid fa-input-text"></i>
                                        Họ và tên <span className="required">*</span>
                                    </label>
                                    <div className={`${cx('input-group')} input-group`}>
                                        <span className={`${cx('input-group-text')} input-group-text`}>
                                            <i className="fa-solid fa-input-text"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className={`${cx('form-control')} form-control`}
                                            id="ho_ten"
                                            value={formData?.ho_ten}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="dia_chi" className={cx('form-label')}>
                                        <i className="fa-solid fa-location-dot"></i>
                                        Địa chỉ <span className="required">*</span>
                                    </label>
                                    <div className={`${cx('input-group')} input-group`}>
                                        <span className={`${cx('input-group-text')} input-group-text`}>
                                            <i className="fa-solid fa-location-dot"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className={`${cx('form-control')} form-control`}
                                            id="dia_chi"
                                            value={formData?.dia_chi}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="ngay_sinh" className={cx('form-label')}>
                                        <i className="fa-solid fa-calendar"></i>
                                        Ngày sinh <span className="required">*</span>
                                    </label>
                                    <div className={`${cx('input-group')} input-group`}>
                                        <span className={`${cx('input-group-text')} input-group-text`}>
                                            <i className="fa-solid fa-calendar"></i>
                                        </span>
                                        <input
                                            type="date"
                                            className={`${cx('form-control')} form-control`}
                                            id="ngay_sinh"
                                            value={formData?.ngay_sinh}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="so_dien_thoai" className={cx('form-label')}>
                                        <i className="fa-solid fa-phone"></i>
                                        Số điện thoại <span className="required">*</span>
                                    </label>
                                    <div className={`${cx('input-group')} input-group`}>
                                        <span className={`${cx('input-group-text')} input-group-text`}>
                                            <i className="fa-solid fa-phone"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className={`${cx('form-control')} form-control`}
                                            id="so_dien_thoai"
                                            value={formData?.so_dien_thoai}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="gioi_thieu" className={cx('form-label')}>
                                        <i className="fa-solid fa-subtitles"></i>
                                        Giới thiệu <span className="required">*</span>
                                    </label>
                                    <div className={`${cx('input-group')} input-group`}>
                                        <span className={`${cx('input-group-text')} input-group-text`}>
                                            <i className="fa-solid fa-subtitles"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className={`${cx('form-control')} form-control`}
                                            id="gioi_thieu"
                                            value={formData?.gioi_thieu}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="trang_thai" className={cx('form-label')}>
                                        <i className="fas fa-toggle-on"></i>
                                        Trạng thái <span className="required">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        id="trang_thai"
                                        value={formData?.trang_thai}
                                        onChange={handleInputChange}
                                    >
                                        {user?.nguoi_dung?.trang_thai === 'hoat_dong' ? (
                                            <>
                                                <option value="hoat_dong">Hoạt động</option>
                                                <option value="khong_hoat_dong">Không hoạt động</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="khong_hoat_dong">Không hoạt động</option>
                                                <option value="hoat_dong">Hoạt động</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <button type="submit" className="btn btn-primary btn-action me-3">
                                        <i className="fas fa-save me-2"></i>Lưu thay đổi
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-action"
                                        onClick={() => navigate('/admin/user')}
                                    >
                                        <i className="fas fa-times me-2"></i>Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditUser;
