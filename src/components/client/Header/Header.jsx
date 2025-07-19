import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './Header.scss';
import { AnimatePresence } from 'framer-motion';

import Login from '../Modal/Login.jsx';
import Register from '../Modal/Register.jsx';
import ForgotPassword from '../Modal/ForgotPassword.jsx';
import VerifyOTP from '../Modal/VerifyOTP.jsx';
import ResetPassword from '../Modal/ResetPassword.jsx';

import { useAuth } from '@/contexts/AuthContext';

const DEFAULT_AVATAR = '/images/logo_black.png';

function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [currentModal, setCurrentModal] = useState(null);
    // Refs for navbar collapse and toggler button
    const navRef = useRef(null);
    const togglerRef = useRef(null);

    const closeModal = () => setCurrentModal(null);

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

    // Close navbar collapse when clicking on a nav link (in mobile/tablet view)
    useEffect(() => {
        const navElement = navRef.current;
        if (!navElement) return;

        const handleNavLinkClick = (event) => {
            const link = event.target.closest('a');
            // Only act when a link inside the collapse is clicked and the menu is open
            if (link && navElement.classList.contains('show') && togglerRef.current) {
                togglerRef.current.click(); // trigger bootstrap collapse toggle
            }
        };

        navElement.addEventListener('click', handleNavLinkClick);
        return () => navElement.removeEventListener('click', handleNavLinkClick);
    }, []);

    // Close navbar collapse when clicking outside the menu (mobile/tablet view)
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const navElement = navRef.current;
            if (!navElement || !togglerRef.current) return;

            // If the menu is shown and the click target is outside both the menu and the toggler button
            if (
                navElement.classList.contains('show') &&
                !navElement.contains(event.target) &&
                !togglerRef.current.contains(event.target)
            ) {
                togglerRef.current.click();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

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
                        ref={togglerRef}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" ref={navRef}>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Trang chủ
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/list-test">
                                    Bài thi thử
                                </NavLink>
                            </li>
                            <li className="nav-item d-none ">
                                <NavLink className="nav-link" to="/dictionary">
                                    Từ vựng
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/grammar">
                                    Ngữ pháp
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/blog">
                                    Blog
                                </NavLink>
                            </li>
                        </ul>

                        {!isAuthenticated ? (
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
                                        <img src={user?.ho_so?.url_hinh_dai_dien || DEFAULT_AVATAR} alt="Avatar" />
                                    </div>
                                    <span className="user-name">{user?.ho_so?.ho_ten}</span>
                                </div>

                                <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="userDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/my-account">
                                            <i className="fas fa-user"></i> Thông tin cá nhân
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to="/history">
                                            <i className="fas fa-history"></i> Lịch sử bài thi
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to="/my-blog">
                                            <i className="fas fa-book"></i> Bài viết của tôi
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item logout" href="#" onClick={logout}>
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
                <Login key="login" isOpen={currentModal === 'login'} onSwitch={setCurrentModal} onClose={closeModal} />
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
