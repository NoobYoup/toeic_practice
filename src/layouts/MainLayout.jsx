import { Outlet } from 'react-router-dom';

import Header from '@/components/client/Header';
import Footer from '@/components/client/Footer';

function MainLayout() {
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
