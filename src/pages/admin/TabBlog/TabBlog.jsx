import { NavLink, Outlet } from 'react-router-dom';

function TabBlog() {
    return (
        <div>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <NavLink to="blog" className="nav-link">
                        <i className="fas fa-file-alt me-2"></i>Quản lý bài viết
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="category-blog" className="nav-link">
                        <i className="fas fa-question-circle me-2"></i>Quản lý danh mục
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="approve-blog" className="nav-link">
                        <i className="fas fa-question-circle me-2"></i>Duyệt bài viết
                    </NavLink>
                </li>
            </ul>

            <Outlet />
        </div>
    );
}

export default TabBlog;
