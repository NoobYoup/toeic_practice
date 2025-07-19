import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function PrivateRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        const toastMsg = 'Bạn phải đăng nhập để truy cập được';
        return <Navigate to="/" replace state={{ toastMsg }} />;
    }

    return <Outlet />;
}

export default PrivateRoute;
