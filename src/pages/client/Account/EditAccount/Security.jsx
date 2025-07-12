import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';

const cx = classNames.bind(styles);

function Security() {
    return (
        <>
            <div className="min-vh-100">
                <div class={`${cx('edit-section')} shadow`}>
                    <h4 class="section-title mb-4">Thay đổi mật khẩu</h4>
                    <form id="securityForm">
                        <div class="row">
                            <div class="col-md-6 form-group mb-4">
                                <div class="form-floating position-relative">
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="currentPassword"
                                        placeholder="Mật khẩu hiện tại"
                                    />
                                    <label for="currentPassword">Mật khẩu hiện tại *</label>
                                </div>
                            </div>
                            <div class="col-md-6"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 form-group mb-4">
                                <div class="form-floating position-relative">
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="newPassword"
                                        placeholder="Mật khẩu mới"
                                    />
                                    <label for="newPassword">Mật khẩu mới</label>
                                </div>
                                <div class="form-text">
                                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                                </div>
                            </div>
                            <div class="col-md-6 form-group mb-4">
                                <div class="form-floating position-relative">
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="confirmPassword"
                                        placeholder="Xác nhận mật khẩu mới"
                                    />
                                    <label for="confirmPassword">Xác nhận mật khẩu mới</label>
                                </div>
                            </div>
                        </div>
                        <div class="edit-section">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <button type="button" class="btn btn-primary  me-3" id="saveChanges">
                                        <i class="fas fa-save me-2"></i>Lưu thay đổi
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary ">
                                        <i class="fas fa-times me-2"></i>Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Security;
