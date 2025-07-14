import { NavLink, Outlet } from 'react-router-dom';

function TabGrammar() {
    return (
        <div>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <NavLink to="grammar" className="nav-link">
                        <i className="fas fa-file-alt me-2"></i>Quản lý ngữ pháp
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="category-grammar" className="nav-link">
                        <i className="fas fa-question-circle me-2"></i>Quản lý danh mục ngữ pháp
                    </NavLink>
                </li>
            </ul>

            <Outlet />
        </div>
    );
}

export default TabGrammar;
