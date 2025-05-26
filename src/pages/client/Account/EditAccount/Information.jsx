import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';

const cx = classNames.bind(styles);

function Information() {
    return (
        <>
            <div class={`${cx('edit-section')} shadow`}>
                <h4 class="section-title mb-4">Ảnh đại diện</h4>
                <div class="row align-items-center">
                    <div class="col-md-3 text-center">
                        <div class={cx('avatar-upload')}>
                            <img
                                src="/images/logo_black.png"
                                alt="Profile Picture"
                                class={cx('avatar-preview')}
                                id="avatarPreview"
                            />
                            <input type="file" id="avatarInput" accept="image/*" className="d-none" />
                        </div>
                    </div>
                    <div class="col-md-9">
                        <h6>Thay đổi ảnh đại diện</h6>
                        <p class="text-muted mb-3">
                            Chọn ảnh có kích thước tối thiểu 200x200px. Định dạng: JPG, PNG, GIF.
                        </p>
                        <label htmlFor="avatarInput" class="btn btn-outline-primary me-2">
                            <i class="fas fa-upload me-2"></i>Tải ảnh lên
                        </label>
                    </div>
                </div>
            </div>

            <div class={`${cx('edit-section')} shadow`}>
                <h4 class="section-title mb-4">Thông tin cơ bản</h4>
                <form>
                    <div class="row">
                        <div class="col-md-6 form-group mb-4">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="id" value="1" readOnly disabled required />
                                <label for="id">ID *</label>
                            </div>
                        </div>
                        <div class="col-md-6 form-group mb-4">
                            <div class="form-floating">
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    value="nguyenvana@email.com"
                                    readOnly
                                    disabled
                                    required
                                />
                                <label for="email">Email *</label>
                            </div>
                        </div>
                        <div class="col-md-6 form-group mb-4">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="fullName" value="Nguyễn Văn A" required />
                                <label for="fullName">Họ và tên *</label>
                            </div>
                        </div>
                        <div class="col-md-6 form-group mb-4">
                            <div class="form-floating">
                                <input type="tel" class="form-control" id="phone" value="0987654321" />
                                <label for="phone">Số điện thoại</label>
                            </div>
                        </div>
                        <div class="col-md-6 form-group mb-4">
                            <div class="form-floating">
                                <input type="date" class="form-control" id="birthDate" value="1995-05-15" />
                                <label for="birthDate">Ngày sinh</label>
                            </div>
                        </div>
                        <div class="col-md-6 form-group mb-4">
                            <div class="form-floating">
                                <input type="text" class="form-control" value="Bến Phú Lâm" required />
                                <label for="fullName">Địa chỉ</label>
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <div class="form-floating">
                                <textarea class="form-control">
                                    Tôi là một sinh viên đam mê học tiếng Anh và muốn đạt điểm TOEIC cao.
                                </textarea>

                                <label for="fullName">Giới thiệu</label>
                            </div>
                        </div>
                    </div>
                    <div class="edit-section">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <button type="button" class="btn btn-primary  me-3" id="saveChanges">
                                    <i class="fas fa-save me-2"></i>Lưu thay đổi
                                </button>
                                <Link to="/my-account" class="btn btn-outline-secondary ">
                                    <i class="fas fa-times me-2"></i>Hủy bỏ
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Information;
