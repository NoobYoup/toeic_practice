import { NavLink, Outlet } from 'react-router-dom';

function EditAccount() {
    return (
        <>
            <div className="container mt-4">
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <NavLink to="information" className="nav-link">
                            <i className="fas fa-file-alt me-2"></i>Thông tin cơ bản
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="security" className="nav-link">
                            <i className="fas fa-question-circle me-2"></i>Thay đổi mật khẩu
                        </NavLink>
                    </li>
                </ul>

                <Outlet />
            </div>
        </>
    );
}

export default EditAccount;
