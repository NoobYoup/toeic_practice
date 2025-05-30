import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.scss';
import { AnimatePresence } from 'framer-motion';

import Login from '../Modal/Login.jsx';
import Register from '../Modal/Register.jsx';
import ForgotPassword from '../Modal/ForgotPassword.jsx';
import VerifyOTP from '../Modal/VerifyOTP.jsx';
import ResetPassword from '../Modal/ResetPassword.jsx';

import { getProfile } from '@/services/userService.jsx';

const DEFAULT_AVATAR = '/images/logo_black.png';

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [currentModal, setCurrentModal] = useState(null);
    const [profile, setProfile] = useState(null);

    const closeModal = () => setCurrentModal(null);

    const token = localStorage.getItem('user_token');

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const res = await getProfile(token);
                setProfile(res.data.data);
                setIsLogin(true);
            } catch (err) {
                console.log(err);
                setIsLogin(false);
                localStorage.removeItem('user_token');
            }
        };

        fetchUser();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        setIsLogin(false);
        setProfile(null);
        window.location.reload();
    };

    // Manage body overflow when any modal is open
    useEffect(() => {
        if (currentModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [currentModal]);

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
                                <Link className="nav-link" to="/test">
                                    Bài thi thử
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dictionary">
                                    Từ vựng
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/grammar">
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
                                    onClick={() => setCurrentModal('login')}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        ) : (
                            <div className="dropdown">
                                <div
                                    className="user-info d-flex align-items-center p-0"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="user-avatar">
                                        <img src={profile?.ho_so?.url_hinh_dai_dien || DEFAULT_AVATAR} alt="Avatar" />
                                    </div>
                                    <span className="user-name">{profile?.ho_so?.ho_ten}</span>
                                </div>

                                <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="userDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/my-account">
                                            <i className="fas fa-user"></i> Thông tin cá nhân
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/course">
                                            <i className="fas fa-book"></i> Khóa học của tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/history">
                                            <i className="fas fa-history"></i> Lịch sử bài thi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/archive">
                                            <i className="fas fa-star"></i> Bài thi đã lưu
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/setting">
                                            <i className="fas fa-cog"></i> Cài đặt
                                        </Link>
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

            <AnimatePresence>
                <Login
                    key="login"
                    isOpen={currentModal === 'login'}
                    onSwitch={setCurrentModal}
                    onClose={closeModal}
                    setIsLogin={setIsLogin}
                />
                <Register
                    key="register"
                    isOpen={currentModal === 'register'}
                    onSwitch={setCurrentModal}
                    onClose={closeModal}
                />
                <ForgotPassword
                    key="forgot"
                    isOpen={currentModal === 'forgot'}
                    onSwitch={setCurrentModal}
                    onClose={closeModal}
                    email={email}
                    setEmail={setEmail}
                />
                <VerifyOTP
                    key="otp"
                    isOpen={currentModal === 'otp'}
                    onSwitch={setCurrentModal}
                    onClose={closeModal}
                    email={email}
                />
                <ResetPassword
                    key="reset"
                    isOpen={currentModal === 'reset'}
                    onSwitch={setCurrentModal}
                    onClose={closeModal}
                    email={email}
                />
            </AnimatePresence>
        </>
    );
}

export default Header;
