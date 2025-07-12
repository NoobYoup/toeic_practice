import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getProfile } from '@/services/userService.jsx';

import Dashboard from './Components/Dashboard';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';

const cx = classNames.bind(styles);

function Account() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('user_token');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const res = await getProfile(token);

            setProfile(res.data.data);
            setLoading(false);
        };

        fetchUser();
    }, [token]);
    return (
        <>
            {loading ? (
                <div className="mt-3 text-center min-vh-100 ">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                </div>
            ) : profile && profile.ho_so ? (
                <>
                    <section className={cx('profile-header')}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={profile.ho_so.url_hinh_dai_dien || '/images/logo_black.png'}
                                            alt="Profile Picture"
                                            className={`${cx('profile-avatar')} me-4`}
                                        />
                                        <div>
                                            <h1 className="mb-2">{profile.ho_so.ho_ten}</h1>
                                            <p className="mb-2">
                                                <i className="fas fa-envelope me-2"></i>
                                                {profile.email}
                                            </p>
                                            <div className="d-flex align-items-center mb-2">
                                                <i className="fas fa-calendar-alt me-2"></i>
                                                <span>{profile.ho_so.ngay_sinh}</span>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                <i className="fas fa-phone me-2"></i>
                                                <span>{profile.ho_so.so_dien_thoai}</span>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                <span>{profile.ho_so.dia_chi}</span>
                                            </div>
                                            {/* <div className="d-flex align-items-center">
                                                <i className="fas fa-trophy me-2"></i>
                                                <span>
                                                    Điểm TOEIC cao nhất: <strong>785</strong>
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                                    <Link className="btn btn-lg btn-outline-light" to="/my-account/edit">
                                        <i className="fas fa-edit me-2"></i>Chỉnh sửa thông tin
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Dashboard user={profile} />
                </>
            ) : (
                <>
                    <section className={cx('profile-header')}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="/images/logo_black.png"
                                            alt="Profile Picture"
                                            className={`${cx('profile-avatar')} me-4`}
                                        />

                                        <div>
                                            <h5 className="mb-2">Hãy cập nhật hồ sơ của bạn ngay !!</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                                    <Link className="btn btn-lg btn-outline-light" to="/my-account/edit">
                                        <i className="fas fa-edit me-2"></i>Chỉnh sửa thông tin
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Dashboard user={profile} />
                </>
            )}
        </>
    );
}

export default Account;
