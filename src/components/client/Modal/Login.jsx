import { useEffect, useState, useRef } from 'react';
import { login, loginGoogle } from '@/services/authService.jsx';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const API_GOOGLE = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Login({ setIsLogin, onSwitch, onClose, isOpen }) {
    const [form, setForm] = useState({ identifier: '', mat_khau: '' });
    const [errors, setErrors] = useState({});
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoadingAPI(true);
        try {
            setErrors({});
            const res = await login(form);

            // Nếu tài khoản là admin thì không cho đăng nhập ở client
            if (res.data.is_admin === true) {
                toast.error('Bạn không có quyền truy cập tại đây');
                setLoadingAPI(false);
                return;
            }

            localStorage.setItem('user_token', res.data.token);

            setIsLogin(true);
            // onClose();
            window.location.reload();
            // toast.success(res.data.message);
        } catch (err) {
            const apiErrors = err.response?.data?.errors;
            const generalMsg = err.response?.data?.message;

            if (Array.isArray(apiErrors)) {
                const newErrors = {};
                apiErrors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path] = err.msg;
                    }
                });
                setErrors(newErrors);
            } else if (generalMsg) {
                // setErrors({ general: generalMsg });
                toast.error(generalMsg);
            } else {
                // setErrors({ general: 'Đăng nhập thất bại.' });
                toast.error(err.response?.data?.message);
            }
        }
        setLoadingAPI(false);
    };

    const handleLoginGoogle = async (credentialResponse) => {
        const token = credentialResponse.credential;
        try {
            const res = await loginGoogle(token);
            if (res.status === 200) {
                localStorage.setItem('user_token', res.data.token);
                setIsLogin(true);
                // onClose();
                // navigate('/');

                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            setErrors({ general: 'Đăng nhập Google thất bại.' });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        setIsLogin(!!token);
    }, [setIsLogin]);

    // Clear error messages every time this modal is reopened
    useEffect(() => {
        if (isOpen) {
            setErrors({});
        }
    }, [isOpen]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Motion.div
                    className="modal d-block"
                    key="login-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <Motion.div
                        className="modal-dialog login-container"
                        role="document"
                        initial={{ y: '-30px', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-30px', opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="modal-content border-0" ref={modalRef}>
                            <button type="button" className="btn-close ms-auto" onClick={onClose}></button>
                            <h2 className="text-center mb-4">Đăng Nhập</h2>
                            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Email hoặc tên người dùng
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
                                        id="username"
                                        placeholder="Nhập email hoặc tên người dùng"
                                        name="identifier"
                                        onChange={handleChange}
                                    />
                                    {errors.identifier && <p className="text-danger">*{errors.identifier}</p>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Mật Khẩu
                                    </label>
                                    <div className="input-password">
                                        <input
                                            type={showPassword === true ? 'text' : 'password'}
                                            className={`form-control ${errors.mat_khau ? 'is-invalid' : ''}`}
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            name="mat_khau"
                                            onChange={handleChange}
                                        />
                                        <i
                                            className={
                                                showPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                                            }
                                            onClick={() => setShowPassword(!showPassword)}
                                        ></i>
                                    </div>
                                    {errors.mat_khau && <p className="text-danger">*{errors.mat_khau}</p>}
                                </div>

                                <div className="d-flex justify-content-end mb-3">
                                    <a href="#" className="text-primary" onClick={() => onSwitch('forgot')}>
                                        Quên mật khẩu?
                                    </a>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" disabled={loadingAPI}>
                                        {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                        Đăng Nhập
                                    </button>
                                </div>

                                <div className="divider">Hoặc</div>

                                <div className="d-grid">
                                    <GoogleOAuthProvider clientId={API_GOOGLE}>
                                        <GoogleLogin
                                            onSuccess={handleLoginGoogle}
                                            onError={() => {
                                                console.log('Login Failed');
                                                setErrors({ general: 'Đăng nhập Google thất bại.' });
                                            }}
                                        />
                                    </GoogleOAuthProvider>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                Bạn chưa có tài khoản?
                                <a href="#" className="text-primary" onClick={() => onSwitch('register')}>
                                    <span className="ms-1">Đăng Ký</span>
                                </a>
                            </div>
                        </div>
                    </Motion.div>
                </Motion.div>
            )}
        </AnimatePresence>
    );
}

export default Login;
