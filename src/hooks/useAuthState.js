import { useAuth } from '@/contexts/AuthContext';

export const useAuthState = () => {
    const auth = useAuth();

    return {
        ...auth,
        // Helper methods
        isLoggedIn: auth.isAuthenticated,
        userProfile: auth.user?.ho_so,
        userName: auth.user?.ho_so?.ho_ten,
        userAvatar: auth.user?.ho_so?.url_hinh_dai_dien,
        userEmail: auth.user?.email,
    };
};
