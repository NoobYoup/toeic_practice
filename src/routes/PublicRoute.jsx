import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
    const token = localStorage.getItem('user_token');
    return token ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
