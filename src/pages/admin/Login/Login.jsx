import { useState } from 'react';
import './Login.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '@/services/authService.jsx';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Login() {
    const [form, setForm] = useState({ identifier: '', mat_khau: '' });
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const msg = location.state?.toastMsg;
        if (msg) {
            toast.warn(msg);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoadingAPI(true);
        setErrors({});

        try {
            const res = await login(form);
            console.log(res);

            if (res.data.vai_tro === 'quan_tri_vien') {
                localStorage.setItem('admin_token', res.data.token);
            }

            navigate('/admin/dashboard');
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
                setErrors({ general: generalMsg });
            } else {
                setErrors({ general: 'Đăng nhập thất bại.' });
            }
        }
        setLoadingAPI(false);
    };

    return (
        <div className="login-wrapper">
            <div className="container">
                <div className="card border-light-subtle shadow">
                    <div className="row g-0">
                        <div className="col-12 col-md-6 text-bg-primary">
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <div className="col-10 col-xl-8 py-3">
                                    <h1 className="fw-bold">
                                        <i className="fas fa-graduation-cap me-2"></i>TOEIC Master
                                    </h1>
                                    <hr className="border-primary-subtle mb-4" />
                                    <h2 className="h1 mb-4">Chinh phục TOEIC cùng chúng tôi</h2>
                                    <p className="lead m-0">
                                        Nền tảng luyện thi TOEIC trực tuyến hàng đầu với hơn 10,000+ câu hỏi và đề thi
                                        thử mô phỏng sát thực tế.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5">
                                            <h3>Đăng nhập</h3>
                                        </div>
                                    </div>
                                </div>
                                {errors.general && <div className="alert alert-danger">{errors.general}</div>}

                                <form onSubmit={handleLogin}>
                                    <div className="row gy-3 gy-md-4 overflow-hidden">
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label">
                                                Tài khoản <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
                                                placeholder="Nhập tài khoản admin"
                                                id="username"
                                                name="identifier"
                                                onChange={handleChange}
                                            />
                                            {errors.identifier && <p className="text-danger">*{errors.identifier}</p>}
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label">
                                                Mật khẩu <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-password">
                                                <input
                                                    type={showPassword === true ? 'text' : 'password'}
                                                    className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
                                                    placeholder="Nhập mật khẩu admin"
                                                    id="password"
                                                    name="mat_khau"
                                                    onChange={handleChange}
                                                />
                                                <i
                                                    className={
                                                        showPassword === true
                                                            ? 'fa-solid fa-eye'
                                                            : 'fa-solid fa-eye-slash'
                                                    }
                                                    onClick={() => setShowPassword(!showPassword)}
                                                ></i>
                                            </div>
                                            {errors.identifier && <p className="text-danger">*{errors.identifier}</p>}
                                        </div>

                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn bsb-btn-xl btn-primary" disabled={loadingAPI}>
                                                    {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                                    Đăng nhập
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
