import { useState, useEffect, useRef } from 'react';
import { verifyOTP } from '@/services/authService.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function VerifyOTP({ isOpen, onSwitch, onClose, email }) {
    const [otp_code, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);
    const modalRef = useRef(null);

    const handleVerify = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoadingAPI(true);
        try {
            const res = await verifyOTP({ email, otp_code });
            setMessage(res.message || 'Xác minh thành công.');
            onSwitch('reset'); // Switch to ResetPassword modal on success
        } catch (err) {
            const msg = err.response?.data?.message || 'Xác minh thất bại. Vui lòng kiểm tra lại mã OTP.';
            setError(msg);
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
                    key="otp-modal"
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
                            <h2 className="text-center mb-4">Xác minh OTP</h2>
                            <p className="text-center mb-4">
                                Mã xác minh đã được gửi đến email của bạn. Vui lòng kiểm tra và nhập mã xác minh để tiếp
                                tục.
                            </p>
                            {message && <div className="alert alert-success text-center">{message}</div>}
                            {error && <div className="alert alert-danger text-center">{error}</div>}
                            <form onSubmit={handleVerify}>
                                <div className="mb-3">
                                    <label htmlFor="otp-code" className="form-label">
                                        Mã OTP
                                    </label>
                                    <div className="otp-input-container d-flex justify-content-between mb-3">
                                        <input
                                            type="text"
                                            className="form-control text-center mx-1 fw-bold"
                                            maxLength="6"
                                            value={otp_code}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary" disabled={loadingAPI}>
                                        {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                        Xác nhận
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <a href="#" className="text-primary" onClick={() => onSwitch('forgot')}>
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

export default VerifyOTP;
