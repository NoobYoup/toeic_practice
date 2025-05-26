import './Permission.module.scss';
import styles from './Permission.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Permission() {
    return (
        <div className="col-12">
            <h1>Phân quyền</h1>
            <div className={`${cx('card')} shadow p-4 bg-white`}>
                <div className="card-body">
                    <div className={`${cx('permission-group')}`}>
                        <div className="d-flex align-items-center mb-3">
                            <div className={`${cx('permission-icon', 'icon-manage')} `}>
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0">Quản lý Người dùng</h6>
                                <small className="text-muted">Quyền thao tác với người dùng trong hệ thống</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Xem danh sách</strong>
                                            <br />
                                            <small className="text-muted">Xem danh sách người dùng</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Tạo người dùng</strong>
                                            <br />
                                            <small className="text-muted">Thêm người dùng mới</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Chỉnh sửa</strong>
                                            <br />
                                            <small className="text-muted">Sửa thông tin người dùng</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Xóa người dùng</strong>
                                            <br />
                                            <small className="text-muted">Xóa người dùng khỏi hệ thống</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${cx('permission-group')}`}>
                        <div className="d-flex align-items-center mb-3">
                            <div className={`${cx('permission-icon', 'icon-write')}`}>
                                <i className="fas fa-book"></i>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0">Quản lý Đề thi</h6>
                                <small className="text-muted">Quyền thao tác với đề thi và bài kiểm tra</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Xem đề thi</strong>
                                            <br />
                                            <small className="text-muted">Xem danh sách đề thi</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Tạo đề thi</strong>
                                            <br />
                                            <small className="text-muted">Tạo đề thi mới</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Chỉnh sửa đề thi</strong>
                                            <br />
                                            <small className="text-muted">Sửa nội dung đề thi</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Xóa đề thi</strong>
                                            <br />
                                            <small className="text-muted">Xóa đề thi khỏi hệ thống</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${cx('permission-group')}`}>
                        <div className="d-flex align-items-center mb-3">
                            <div className={`${cx('permission-icon', 'icon-admin')}`}>
                                <i className="fas fa-cogs"></i>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0">Quản trị Hệ thống</h6>
                                <small className="text-muted">Quyền cấu hình và quản trị hệ thống</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Cài đặt hệ thống</strong>
                                            <br />
                                            <small className="text-muted">Thay đổi cấu hình hệ thống</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Xem báo cáo</strong>
                                            <br />
                                            <small className="text-muted">Truy cập các báo cáo hệ thống</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Quản lý phân quyền</strong>
                                            <br />
                                            <small className="text-muted">Thay đổi quyền hạn người dùng</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={cx('permission-item')}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Backup & Restore</strong>
                                            <br />
                                            <small className="text-muted">Sao lưu và khôi phục dữ liệu</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input permission-switch"
                                                type="checkbox"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-end mt-4">
                        <button className="btn btn-success">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Permission;
