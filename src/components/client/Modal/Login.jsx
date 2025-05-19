import { useEffect, useState } from 'react';
import { login, loginGoogle } from '@/services/authService.jsx';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const API_GOOGLE = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function Login({ setIsLogin }) {
    const [form, setForm] = useState({ identifier: '', mat_khau: '' });
    const [errors, setErrors] = useState({});
    const [loadingAPI, setLoadingAPI] = useState(false);
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

            localStorage.setItem('user_token', res.data.token);
            const decoded = jwtDecode(res.data.token);
            console.log(decoded);

            // localStorage.setItem('user', JSON.stringify(res.user)); // Lưu thêm thông tin user
            setIsLogin(true);
            // window.location.reload();
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

    const handleLoginGoogle = async (credentialResponse) => {
        const token = credentialResponse.credential;
        console.log(token);

        try {
            const res = await loginGoogle(token);
            console.log(res);

            console.log(res.data);

            if (res.status === 200) {
                navigate('/blog');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        setIsLogin(!!token);
    }, [setIsLogin]);

    return (
        <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog login-container" role="document">
                <div className="modal-content border-0">
                    <button
                        type="button"
                        className="btn-close ms-auto"
                        data-bs-dismiss="modal"
                        aria-label="Đóng"
                    ></button>
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
                            <input
                                type="password"
                                className={`form-control ${errors.mat_khau ? 'is-invalid' : ''}`}
                                id="password"
                                placeholder="Nhập mật khẩu"
                                name="mat_khau"
                                onChange={handleChange}
                            />
                            {errors.mat_khau && <p className="text-danger">*{errors.mat_khau}</p>}
                        </div>

                        <div className="d-flex justify-content-end mb-3">
                            <a
                                href="#"
                                className="text-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#forgotPasswordModal"
                                data-bs-dismiss="modal"
                            >
                                Quên mật khẩu?
                            </a>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
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
                                    }}
                                />
                            </GoogleOAuthProvider>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        Bạn chưa có tài khoản?
                        <a
                            href="#"
                            className="text-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#registerModal"
                            data-bs-dismiss="modal"
                        >
                            Đăng Ký
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
