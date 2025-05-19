import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/client/Home/Home.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import HeaderOnly from './layouts/HeaderOnly.jsx';
import Blog from './pages/client/Blog';
import Login from './pages/admin/Login';
import AdminPrivateRoute from '@/routes/AdminPrivateRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import QuestionBank from './pages/admin/QuestionBank';
import Exam from './pages/admin/Exam';
import Setting from './pages/admin/Setting';
import User from './pages/admin/User';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Main Layout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                    </Route>

                    {/* Trang đăng nhập admin */}
                    <Route path="/admin" element={<Login />} />

                    {/* Các trang sau khi đăng nhập */}
                    <Route path="/admin" element={<AdminPrivateRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/exam" element={<Exam />} />
                            <Route path="/admin/question-bank" element={<QuestionBank />} />
                            <Route path="/admin/user" element={<User />} />
                            <Route path="/admin/setting" element={<Setting />} />
                        </Route>
                    </Route>

                    {/* HeaderOnly */}
                    {/* <Route element={<HeaderOnly />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
