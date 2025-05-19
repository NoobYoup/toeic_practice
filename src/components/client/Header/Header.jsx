import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.scss';

import Login from '../Modal/Login.jsx';
import Register from '../Modal/Register.jsx';
import ForgotPassword from '../Modal/ForgotPassword.jsx';
import VerifyOTP from '../Modal/VerifyOTP.jsx';
import ResetPassword from '../Modal/ResetPassword.jsx';

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    // const [user, setUser] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        setIsLogin(false);
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('user_token');
    //     const storedUser = localStorage.getItem('user');

    //     if (token && storedUser) {
    //         setIsLogin(true);
    //         setUser(JSON.parse(storedUser)); // 👈 Gán user vào state
    //     }
    // }, []);

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
                <div className="container">
                    <Link className="navbar-brand text-primary" to="/">
                        <i className="fas fa-graduation-cap me-2"></i>TOEIC Master
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Bài thi thử
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Từ vựng
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Ngữ pháp
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">
                                    Blog
                                </Link>
                            </li>
                        </ul>

                        {!isLogin ? (
                            <div className="d-flex">
                                <button
                                    type="button"
                                    className="btn btn-primary me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        ) : (
                            <div className="ms-3 dropdown">
                                <div
                                    className="user-info d-flex align-items-center"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="user-avatar">
                                        <img src="/public/images/logo_black.png" alt="Avatar" />
                                    </div>
                                    <span className="user-name d-none d-md-block">Trần Minh Trung</span>
                                </div>

                                <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="userDropdown">
                                    <li className="dropdown-header">
                                        <div>Trần Minh Trung</div>
                                        <div className="user-status">Premium Member</div>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user"></i> Thông tin cá nhân
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-book"></i> Khóa học của tôi
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-history"></i> Lịch sử bài thi
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-star"></i> Bài thi đã lưu
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-cog"></i> Cài đặt
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item logout" href="#" onClick={() => handleLogout()}>
                                            <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <Login setIsLogin={setIsLogin} />
            <Register />
            <ForgotPassword email={email} setEmail={setEmail} />
            <VerifyOTP email={email} />
            <ResetPassword email={email} />
        </>
    );
}

export default Header;
