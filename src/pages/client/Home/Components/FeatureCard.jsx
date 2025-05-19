import './FeatureCard.scss';

function FeatureCard() {
    return (
        <section className="py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Tại sao chọn TOEIC Master?</h2>
                    <p className="text-muted">Chúng tôi cung cấp giải pháp học tập toàn diện giúp bạn đạt điểm cao</p>
                </div>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="feature-card p-4 h-100 bg-white">
                            <div className="feature-icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <h5 className="fw-bold">Đề thi chuẩn format ETS</h5>
                            <p className="text-muted mb-0">
                                Đề thi được biên soạn theo cấu trúc mới nhất của ETS, giúp bạn làm quen với định dạng
                                thực tế.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card p-4 h-100 bg-white">
                            <div className="feature-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h5 className="fw-bold">Phân tích chi tiết</h5>
                            <p className="text-muted mb-0">
                                Thống kê và phân tích kết quả làm bài chi tiết, giúp bạn nhận biết điểm mạnh và điểm
                                yếu.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card p-4 h-100 bg-white">
                            <div className="feature-icon">
                                <i className="fas fa-headphones"></i>
                            </div>
                            <h5 className="fw-bold">Luyện nghe chuyên sâu</h5>
                            <p className="text-muted mb-0">
                                Hệ thống audio chất lượng cao với nhiều giọng đọc khác nhau, tương tự như trong bài thi
                                thật.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card p-4 h-100 bg-white">
                            <div className="feature-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <h5 className="fw-bold">Hẹn giờ tự động</h5>
                            <p className="text-muted mb-0">
                                Hệ thống tính giờ chính xác, giúp bạn kiểm soát thời gian làm bài tối ưu nhất.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card p-4 h-100 bg-white">
                            <div className="feature-icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <h5 className="fw-bold">Học mọi lúc mọi nơi</h5>
                            <p className="text-muted mb-0">
                                Giao diện thân thiện trên mọi thiết bị, giúp bạn học tập mọi lúc mọi nơi.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card p-4 h-100 bg-white">
                            <div className="feature-icon">
                                <i className="fas fa-comments"></i>
                            </div>
                            <h5 className="fw-bold">Cộng đồng học tập</h5>
                            <p className="text-muted mb-0">
                                Tham gia cộng đồng người học TOEIC lớn để chia sẻ kinh nghiệm và động viên nhau.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeatureCard;
