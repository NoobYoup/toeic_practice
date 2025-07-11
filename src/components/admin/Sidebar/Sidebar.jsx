import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { DEFAULT_AVATAR } from '@/constants/default';
import { toast } from 'react-toastify';
import './Sidebar.scss';

function Sidebar() {
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ token
    const token = localStorage.getItem('admin_token');
    let user = {};
    if (token) {
        user = jwtDecode(token);
    }

    const handleLogout = () => {
        if (user.is_admin === true) {
            const role = user.vai_tro || 'admin';
            const tokenKey = `${role}_token`;
            localStorage.removeItem(tokenKey, user.token);
            localStorage.removeItem('admin_token');

            toast.success('Đăng xuất thành công');
            navigate('/admin');
        } else {
            toast.error('Bạn không có quyền truy cập trang quản trị.');
        }
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
                    <li className="nav-item">
                        <NavLink to="/admin/result" className="nav-link">
                            {' '}
                            <i className="fa-solid fa-chart-line"></i> Kết quả bài làm{' '}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/tab-blog" className="nav-link">
                            {' '}
                            <i className="fa-solid fa-book"></i> Quản lý bài viết{' '}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/tab-permission" className="nav-link">
                            {' '}
                            <i className="fas fa-shield-alt"></i> Nhóm quyền{' '}
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
                            src={user?.avatar_url || DEFAULT_AVATAR}
                            alt={user?.email || 'Admin'}
                            width="32"
                            height="32"
                            className="rounded-circle me-2"
                        />
                        <strong>{user?.ho_ten || user?.email || 'Admin'}</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
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
