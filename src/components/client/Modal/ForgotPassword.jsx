import { useState } from 'react';
import { forgotPassword } from '@/services/authService.jsx';

function ForgotPassword({ email, setEmail }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoadingAPI(true);

        try {
            const res = await forgotPassword({ email });
            setMessage(res.message || 'Mã OTP đã được gửi đến email của bạn');
        } catch (err) {
            const msg = err.response?.data?.message || 'Không thể gửi mã OTP. Vui lòng thử lại.';
            setError(msg);
        }
        setLoadingAPI(false);
    };

    return (
        <div
            className="modal fade"
            id="forgotPasswordModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="registerModalLabel"
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
                    <h2 className="text-center mb-4">Quên mật khẩu</h2>
                    {message && <div className="alert alert-success text-center">{message}</div>}
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="d-grid mb-3">
                            <button
                                type="submit"
                                data-bs-toggle="modal"
                                data-bs-target="#otpModal"
                                data-bs-dismiss="modal"
                                className="btn btn-primary"
                            >
                                {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Gửi
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <a
                            href="#"
                            className="text-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                            data-bs-dismiss="modal"
                        >
                            <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
