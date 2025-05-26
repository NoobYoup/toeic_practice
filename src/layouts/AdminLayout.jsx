import Sidebar from '@/components/admin/Sidebar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0 sidebar">
                        <Sidebar />
                    </div>

                    <div className="col-md-10 content-wrapper p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
