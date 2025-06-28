import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function PrivateRoute() {
    const token = localStorage.getItem('user_token');
    if (!token) return <Navigate to="/" replace />;
    try {
        jwtDecode(token); // parse thử để chắc token hợp lệ
        return <Outlet />;
    } catch {
        localStorage.removeItem('user_token');
        return <Navigate to="/" replace />;
    }
}

export default PrivateRoute;
