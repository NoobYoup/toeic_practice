import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.scss';
import BackToTop from '@/components/Button/BackToTop';

function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <>
            <nav className="navbar navbar-light bg-white border-bottom px-3 sticky-top d-lg-none">
                <Link to="/admin/dashboard" className="navbar-brand text-primary fw-bold m-0">
                    <i className="fa-solid fa-graduation-cap me-2"></i>TOEIC Master
                </Link>

                <div className="d-flex align-items-center">
                    <button className="btn btn-lg bg-transparent border-0" onClick={toggleSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </nav>

            {/* Overlay for small screens */}
            {isSidebarOpen && <div className="overlay d-lg-none" onClick={closeSidebar}></div>}

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar - hidden below 992px */}
                    <div className={`col-8 col-lg-2 p-0 sidebar ${isSidebarOpen ? 'open' : ''}`}>
                        <Sidebar />
                    </div>

                    {/* Content takes full width below 992px */}
                    <div className="col-12 col-lg-10 content-wrapper p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
            <BackToTop />
        </>
    );
}

export default AdminLayout;
