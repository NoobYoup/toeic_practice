import { useEffect, useState, useRef } from 'react';
import { register } from '@/services/authService';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function Register({ isOpen, onSwitch, onClose }) {
    const [form, setForm] = useState({ email: '', ten_dang_nhap: '', mat_khau: '', mat_khau_xac_nhan: '' });
    const [errors, setErrors] = useState({});
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setErrors({});
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (form.mat_khau !== form.mat_khau_xac_nhan) {
            setErrors((prev) => ({
                ...prev,
                mat_khau_xac_nhan: 'Mật khẩu xác nhận không khớp',
            }));
            return;
        }

        setLoadingAPI(true);
        try {
            setErrors({});
            await register(form);
            onSwitch('login');
            toast.success('Đăng ký thành công');
        } catch (err) {
            const apiErrors = err.response?.data?.errors;
            if (Array.isArray(apiErrors)) {
                const newErrors = {};
                apiErrors.forEach((err) => {
                    if (err.path) newErrors[err.path] = (newErrors[err.path] || '') + err.msg + '\n';
                });
                setErrors(newErrors);
            } else {
                toast.error('Đăng ký thất bại. Vui lòng thử lại.');
            }
        }
        setLoadingAPI(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal d-block"
                    key="register-modal"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="modal-dialog login-container"
                        role="document"
                        initial={{ y: '-30px', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-30px', opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="modal-content border-0" ref={modalRef}>
                            <button type="button" className="btn-close ms-auto" onClick={onClose}></button>
                            <h2 className="text-center">Đăng ký</h2>

                            <div className="modal-body">
                                {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="Nhập email của bạn"
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email &&
                                            errors.email.split('\n').map((e, i) => (
                                                <div className="text-danger small" key={i}>
                                                    * {e}
                                                </div>
                                            ))}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Tên đăng nhập</label>
                                        <input
                                            type="text"
                                            name="ten_dang_nhap"
                                            className={`form-control ${errors.ten_dang_nhap ? 'is-invalid' : ''}`}
                                            placeholder="Nhập tên đăng nhập của bạn"
                                            value={form.ten_dang_nhap}
                                            onChange={handleChange}
                                        />
                                        {errors.ten_dang_nhap &&
                                            errors.ten_dang_nhap.split('\n').map((e, i) => (
                                                <div className="text-danger small" key={i}>
                                                    * {e}
                                                </div>
                                            ))}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Mật khẩu</label>
                                        <div className="input-password">
                                            <input
                                                type={showPassword === true ? 'text' : 'password'}
                                                name="mat_khau"
                                                className={`form-control ${errors.mat_khau ? 'is-invalid' : ''}`}
                                                placeholder="Nhập mật khẩu của bạn"
                                                value={form.mat_khau}
                                                onChange={handleChange}
                                            />
                                            <i
                                                className={
                                                    showPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                                                }
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></i>
                                        </div>
                                        {errors.mat_khau &&
                                            errors.mat_khau.split('\n').map((e, i) => (
                                                <div className="text-danger small" key={i}>
                                                    * {e}
                                                </div>
                                            ))}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Xác nhận mật khẩu</label>
                                        <div className="input-password">
                                            <input
                                                type={showConfirmPassword === true ? 'text' : 'password'}
                                                name="mat_khau_xac_nhan"
                                                className={`form-control ${
                                                    errors.mat_khau_xac_nhan ? 'is-invalid' : ''
                                                }`}
                                                placeholder="Nhập lại mật khẩu"
                                                value={form.mat_khau_xac_nhan}
                                                onChange={handleChange}
                                            />
                                            <i
                                                className={
                                                    showConfirmPassword === true
                                                        ? 'fa-solid fa-eye'
                                                        : 'fa-solid fa-eye-slash'
                                                }
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            ></i>
                                        </div>
                                        {errors.mat_khau_xac_nhan &&
                                            errors.mat_khau_xac_nhan.split('\n').map((e, i) => (
                                                <div className="text-danger small" key={i}>
                                                    * {e}
                                                </div>
                                            ))}
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary" disabled={loadingAPI}>
                                            {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                            Đăng Ký
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="text-center mt-3">
                                Bạn đã có tài khoản?
                                <a href="#" className="text-primary" onClick={() => onSwitch('login')}>
                                    Đăng nhập
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Register;
