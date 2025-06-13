import { Outlet, NavLink } from 'react-router-dom';

function Test() {
    return (
        <>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <NavLink to="exam" className="nav-link">
                        <i className="fas fa-file-alt me-2"></i>Đề thi
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="question" className="nav-link">
                        <i className="fas fa-question-circle me-2"></i>Câu hỏi
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="paragraph" className="nav-link">
                        <i className="fas fa-question-circle me-2"></i>Đoạn văn
                    </NavLink>
                </li>
            </ul>

            <Outlet />
        </>
    );
}

export default Test;
