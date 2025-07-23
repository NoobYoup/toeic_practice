import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getDetailUser, deleteUser } from '@/services/userService';
import classNames from 'classnames/bind';
import styles from './DetailUser.module.scss';

const cx = classNames.bind(styles);

function DetailUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await getDetailUser(id);

                setUser(res.data.data.user);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                    // Optionally redirect to login page
                    navigate('/admin');
                } else {
                    setError('Không thể tải thông tin người dùng');
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, [id]); // Re-run when ID changes

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            try {
                await deleteUser(id);
                navigate('/admin/user'); // Redirect to user list after deletion
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Không thể xóa tài khoản');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
                <p>Đang tải...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center text-danger">
                <p>{error}</p>
            </div>
        );
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className={`${cx('profile-header')} shadow-sm`}>
                    <div className={cx('status-badge')}>
                        <span className={`${cx('status-active')} badge px-3 py-2`}>
                            {user.nguoi_dung.trang_thai === 'hoat_dong'
                                ? 'Hoạt động'
                                : user.nguoi_dung.trang_thai === 'khong_hoat_dong'
                                ? 'Không hoạt động'
                                : 'Chưa xác nhận'}
                        </span>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-3 text-center">
                            <img
                                src={user.url_hinh_dai_dien || '/images/logo_black.png'}
                                alt="Avatar"
                                className={cx('profile-avatar')}
                            />
                        </div>
                        <div className="col-md-6">
                            <h2 className="mb-2">{user.ho_ten}</h2>
                            <p className="mb-2">
                                <i className="fas fa-user me-2"></i>ID: {user.id_nguoi_dung}
                            </p>
                            <p className="mb-2">
                                <i className="fas fa-at me-2"></i>
                                {user.nguoi_dung.email}
                            </p>
                            <p className="mb-2">
                                <i className="fas fa-id-badge me-2"></i>Tên đăng nhập: {user.nguoi_dung.ten_dang_nhap}
                            </p>
                            <p className="mb-2">
                                <i className="fa-solid fa-phone me-2"></i>Số điện thoại: {user.so_dien_thoai}
                            </p>
                            <p className="mb-2">
                                <i className="fa-solid fa-calendar-days me-2"></i>Ngày sinh:{' '}
                                {user.ngay_sinh || 'Chưa cập nhật'}
                            </p>
                            <p className="mb-2">
                                <i className="fa-solid fa-location-dot me-2"></i>Địa chỉ:{' '}
                                {user.dia_chi || 'Chưa cập nhật'}
                            </p>
                            <p className="mb-2">
                                <i className="fa-regular fa-clock me-2"></i>Tham gia từ:{' '}
                                {format(new Date(user.thoi_gian_tao), 'dd/MM/yyyy HH:mm', { locale: vi })}
                            </p>
                            <span className={`${cx('role-student')} badge px-3 py-2`}>
                                <i className="fas fa-graduation-cap me-1"></i>
                                {user.nguoi_dung?.id_vai_tro}
                            </span>
                        </div>
                        <div className="col-md-3 text-end">
                            <div className="stats-grid">
                                <div className="text-center">
                                    <div className={cx('stat-number')}>15</div>
                                    <div className={cx('stat-label')}>Bài thi</div>
                                </div>
                                <div className="text-center">
                                    <div className={cx('stat-number')}>500</div>
                                    <div className={cx('stat-label')}>Điểm cao nhất</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-8">
                <div className={cx('info-card')}>
                    <h5 className="mb-3">
                        <i className="fas fa-quote-left me-2"></i>Giới thiệu
                    </h5>

                    {user.gioi_thieu || (
                        <div className={cx('empty-state')}>
                            <i className="fas fa-comment-slash"></i>
                            <p>Người dùng chưa thêm thông tin giới thiệu</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-md-4">
                <div className={cx('action-buttons')}>
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title mb-3">Thao tác</h6>

                            <Link
                                className={`${cx('btn-action')} btn btn-primary w-100`}
                                to={`/admin/user/edit-user/${id}`}
                            >
                                <i className="fas fa-edit me-2"></i>Chỉnh sửa thông tin
                            </Link>

                            <button
                                className={`${cx('btn-action')} btn btn-outline-danger w-100`}
                                onClick={handleDelete}
                            >
                                <i className="fas fa-trash me-2"></i>Xóa tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailUser;
