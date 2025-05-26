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

    const token = localStorage.getItem('user_token');

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getProfile(token);

            setProfile(res.data.data);
        };

        fetchUser();
    }, [token]);
    return (
        <>
            {profile ? (
                <section className={cx('profile-header')}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={profile && profile.url_hinh_dai_dien}
                                        alt="Profile Picture"
                                        className={`${cx('profile-avatar')} me-4`}
                                    />
                                    <div>
                                        <h1 className="mb-2">{profile && profile.ho_ten}</h1>
                                        <p className="mb-2">
                                            <i className="fas fa-envelope me-2"></i>
                                            {profile && profile.NguoiDung.email}
                                        </p>
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fas fa-calendar-alt me-2"></i>
                                            <span>
                                                {format(
                                                    new Date(profile && profile.thoi_gian_tao),
                                                    'dd/MM/yyyy HH:mm',
                                                    {
                                                        locale: vi,
                                                    },
                                                )}
                                            </span>

                                            <span className={`${cx('level-badge', 'level-intermediate')} ms-3`}>
                                                Trung cấp
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-trophy me-2"></i>
                                            <span>
                                                Điểm TOEIC cao nhất: <strong>785</strong>
                                            </span>
                                        </div>
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
            ) : null}

            <Dashboard />
        </>
    );
}

export default Account;
