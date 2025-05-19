import Sidebar from '@/components/admin/Sidebar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-10 content-wrapper p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
