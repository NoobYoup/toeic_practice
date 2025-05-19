import { Navigate, Outlet } from 'react-router-dom';

function AdminPrivateRoute() {
    const isLoggedIn = !!localStorage.getItem('admin_token');
    return isLoggedIn ? <Outlet /> : <Navigate to="/admin" replace />;
}

export default AdminPrivateRoute;
