import { useState } from 'react';
import { resetPassword } from '@/services/authService.jsx';

function ResetPassword({ email }) {
    const [mat_khau_moi, setMatKhau] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoadingAPI(true);

        // const mat_khau = e.target.mat_khau.value;
        // const xac_nhan_mat_khau = e.target.xac_nhan_mat_khau.value;

        // if (mat_khau !== xac_nhan_mat_khau) {
        //     setMessage('Mật khẩu xác nhận không khớp.');
        //     return;
        // }

        try {
            const res = await resetPassword({ email, mat_khau_moi });
            console.log(res);

            setMessage(res.message || 'Đổi mật khẩu thành công!');
        } catch (err) {
            setError(err.response?.data?.message || 'Đổi mật khẩu thất bại.');
        }
        setLoadingAPI(false);
    };

    return (
        <div
            className="modal fade"
            id="resetPasswordModal"
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
                    <h2 className="text-center mb-4">Thay đổi mật khẩu</h2>
                    {message && <div className="alert alert-success text-center">{message}</div>}
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <form onSubmit={handleResetPassword}>
                        {/* <div className="mb-3 d-none">
                            <label htmlFor="username" className="form-label">
                                Email hoặc tên người dùng
                            </label>
                            <input
                                type="text"
                                className={`form-control`}
                                id="username"
                                placeholder="Nhập email hoặc tên người dùng"
                                name="identifier"
                            />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Nhập mật khẩu mới
                            </label>
                            <input
                                type="text"
                                className={`form-control`}
                                id="password"
                                placeholder="Nhập mật khẩu mới"
                                name="mat_khau_moi"
                                value={mat_khau_moi}
                                onChange={(e) => setMatKhau(e.target.value)}
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Xác nhận lại mật khẩu
                            </label>
                            <input
                                type="text"
                                className={`form-control`}
                                id="password"
                                placeholder="Nhập lại mật khẩu mới"
                                name="password"
                            />
                        </div> */}

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
