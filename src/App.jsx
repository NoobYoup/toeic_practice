import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import QuestionBank from './pages/admin/QuestionBank';
import EditQuestionBank from './pages/admin/QuestionBank/Component/EditQuestionBank.jsx';
import CreateQuestionBank from './pages/admin/QuestionBank/Component/CreateQuestionBank.jsx';
import DetailQuestionBank from './pages/admin/QuestionBank/Component/DetailQuestionBank.jsx';
import Exam from './pages/admin/Exam';
import CreateExam from './pages/admin/Exam/Component/CreateExam.jsx';
import EditExam from './pages/admin/Exam/Component/EditExam.jsx';
import Setting from './pages/admin/Setting';
import User from './pages/admin/User';
import EditUser from './pages/admin/User/Component/EditUser.jsx';
import DetailUser from './pages/admin/User/Component/DetailUser.jsx';
import Dashboard from './pages/admin/Dashboard/Dashboard.jsx';
import Permission from './pages/admin/Permission/Permission.jsx';
import Paragraph from './pages/admin/Paragraph/Paragraph.jsx';
import CreateParagraph from './pages/admin/Paragraph/Component/CreateParagraph.jsx';
import EditParagraph from './pages/admin/Paragraph/Component/EditParagraph.jsx';
import DetailParagraph from './pages/admin/Paragraph/Component/DetailParagraph.jsx';

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

                            <Route path="/admin/paragraph" element={<Paragraph />} />
                            <Route path="/admin/paragraph/create-paragraph" element={<CreateParagraph />} />
                            <Route path="/admin/paragraph/edit-paragraph" element={<EditParagraph />} />
                            <Route path="/admin/paragraph/detail-paragraph" element={<DetailParagraph />} />

                            <Route path="/admin/question-bank" element={<QuestionBank />} />
                            <Route path="/admin/question-bank/edit-question" element={<EditQuestionBank />} />
                            <Route path="/admin/question-bank/create-question" element={<CreateQuestionBank />} />
                            <Route path="/admin/question-bank/detail-question/:id" element={<DetailQuestionBank />} />

                            <Route path="/admin/exam" element={<Exam />} />
                            <Route path="/admin/exam/create-exam" element={<CreateExam />} />
                            <Route path="/admin/exam/edit-exam" element={<EditExam />} />

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
