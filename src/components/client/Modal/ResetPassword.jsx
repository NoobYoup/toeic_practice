import { useState, useEffect, useRef } from 'react';
import { resetPassword } from '@/services/authService.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function ResetPassword({ isOpen, onSwitch, onClose, email }) {
    const [mat_khau_moi, setMatKhau] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const modalRef = useRef(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoadingAPI(true);

        try {
            const res = await resetPassword({ email, mat_khau_moi });
            setMessage(res.message || 'Đổi mật khẩu thành công!');
            onSwitch('login');
        } catch (err) {
            setError(err.response?.data?.message || 'Đổi mật khẩu thất bại.');
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
                    key="reset-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
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
                            <h2 className="text-center mb-4">Thay đổi mật khẩu</h2>
                            {message && <div className="alert alert-success text-center">{message}</div>}
                            {error && <div className="alert alert-danger text-center">{error}</div>}
                            <form onSubmit={handleResetPassword}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Nhập mật khẩu mới
                                    </label>
                                    <div className="input-password">
                                        <input
                                            type={showPassword === true ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            placeholder="Nhập mật khẩu mới"
                                            name="mat_khau_moi"
                                            value={mat_khau_moi}
                                            onChange={(e) => setMatKhau(e.target.value)}
                                        />
                                        <i
                                            className={
                                                showPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                                            }
                                            onClick={() => setShowPassword(!showPassword)}
                                        ></i>
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" disabled={loadingAPI}>
                                        {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                        Thay đổi
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <a href="#" className="text-primary" onClick={() => onSwitch('login')}>
                                    <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ResetPassword;
