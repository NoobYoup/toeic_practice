import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminPrivateRoute() {
    const token = localStorage.getItem('admin_token');
    if (!token) return <Navigate to="/admin" replace />;
    try {
        const { vai_tro } = jwtDecode(token);
        if (vai_tro !== 'quan_tri_vien') throw new Error('not admin');
        return <Outlet />;
    } catch {
        localStorage.removeItem('admin_token');
        return <Navigate to="/admin" replace />;
    }
}

export default AdminPrivateRoute;
