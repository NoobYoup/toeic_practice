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
        const { vai_tro, exp } = jwtDecode(token);
        // Kiểm tra vai trò và hạn token
        if (vai_tro !== 'quan_tri_vien') throw new Error('not admin');
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
