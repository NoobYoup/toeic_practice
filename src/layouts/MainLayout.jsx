import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Header from '@/components/client/Header';
import Footer from '@/components/client/Footer';
import BackToTop from '@/components/Button/BackToTop';

function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        const msg = location.state?.toastMsg;
        if (msg) {
            toast.warn(msg, { toastId: msg });
        }
    }, [location.state]);

    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
            <BackToTop />
        </>
    );
}

export default MainLayout;
