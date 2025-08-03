import { useState, useEffect, useRef } from 'react';
import { forgotPassword } from '@/services/authService.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function ForgotPassword({ isOpen, onSwitch, onClose, email, setEmail }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setMessage('');
            setError('');
            if (setEmail) setEmail('');
        }
    }, [isOpen, setEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoadingAPI(true);

        try {
            const res = await forgotPassword({ email });
            setMessage(res.message || 'Mã OTP đã được gửi đến email của bạn');
            onSwitch('otp');
        } catch (err) {
            const msg = err.response?.data?.message || 'Không thể gửi mã OTP. Vui lòng thử lại.';
            toast.error(msg);
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
                    key="forgot-modal"
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
                            <h2 className="text-center mb-4">Quên mật khẩu</h2>
                            {message && <div className="alert alert-success text-center">{message}</div>}
                            {error && <div className="alert alert-danger text-center">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary" disabled={loadingAPI}>
                                        {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                        Gửi
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

export default ForgotPassword;
