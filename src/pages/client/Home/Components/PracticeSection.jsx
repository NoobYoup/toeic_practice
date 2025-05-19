import { Link } from 'react-router-dom';

function PracticeSection() {
    return (
        <section className="practice-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Đề thi luyện tập</h2>
                    {/* <p className="text-muted">Đa dạng bài thi và bài luyện tập theo từng kỹ năng</p> */}
                </div>
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="test-card card h-100">
                            <div className="card-body">
                                <h5>New Economy TOEIC Test 1</h5>
                                <div className="test-info mb-3">
                                    <div className="row mb-2">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-clock text-muted me-2"></i>
                                            <span className="text-muted">120 phút</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-user text-muted me-2"></i>
                                            <span className="text-muted">100</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-list-alt text-muted me-2"></i>
                                            <span className="text-muted">7 phần</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-question-circle text-muted me-2"></i>
                                            <span className="text-muted">200 câu</span>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/test" className="btn btn-outline-primary w-100">
                                    Làm ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="test-card card h-100">
                            <div className="card-body">
                                <h5>New Economy TOEIC Test 1</h5>
                                <div className="test-info mb-3">
                                    <div className="row mb-2">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-clock text-muted me-2"></i>
                                            <span className="text-muted">120 phút</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-user text-muted me-2"></i>
                                            <span className="text-muted">100</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-list-alt text-muted me-2"></i>
                                            <span className="text-muted">7 phần</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-question-circle text-muted me-2"></i>
                                            <span className="text-muted">200 câu</span>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/test" className="btn btn-outline-primary w-100">
                                    Làm ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="test-card card h-100">
                            <div className="card-body">
                                <h5>New Economy TOEIC Test 1</h5>
                                <div className="test-info mb-3">
                                    <div className="row mb-2">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-clock text-muted me-2"></i>
                                            <span className="text-muted">120 phút</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-user text-muted me-2"></i>
                                            <span className="text-muted">100</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-list-alt text-muted me-2"></i>
                                            <span className="text-muted">7 phần</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-question-circle text-muted me-2"></i>
                                            <span className="text-muted">200 câu</span>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/test" className="btn btn-outline-primary w-100">
                                    Làm ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="test-card card h-100">
                            <div className="card-body">
                                <h5>New Economy TOEIC Test 1</h5>
                                <div className="test-info mb-3">
                                    <div className="row mb-2">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-clock text-muted me-2"></i>
                                            <span className="text-muted">120 phút</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-user text-muted me-2"></i>
                                            <span className="text-muted">100</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-list-alt text-muted me-2"></i>
                                            <span className="text-muted">7 phần</span>
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <i className="far fa-question-circle text-muted me-2"></i>
                                            <span className="text-muted">200 câu</span>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/test" className="btn btn-outline-primary w-100">
                                    Làm ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PracticeSection;
