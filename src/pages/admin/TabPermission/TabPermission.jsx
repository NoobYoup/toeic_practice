import { NavLink, Outlet } from 'react-router-dom';

function TabPermission() {
    return (
        <>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <NavLink to="role" className="nav-link">
                        <i className="fas fa-file-alt me-2"></i>Quản lý vai trò
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="role-permission" className="nav-link">
                        <i className="fas fa-question-circle me-2"></i>Quản lý quyền
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="modified" className="nav-link">
                        <i className="far fa-list-alt me-2"></i>Phân quyền
                    </NavLink>
                </li>
            </ul>

            <Outlet />
        </>
    );
}

export default TabPermission;
