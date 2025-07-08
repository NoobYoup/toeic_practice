import styles from './History.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function History() {
    return (
        <>
            <header className={cx('page-header')}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bold mb-3">Lịch sử bài thi</h1>
                            <p className="lead mb-0">
                                Theo dõi tiến trình học tập và xem chi tiết kết quả các bài thi đã làm
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row g-4 mb-4">
                    <div className="col-lg-3 col-md-6">
                        <div className={`${cx('stat-card')} text-center`}>
                            <div className={`${cx('stat-number')} text-primary`}>24</div>
                            <div className={cx('stat-label')}>Tổng bài thi</div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className={`${cx('stat-card')} text-center`}>
                            <div className={`${cx('stat-number')} text-success`}>785</div>
                            <div className={cx('stat-label')}>Điểm cao nhất</div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className={`${cx('stat-card')} text-center`}>
                            <div className={`${cx('stat-number')} text-warning`}>658</div>
                            <div className={cx('stat-label')}>Điểm trung bình</div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className={`${cx('stat-card')} text-center`}>
                            <div className={`${cx('stat-number')} text-info`}>18h 32m</div>
                            <div className={cx('stat-label')}>Thời gian luyện tập</div>
                        </div>
                    </div>
                </div>

                <div className={cx('test-history-card')}>
                    <div className={`${cx('filter-tabs')}  d-flex`}>
                        <a href="#" className={`${cx('filter-tab')} active`} data-filter="all">
                            Tất cả
                        </a>
                        <a href="#" className={`${cx('filter-tab')}`} data-filter="full">
                            Full Test
                        </a>
                        <a href="#" className={`${cx('filter-tab')}`} data-filter="mini">
                            Mini Test
                        </a>
                        <a href="#" className={`${cx('filter-tab')}`} data-filter="practice">
                            Practice
                        </a>
                    </div>

                    <div className="p-3 border-bottom">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-search"></i>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Tìm kiếm bài thi..." />
                                </div>
                            </div>
                            <div className="col-md-6 text-end">
                                <select className="form-select d-inline-block w-auto">
                                    <option>Sắp xếp theo ngày</option>
                                    <option>Sắp xếp theo điểm</option>
                                    <option>Sắp xếp theo loại bài thi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={cx('test-results')}>
                        <div className={cx('test-result-row')}>
                            <div className="row align-items-center">
                                <div className="col-md-1">
                                    <div className={cx('score-circle', 'score-excellent')}>785</div>
                                </div>
                                <div className="col-md-3">
                                    <h6 className="mb-1 fw-bold">TOEIC Full Test #15</h6>
                                    <span className={cx('test-type-badge', 'test-type-full')}>Full Test</span>
                                    <div className="mt-2">
                                        <span className={cx('time-badge')}>
                                            <i className="fas fa-clock me-1"></i>120 phút
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className={cx('skill-breakdown')}>
                                        <div className="d-flex align-items-center mb-2">
                                            <small className="text-muted me-2">Listening:</small>
                                            <strong>385/495</strong>
                                        </div>

                                        <div className="d-flex align-items-center mb-2">
                                            <small className="text-muted me-2">Reading:</small>
                                            <strong>400/495</strong>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill bg-success"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 text-muted">
                                    <i className="fas fa-calendar me-1"></i>08/07/2025
                                    <br />
                                    <i className="fas fa-clock me-1"></i>14:30
                                </div>
                                <div className="col-md-2">
                                    <div className={cx('action-buttons')}>
                                        <a href="#" className="btn btn-outline-primary btn-sm">
                                            <i className="fas fa-eye me-1"></i>Chi tiết
                                        </a>
                                        <a href="#" className="btn btn-outline-success btn-sm">
                                            <i className="fas fa-redo me-1"></i>Làm lại
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('test-result-row')}>
                            <div className="row align-items-center">
                                <div className="col-md-1">
                                    <div className={cx('score-circle', 'score-good')}>720</div>
                                </div>
                                <div className="col-md-3">
                                    <h6 className="mb-1 fw-bold">TOEIC Mini Test #8</h6>
                                    <span className={cx('test-type-badge', 'test-type-mini')}>Mini Test</span>
                                    <div className="mt-2">
                                        <span className={cx('time-badge')}>
                                            <i className="fas fa-clock me-1"></i>60 phút
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="skill-breakdown">
                                        <div className="d-flex align-items-center mb-2">
                                            <small className="text-muted me-2">Listening:</small>
                                            <strong>365/495</strong>
                                        </div>

                                        <div className="d-flex align-items-center mb-2">
                                            <small className="text-muted me-2">Reading:</small>
                                            <strong>355/495</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 text-muted">
                                    <i className="fas fa-calendar me-1"></i>06/07/2025
                                    <br />
                                    <i className="fas fa-clock me-1"></i>10:15
                                </div>
                                <div className="col-md-2">
                                    <div className={cx('action-buttons')}>
                                        <a href="#" className="btn btn-outline-primary btn-sm">
                                            <i className="fas fa-eye me-1"></i>Chi tiết
                                        </a>
                                        <a href="#" className="btn btn-outline-success btn-sm">
                                            <i className="fas fa-redo me-1"></i>Làm lại
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default History;
