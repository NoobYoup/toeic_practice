import { Link } from 'react-router-dom';
import './HeroSection.scss';

function HeroSection() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 hero-text">
                        <h1 className="mb-4">Chinh phục TOEIC cùng chúng tôi</h1>
                        <p className="lead mb-4">
                            Nền tảng luyện thi TOEIC trực tuyến hàng đầu với hơn 10,000+ câu hỏi và đề thi thử mô phỏng
                            sát thực tế.
                        </p>
                        <div className="d-flex flex-wrap">
                            <Link to="/test" className="btn btn-light btn-lg me-3 mb-3">
                                Thi thử miễn phí
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-5 mt-lg-0 text-center">
                        <img
                            src="/public/images/background_desktop.jpg"
                            alt="TOEIC Test Preparation"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
