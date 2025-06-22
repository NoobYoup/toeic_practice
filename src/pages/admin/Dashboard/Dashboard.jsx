import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Tổng Quan</h2>
                    <p className="text-muted">Xin chào, Admin! Tổng quan hệ thống ngày 15/05/2025</p>
                </div>
                <div>
                    <button className="btn btn-primary">
                        <i className="fas fa-sync-alt me-2"></i>Cập nhật
                    </button>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-primary', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-primary mb-1">TỔNG SỐ CÂU HỎI</h6>
                                    <h3 className="mb-0">756</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-question-circle text-primary`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-success', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-success mb-1">ĐỀ THI ĐÃ TẠO</h6>
                                    <h3 className="mb-0">12</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-file-alt text-success`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-info', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-info mb-1">NGƯỜI DÙNG</h6>
                                    <h3 className="mb-0">543</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-users text-info`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className={`${cx('card-stat', 'card-stat-warning', 'card')} card `}>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-warning mb-1">BÀI THI HOÀN THÀNH</h6>
                                    <h3 className="mb-0">1,204</h3>
                                </div>
                                <div>
                                    <i className={`${cx('card-stat-icon')} fas fa-clipboard-check text-warning`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
