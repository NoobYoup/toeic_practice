import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainLayout from './layouts/MainLayout.jsx';

import Home from './pages/client/Home/Home.jsx';
import Blog from './pages/client/Blog';
import Account from './pages/client/Account/Account.jsx';
import EditAccount from './pages/client/Account/EditAccount/EditAccount.jsx';
import Information from './pages/client/Account/EditAccount/Information.jsx';
import Security from './pages/client/Account/EditAccount/Security.jsx';
import Dictionary from './pages/client/Dictionary';
import Grammar from './pages/client/Grammar';
import Test from './pages/client/Test';
import Course from './pages/client/Course/Course.jsx';
import History from './pages/client/History/History.jsx';
import SettingUser from './pages/client/History';

import Login from './pages/admin/Login';
import AdminPrivateRoute from '@/middlewares/AdminPrivateRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

import Setting from './pages/admin/Setting';
import User from './pages/admin/User';
import EditUser from './pages/admin/User/Component/EditUser.jsx';
import DetailUser from './pages/admin/User/Component/DetailUser.jsx';
import Dashboard from './pages/admin/Dashboard/Dashboard.jsx';
import Permission from './pages/admin/Permission/Permission.jsx';
import TestAdmin from './pages/admin/Test/Test.jsx';
import Exam from './pages/admin/Test/Exam/Exam.jsx';
import CreateExam from './pages/admin/Test/Exam/Component/CreateExam.jsx';
import EditExam from './pages/admin/Test/Exam/Component/EditExam.jsx';
import Question from './pages/admin/Test/Question/Question.jsx';
import CreateQuestionBank from './pages/admin/Test/Question/Component/CreateQuestionBank.jsx';
import EditQuestionBank from './pages/admin/Test/Question/Component/EditQuestionBank.jsx';
import DetailQuestionBank from './pages/admin/Test/Question/Component/DetailQuestionBank.jsx';
import Paragraph from './pages/admin/Test/Paragraph/Paragraph.jsx';
import CreateParagraph from './pages/admin/Test/Paragraph/Component/CreateParagraph.jsx';
import EditParagraph from './pages/admin/Test/Paragraph/Component/EditParagraph.jsx';
import DetailParagraph from './pages/admin/Test/Paragraph/Component/DetailParagraph.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Client Routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/grammar" element={<Grammar />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/course" element={<Course />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/setting" element={<SettingUser />} />

                        <Route path="/my-account" element={<Account />} />

                        <Route path="/my-account/edit" element={<EditAccount />}>
                            <Route path="/my-account/edit/information" element={<Information />} />
                            <Route path="/my-account/edit/security" element={<Security />} />
                            <Route index element={<Navigate to="/my-account/edit/information" replace />} />
                        </Route>
                    </Route>

                    {/* Admin Login Public */}
                    <Route path="/admin" element={<Login />} />

                    {/* Admin Protected Routes */}
                    <Route path="/admin" element={<AdminPrivateRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/dashboard" element={<Dashboard />} />
                            <Route path="/admin/setting" element={<Setting />} />
                            <Route path="/admin/permission" element={<Permission />} />

                            <Route path="/admin/test" element={<TestAdmin />}>
                                <Route path="exam" element={<Exam />} />
                                <Route path="exam/create-exam" element={<CreateExam />} />
                                <Route path="exam/edit-exam" element={<EditExam />} />

                                <Route path="question" element={<Question />} />
                                <Route path="question/create-question" element={<CreateQuestionBank />} />
                                <Route path="question/edit-question/:id" element={<EditQuestionBank />} />
                                <Route path="question/detail-question/:id" element={<DetailQuestionBank />} />

                                <Route path="paragraph" element={<Paragraph />} />
                                <Route path="paragraph/create" element={<CreateParagraph />} />
                                <Route path="paragraph/edit/:id" element={<EditParagraph />} />
                                <Route path="paragraph/detail/:id" element={<DetailParagraph />} />

                                <Route index element={<Navigate to="exam" replace />} />
                            </Route>

                            <Route path="/admin/user" element={<User />} />
                            <Route path="/admin/user/edit-user/:id" element={<EditUser />} />
                            <Route path="/admin/user/detail-user/:id" element={<DetailUser />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />
        </>
    );
}

export default App;
