import { NavLink, Outlet } from 'react-router-dom';

function EditAccount() {
    return (
        <>
            <div className="container mt-4">
                <ul class="nav nav-tabs mb-4">
                    <li class="nav-item">
                        <NavLink to="information" className="nav-link">
                            <i class="fas fa-file-alt me-2"></i>Thông tin cơ bản
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="security" className="nav-link">
                            <i class="fas fa-question-circle me-2"></i>Bảo mật
                        </NavLink>
                    </li>
                </ul>

                <Outlet />
            </div>
        </>
    );
}

export default EditAccount;
