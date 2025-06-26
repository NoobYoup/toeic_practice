import { DEFAULT_AVATAR } from '@/constants/default';
import styles from './FeedbackSection.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function FeedbackSection() {
    return (
        <section className={`${cx('testimonials')} py-5`}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Học viên nói gì về chúng tôi</h2>
                    <p className="text-muted">Phản hồi từ những học viên đã thành công đạt điểm cao</p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className={`${cx('testimonial-card')} p-4`}>
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src={DEFAULT_AVATAR}
                                    alt="User"
                                    className="rounded-circle me-3"
                                    style={{ width: '40px' }}
                                />
                                <div>
                                    <h6 className="mb-0 fw-bold">Nguyễn Văn A</h6>
                                    <div className="text-warning">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-2">
                                "Nhờ luyện tập trên TOEIC Master mà tôi đã tăng được 200 điểm chỉ sau 2 tháng. Đề thi
                                thực sự rất sát với đề thi thật."
                            </p>
                            <div className="text-primary fw-bold">Điểm TOEIC: 850</div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className={`${cx('testimonial-card')} p-4`}>
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src={DEFAULT_AVATAR}
                                    alt="User"
                                    className="rounded-circle me-3"
                                    style={{ width: '40px' }}
                                />
                                <div>
                                    <h6 className="mb-0 fw-bold">Trần Thị B</h6>
                                    <div className="text-warning">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-2">
                                "Phần phân tích chi tiết sau mỗi bài thi giúp tôi hiểu rõ điểm yếu của mình và tập trung
                                cải thiện đúng trọng tâm."
                            </p>
                            <div className="text-primary fw-bold">Điểm TOEIC: 795</div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className={`${cx('testimonial-card')} p-4`}>
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src={DEFAULT_AVATAR}
                                    alt="User"
                                    className="rounded-circle me-3"
                                    style={{ width: '40px' }}
                                />
                                <div>
                                    <h6 className="mb-0 fw-bold">Lê Văn C</h6>
                                    <div className="text-warning">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-2">
                                "Tôi thích cách website tổ chức các bài học và bài thi theo từng cấp độ, giúp tôi học từ
                                cơ bản đến nâng cao rất hiệu quả."
                            </p>
                            <div className="text-primary fw-bold">Điểm TOEIC: 920</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeedbackSection;
