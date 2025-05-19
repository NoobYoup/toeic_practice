import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === '123456') {
            localStorage.setItem('admin_token', 'your_token_here');
            navigate('/admin/exam');
        } else {
            alert('Thông tin đăng nhập sai');
        }
    };

    return (
        <div className="login-wrapper">
            <div class="container">
                <div class="card border-light-subtle shadow-sm">
                    <div class="row g-0">
                        <div class="col-12 col-md-6 text-bg-primary">
                            <div class="d-flex align-items-center justify-content-center h-100">
                                <div class="col-10 col-xl-8 py-3">
                                    <h1 className="fw-bold">
                                        <i className="fas fa-graduation-cap me-2"></i>TOEIC Master
                                    </h1>
                                    <hr class="border-primary-subtle mb-4" />
                                    <h2 class="h1 mb-4">Chinh phục TOEIC cùng chúng tôi</h2>
                                    <p class="lead m-0">
                                        Nền tảng luyện thi TOEIC trực tuyến hàng đầu với hơn 10,000+ câu hỏi và đề thi
                                        thử mô phỏng sát thực tế.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card-body p-3 p-md-4 p-xl-5">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mb-5">
                                            <h3>Đăng nhập</h3>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div class="row gy-3 gy-md-4 overflow-hidden">
                                        <div class="col-12">
                                            <label for="username" class="form-label">
                                                Tài khoản <span class="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="username"
                                                id="username"
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                placeholder="Nhập tài khoản admin"
                                                required
                                            />
                                        </div>
                                        <div class="col-12">
                                            <label for="password" class="form-label">
                                                Mật khẩu <span class="text-danger">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                class="form-control"
                                                name="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                placeholder="Nhập mật khẩu admin"
                                                id="password"
                                                required
                                            />
                                        </div>

                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button class="btn bsb-btn-xl btn-primary">Đăng nhập</button>
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
