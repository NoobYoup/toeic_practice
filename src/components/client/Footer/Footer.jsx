import './Footer.scss';

function Footer() {
    return (
        <footer className="footer py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <h5 className="fw-bold mb-3">TOEIC Master</h5>
                        <p className="mb-3">
                            Nền tảng luyện thi TOEIC trực tuyến hàng đầu với hơn 10,000+ câu hỏi và đề thi thử mô phỏng.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white">
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a href="#" className="text-white">
                                <i className="fab fa-youtube fa-lg"></i>
                            </a>
                            <a href="#" className="text-white">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                            <a href="#" className="text-white">
                                <i className="fab fa-tiktok fa-lg"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <h6 className="fw-bold mb-3">Bài thi</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <a href="#">Full Test</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Mini Test</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Luyện nghe</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Luyện đọc</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <h6 className="fw-bold mb-3">Học tập</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <a href="#">Từ vựng</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Ngữ pháp</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Lộ trình học</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <h6 className="fw-bold mb-3">Hỗ trợ</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <a href="#">Liên hệ</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">FAQs</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Điều khoản</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Chính sách</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <h6 className="fw-bold mb-3">Tài khoản</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <a href="#">Đăng nhập</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Đăng ký</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Tài khoản của tôi</a>
                            </li>
                            <li className="mb-2">
                                <a href="#">Quên mật khẩu</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="my-4 border-secondary" />
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <p className="mb-0">&copy; 2025 TOEIC Master. Tất cả quyền được bảo lưu.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p className="mb-0">
                            Thiết kế bởi{' '}
                            <a href="https://github.com/NoobYoup" className="text-primary text-decoration-underline">
                                Youp
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
