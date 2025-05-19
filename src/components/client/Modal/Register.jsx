import { useState } from 'react';
import { register } from '@/services/authService.jsx';

function Register() {
    const [form1, setForm1] = useState({
        ten_dang_nhap: '',
        email: '',
        mat_khau: '',
    });

    const [errors1, setErrors1] = useState({});

    const [message, setMessage] = useState('');

    const [loadingAPI, setLoadingAPI] = useState(false);

    const handleChange1 = (e) => {
        setForm1({ ...form1, [e.target.name]: e.target.value });
        setErrors1((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors1({});
        setMessage('');
        setLoadingAPI(true);
        try {
            const res = await register(form1);

            setMessage(res.data.message || 'Đăng ký thành công!');
            window.location.reload();
        } catch (err) {
            const apiErrors = err.response?.data?.errors;
            const generalMsg = err.response?.data?.message;

            if (Array.isArray(apiErrors)) {
                const newErrors = {};
                apiErrors.forEach((error) => {
                    if (error.path) {
                        if (newErrors[error.path]) {
                            newErrors[error.path] += `\n${error.msg}`;
                        } else {
                            newErrors[error.path] = error.msg;
                        }
                    }
                });
                setErrors1(newErrors);
            } else if (generalMsg) {
                setErrors1({ general: generalMsg });
            } else {
                setErrors1({ general: 'Đăng ký thất bại.' });
            }
        }
        setLoadingAPI(false);
    };

    const handleMessageErrors = (field) => {
        return errors1[field]
            ? errors1[field].split('\n').map((msg, idx) => (
                  <div key={idx} className="text-danger small">
                      *{msg}
                  </div>
              ))
            : null;
    };

    return (
        <div
            className="modal fade"
            id="registerModal"
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
                    <h2 className="text-center mb-4">Đăng Ký</h2>

                    <form onSubmit={handleRegister}>
                        {errors1.general && <div className="alert alert-danger">{errors1.general}</div>}
                        {message && <div className="alert alert-info mt-3">{message}</div>}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Tên người dùng
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors1.ten_dang_nhap ? 'is-invalid' : ''}`}
                                id="username"
                                placeholder="Nhập tên người dùng của bạn"
                                name="ten_dang_nhap"
                                onChange={handleChange1}
                            />
                            {handleMessageErrors && handleMessageErrors('ten_dang_nhap')}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors1.email ? 'is-invalid' : ''}`}
                                id="email"
                                placeholder="Nhập email của bạn"
                                name="email"
                                onChange={handleChange1}
                            />
                            {handleMessageErrors && handleMessageErrors('email')}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Mật Khẩu
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errors1.mat_khau ? 'is-invalid' : ''}`}
                                id="password"
                                placeholder="Nhập mật khẩu"
                                name="mat_khau"
                                onChange={handleChange1}
                            />
                            {handleMessageErrors && handleMessageErrors('mat_khau')}
                        </div>

                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary">
                                {loadingAPI && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Đăng Ký
                            </button>
                        </div>
                        <p>{message}</p>
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

export default Register;
