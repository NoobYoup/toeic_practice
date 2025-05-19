import { useState } from 'react';
import { verifyOTP } from '@/services/authService.jsx';

function VerifyOTP({ email }) {
    const [otp_code, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoadingAPI(true);
        try {
            const res = await verifyOTP({ email, otp_code });
            console.log(res);
            setMessage(res.message || 'Xác minh thành công.');
        } catch (err) {
            const msg = err.response?.data?.message || 'Xác minh thất bại. Vui lòng kiểm tra lại mã OTP.';
            setError(msg);
        }
        setLoadingAPI(false);
    };

    return (
        <div
            className="modal fade"
            id="otpModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="otpVerificationModalLabel"
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
                    <h2 className="text-center mb-4">Xác minh OTP</h2>
                    <p className="text-center mb-4">
                        Mã xác minh đã được gửi đến email của bạn. Vui lòng kiểm tra và nhập mã xác minh để tiếp tục.
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
                            <button
                                type="submit"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#resetPasswordModal"
                                data-bs-dismiss="modal"
                            >
                                {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Xác nhận
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <a
                            href="#"
                            className="text-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#resetPasswordModal"
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

export default VerifyOTP;
