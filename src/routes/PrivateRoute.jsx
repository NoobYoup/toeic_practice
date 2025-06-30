import { Navigate, Outlet } from 'react-router-dom';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';

function PrivateRoute() {
    const token = localStorage.getItem('user_token');
    if (!token) {
        const toastMsg = 'Bạn phải đăng nhập để truy cập được';
        // toast.warn(toastMsg);
        return <Navigate to="/" replace state={{ toastMsg }} />;
    }
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp && dayjs.unix(decoded.exp).isBefore(dayjs())) {
            throw new Error('Token expired');
        }
        return <Outlet />;
    } catch {
        localStorage.removeItem('user_token');
        const toastMsg = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại';
        // toast.warn(toastMsg);
        return <Navigate to="/" replace state={{ toastMsg }} />;
    }
}

export default PrivateRoute;
