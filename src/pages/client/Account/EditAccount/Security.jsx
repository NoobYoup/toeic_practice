import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';
import { useState } from 'react';
import { changePassword } from '@/services/authService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Security() {
    const [formData, setFormData] = useState({
        mat_khau_hien_tai: '',
        mat_khau_moi: '',
        xac_nhan_mat_khau: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await changePassword(formData);
            toast.success(res.data.message);

            setFormData({
                mat_khau_hien_tai: '',
                mat_khau_moi: '',
                xac_nhan_mat_khau: '',
            });
        } catch (error) {
            console.error('Error changing password:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Có lỗi xảy ra khi thay đổi mật khẩu!');
            }
        }
        setLoading(false);
    };

    const handleCancel = () => {
        setFormData({
            mat_khau_hien_tai: '',
            mat_khau_moi: '',
            xac_nhan_mat_khau: '',
        });
    };

    return (
        <>
            <div className="min-vh-100">
                <div className={`${cx('edit-section')} shadow`}>
                    <h4 className="section-title mb-4">Thay đổi mật khẩu</h4>
                    <form id="securityForm" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group mb-4">
                                <div className="form-floating position-relative input-password">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mat_khau_hien_tai"
                                        placeholder="Mật khẩu hiện tại"
                                        value={formData.mat_khau_hien_tai}
                                        onChange={handleInputChange}
                                    />

                                    <label htmlFor="mat_khau_hien_tai">Mật khẩu hiện tại *</label>
                                </div>
                            </div>
                            <div className="col-md-6"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group mb-4">
                                <div className="form-floating position-relative input-password">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mat_khau_moi"
                                        placeholder="Mật khẩu mới"
                                        value={formData.mat_khau_moi}
                                        onChange={handleInputChange}
                                    />

                                    <label htmlFor="mat_khau_moi">Mật khẩu mới</label>
                                </div>
                                <div className="form-text">
                                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                                </div>
                            </div>
                            <div className="col-md-6 form-group mb-4">
                                <div className="form-floating position-relative input-password">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="xac_nhan_mat_khau"
                                        placeholder="Xác nhận mật khẩu mới"
                                        value={formData.xac_nhan_mat_khau}
                                        onChange={handleInputChange}
                                    />

                                    <label htmlFor="xac_nhan_mat_khau">Xác nhận mật khẩu mới</label>
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
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleCancel}
                                        disabled={loading}
                                    >
                                        <i className="fas fa-times me-2"></i>Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Security;
