import { Outlet } from 'react-router-dom';
import Header from '@/components/client/Header';

function HeaderOnly() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default HeaderOnly;
