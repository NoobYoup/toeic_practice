import styles from './Permission.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Permission() {
    return (
        <div className="col-12">
            <h1>Phân quyền</h1>
            <div className={`${cx('card')} card shadow bg-white`}>
                <div className="row" style={{ padding: '0 12px' }}>
                    <div className="card-header d-flex mb-3">
                        <div className="col-md-4"></div>

                        <div className="col-md-4 text-center">
                            <h4>Quản trị viên</h4>
                        </div>

                        <div className="col-md-4 text-center">
                            <h4>Giảng viên</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className={`${cx('permission-group')}`}>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Xem danh sách</strong>
                                        <br />
                                        <small className="text-muted">Xem danh sách người dùng</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Tạo người dùng</strong>
                                        <br />
                                        <small className="text-muted">Thêm người dùng mới</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Chỉnh sửa</strong>
                                        <br />
                                        <small className="text-muted">Sửa thông tin người dùng</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Xóa người dùng</strong>
                                        <br />
                                        <small className="text-muted">Xóa người dùng khỏi hệ thống</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
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
                    <div className={`${cx('permission-group')}`}>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Xem đề thi</strong>
                                        <br />
                                        <small className="text-muted">Xem danh sách đề thi</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Tạo đề thi</strong>
                                        <br />
                                        <small className="text-muted">Thêm đề thi mới</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Chỉnh sửa</strong>
                                        <br />
                                        <small className="text-muted">Sửa nội dung đề thi</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Xóa đề thi</strong>
                                        <br />
                                        <small className="text-muted">Xóa đề thi khỏi hệ thống</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
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
                    <div className={`${cx('permission-group')}`}>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Cài đặt hệ thống</strong>
                                        <br />
                                        <small className="text-muted">Thay đổi cấu hình hệ thống</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Xem báo cáo</strong>
                                        <br />
                                        <small className="text-muted">Truy cập các báo cáo hệ thống</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Quản lý phân quyền</strong>
                                        <br />
                                        <small className="text-muted">Thay đổi quyền hạn người dùng</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('permission-item')}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Backup & Restore</strong>
                                        <br />
                                        <small className="text-muted">Sao lưu và khôi phục dữ liệu</small>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input permission-switch"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center">
                                    <div className="form-check form-switch ">
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

                    <div className="text-end mt-4">
                        <button className="btn btn-success">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Permission;
