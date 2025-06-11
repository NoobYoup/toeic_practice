import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Sidebar.scss';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');

        navigate('/admin');
    };

    return (
        <>
            <div className="d-flex flex-column p-3">
                <h5 className="text-white mb-4">Admin Panel</h5>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <NavLink to="/admin/dashboard" className="nav-link">
                            {' '}
                            <i className="fas fa-tachometer-alt"></i> Tổng Quan{' '}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/test" className="nav-link">
                            {' '}
                            <i className="fas fa-file-alt"></i> Quản lý Đề Thi{' '}
                        </NavLink>
                    </li>
                    <li className="nav-item d-none">
                        <NavLink to="/admin/question-bank" className="nav-link">
                            <i className="fas fa-question-circle"></i> Ngân Hàng Câu Hỏi
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/user" className="nav-link">
                            {' '}
                            <i className="fas fa-users"></i> Quản lý Người Dùng{' '}
                        </NavLink>
                    </li>
                    <li className="nav-item d-none">
                        <NavLink to="/admin/paragraph" className="nav-link">
                            {' '}
                            <i className="fa-solid fa-paragraph"></i> Quản lý Đoạn Văn{' '}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/permission" className="nav-link">
                            {' '}
                            <i className="fas fa-shield-alt"></i> Phân quyền{' '}
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/admin/setting" className="nav-link">
                            {' '}
                            <i className="fas fa-cog"></i> Cài Đặt{' '}
                        </NavLink>
                    </li>
                </ul>
                <hr className="text-white-50" />
                <div className="dropdown">
                    <a
                        href="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="/public/images/logo_black.png"
                            alt="Admin"
                            width="32"
                            height="32"
                            className="rounded-circle me-2"
                        />
                        <strong>Admin</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li>
                            <a className="dropdown-item" href="#">
                                Hồ sơ
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Cài đặt
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" onClick={handleLogout}>
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
