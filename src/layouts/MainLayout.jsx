import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Header from '@/components/client/Header';
import Footer from '@/components/client/Footer';

function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        const msg = location.state?.toastMsg;
        if (msg) {
            toast.warn(msg);
        }
    }, [location.state]);

    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default MainLayout;
