import { Link } from 'react-router-dom';
import styles from './ListTest.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ListTest() {
    return (
        <>
            <section className={cx('page-header')}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-8">
                            <h1 class="fw-bold mb-3">Các Đề Thi TOEIC</h1>
                            <p class="lead mb-0">
                                Lựa chọn từ hơn 300+ đề thi và bài luyện tập được thiết kế theo chuẩn ETS
                            </p>
                        </div>
                        {/* <div class="col-lg-4 text-center text-lg-end">
                            <div class="bg-opacity-20 rounded p-3">
                                <div class="d-flex justify-content-around">
                                    <div class="text-center">
                                        <div class="h4 fw-bold mb-0">350+</div>
                                        <small>Đề thi</small>
                                    </div>
                                    <div class="text-center">
                                        <div class="h4 fw-bold mb-0">10K+</div>
                                        <small>Câu hỏi</small>
                                    </div>
                                    <div class="text-center">
                                        <div class="h4 fw-bold mb-0">95%</div>
                                        <small>Độ chính xác</small>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <div className="container">    
                <div className='my-5'>
                    
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="test-card card h-100 border-0 shadow p-2">
                            <div className="card-body">
                                <Link to="/detail-test">
                                    <h5>New Economy TOEIC Test 1</h5>
                                </Link>
                                <p className="card-text text-muted">Đề thi luyện tập</p>
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
                                <Link to="/detail-test" className="btn btn-outline-primary w-100">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default ListTest;
