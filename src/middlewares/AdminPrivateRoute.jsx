import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';

function AdminPrivateRoute() {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        const toastMsg = 'Bạn phải đăng nhập tài khoản quản trị để truy cập';
        // toast.warn(toastMsg);
        return <Navigate to="/admin" replace state={{ toastMsg }} />;
    }
    try {
        const { is_admin, exp } = jwtDecode(token);
        // Kiểm tra tài khoản admin và hạn token
        if (is_admin !== true) throw new Error('not admin');
        if (exp * 1000 < Date.now()) throw new Error('token expired');
        return <Outlet />;
    } catch {
        localStorage.removeItem('admin_token');
        const toastMsg = 'Phiên đăng nhập quản trị đã hết hạn hoặc không hợp lệ';
        // toast.warn(toastMsg);
        return <Navigate to="/admin" replace state={{ toastMsg }} />;
    }
}

export default AdminPrivateRoute;
