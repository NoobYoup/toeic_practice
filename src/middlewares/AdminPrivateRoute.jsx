import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminPrivateRoute() {
    const token = localStorage.getItem('admin_token');

    try {
        const decoded = jwtDecode(token);
        // Optional: Check if the user is an admin
        if (decoded.vai_tro !== 'quan_tri_vien') {
            return <Navigate to="/admin" replace />;
        }
        return <Outlet />;
    } catch (err) {
        // Invalid token
        console.log(err);

        localStorage.removeItem('admin_token');
        return <Navigate to="/admin" replace />;
    }
}

export default AdminPrivateRoute;
