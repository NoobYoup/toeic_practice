import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

function Dashboard({ user }) {
    return (
        <div className="container min-vh-100">
            <div className="row">
                <div className="col-md-8">
                    <h1>Tổng quan học tập</h1>
                </div>
                <div className="col-md-4">
                    <div className={`${cx('info-card')} mt-3`}>
                        <h5 className="mb-3">
                            <i className="fas fa-quote-left me-2"></i>Giới thiệu
                        </h5>

                        {user?.ho_so?.gioi_thieu || (
                            <div className={cx('empty-state')}>
                                <i className="fas fa-comment-slash"></i>
                                <p>Người dùng chưa thêm thông tin giới thiệu</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
