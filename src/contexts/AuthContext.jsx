import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getProfile } from '@/services/userService';
import { login as loginService, loginGoogle as loginGoogleService } from '@/services/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Kiểm tra token và lấy thông tin user
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem('user_token');

        if (!token) {
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        try {
            // Kiểm tra token có hợp lệ không
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                // Token hết hạn
                localStorage.removeItem('user_token');
                localStorage.removeItem('user_profile');
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            // Lưu token vào state
            setUserToken(decoded);
            console.log(decoded);

            // Lấy thông tin user từ API
            const res = await getProfile(token);
            const userData = res.data.data;

            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user_profile', JSON.stringify(userData));
        } catch (error) {
            console.error('Auth check failed:', error);
            // Xóa token không hợp lệ
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_profile');
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Login function
    const login = useCallback(async (credentials) => {
        try {
            const res = await loginService(credentials);

            if (res.data.is_admin === true) {
                throw new Error('Bạn không có quyền truy cập tại đây');
            }

            const token = res.data.token;
            localStorage.setItem('user_token', token);

            // Lấy thông tin user
            const userRes = await getProfile(token);
            const userData = userRes.data.data;

            setUser(userData);
            setIsAuthenticated(true);
            setUserToken(jwtDecode(token));
            localStorage.setItem('user_profile', JSON.stringify(userData));

            return userData;
        } catch (error) {
            toast.error(error.message || 'Đăng nhập thất bại');
            throw error;
        }
    }, []);

    // Google login function
    const loginGoogle = useCallback(async (credentialResponse) => {
        try {
            const res = await loginGoogleService(credentialResponse.credential);

            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem('user_token', token);

                // Lấy thông tin user
                const userRes = await getProfile(token);
                const userData = userRes.data.data;

                setUser(userData);
                setIsAuthenticated(true);
                setUserToken(jwtDecode(token));
                localStorage.setItem('user_profile', JSON.stringify(userData));

                return userData;
            }
        } catch (error) {
            console.error('Google login failed:', error);
            toast.error('Đăng nhập Google thất bại');
            throw error;
        }
    }, []);

    // Logout function
    const logout = useCallback(() => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_profile');
        setUser(null);
        setIsAuthenticated(false);
        setUserToken(null);
    }, []);

    // Update user profile
    const updateProfile = useCallback(
        (newProfileData) => {
            setUser((prev) => ({
                ...prev,
                ...newProfileData,
            }));
            localStorage.setItem(
                'user_profile',
                JSON.stringify({
                    ...user,
                    ...newProfileData,
                }),
            );
        },
        [user],
    );

    // Kiểm tra auth khi component mount
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value = {
        user,
        userToken,
        isAuthenticated,
        loading,
        login,
        loginGoogle,
        logout,
        updateProfile,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
