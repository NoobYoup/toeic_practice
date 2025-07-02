import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainLayout from './layouts/MainLayout.jsx';
import PrivateRoute from '@/routes/PrivateRoute.jsx';
import AdminPrivateRoute from '@/middlewares/AdminPrivateRoute.jsx';

import Home from './pages/client/Home/Home.jsx';
import Blog from './pages/client/Blog';
import DetailBlog from './pages/client/Blog/Component/DetailBlog.jsx';

import Account from './pages/client/Account/Account.jsx';
import EditAccount from './pages/client/Account/EditAccount/EditAccount.jsx';
import Information from './pages/client/Account/EditAccount/Information.jsx';
import Security from './pages/client/Account/EditAccount/Security.jsx';
import Dictionary from './pages/client/Dictionary';
import Grammar from './pages/client/Grammar';
import Test from './pages/client/Test';
import ListTest from './pages/client/Test/Component/ListTest.jsx';
import DetailTest from './pages/client/Test/Component/DetailTest.jsx';
import Course from './pages/client/Course/Course.jsx';
import History from './pages/client/History/History.jsx';
import Archive from './pages/client/Archive/Archive.jsx';
import SettingUser from './pages/client/Setting/Setting.jsx';

import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout.jsx';

import Setting from './pages/admin/Setting';
import Result from './pages/admin/Result/Result.jsx';
import BlogAdmin from './pages/admin/Blog/Blog.jsx';
import User from './pages/admin/User';
import EditUser from './pages/admin/User/Component/EditUser.jsx';
import DetailUser from './pages/admin/User/Component/DetailUser.jsx';
import Dashboard from './pages/admin/Dashboard/Dashboard.jsx';
import Permission from './pages/admin/Permission/Permission.jsx';
import TestAdmin from './pages/admin/Test/Test.jsx';
import Exam from './pages/admin/Test/Exam/Exam.jsx';
import CreateExam from './pages/admin/Test/Exam/Component/CreateExam.jsx';
import EditExam from './pages/admin/Test/Exam/Component/EditExam.jsx';
import DetailExam from './pages/admin/Test/Exam/Component/DetailExam.jsx';
import Part1Detail from './pages/admin/Test/Exam/Component/Part/Part1Detail.jsx';
import Part2Detail from './pages/admin/Test/Exam/Component/Part/Part2Detail.jsx';
import Part3Detail from './pages/admin/Test/Exam/Component/Part/Part3Detail.jsx';
import Part4Detail from './pages/admin/Test/Exam/Component/Part/Part4Detail.jsx';
import Part5Detail from './pages/admin/Test/Exam/Component/Part/Part5Detail.jsx';
import Part6Detail from './pages/admin/Test/Exam/Component/Part/Part6Detail.jsx';
import Part7Detail from './pages/admin/Test/Exam/Component/Part/Part7Detail.jsx';
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
                    {/* Public Client Routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/detail-blog" element={<DetailBlog />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/grammar" element={<Grammar />} />
                        <Route path="/list-test" element={<ListTest />} />
                        <Route path="/detail-test/:id" element={<DetailTest />} />
                        <Route path="/course" element={<Course />} />
                    </Route>

                    {/* Private Client Routes (yêu cầu user_token) */}
                    <Route element={<PrivateRoute />}>
                        <Route element={<MainLayout />}>
                            {/* Làm bài thi yêu cầu đăng nhập */}
                            <Route path="/test/:id" element={<Test />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/archive" element={<Archive />} />
                            <Route path="/setting" element={<SettingUser />} />

                            <Route path="/my-account" element={<Account />} />

                            <Route path="/my-account/edit" element={<EditAccount />}>
                                <Route path="information" element={<Information />} />
                                <Route path="security" element={<Security />} />
                                <Route index element={<Navigate to="information" replace />} />
                            </Route>
                        </Route>
                    </Route>

                    {/* Admin Login Public */}
                    <Route path="/admin" element={<Login />} />

                    <Route path="/admin" element={<AdminPrivateRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/dashboard" element={<Dashboard />} />
                            <Route path="/admin/setting" element={<Setting />} />
                            <Route path="/admin/permission" element={<Permission />} />

                            <Route path="/admin/test" element={<TestAdmin />}>
                                <Route path="exam" element={<Exam />} />
                                <Route path="exam/create-exam" element={<CreateExam />} />
                                <Route path="exam/edit-exam/:id" element={<EditExam />} />
                                <Route path="exam/detail-exam/:id" element={<DetailExam />}>
                                    <Route path="part1" element={<Part1Detail />} />
                                    <Route path="part2" element={<Part2Detail />} />
                                    <Route path="part3" element={<Part3Detail />} />
                                    <Route path="part4" element={<Part4Detail />} />
                                    <Route path="part5" element={<Part5Detail />} />
                                    <Route path="part6" element={<Part6Detail />} />
                                    <Route path="part7" element={<Part7Detail />} />
                                    <Route index element={<Navigate to="part1" replace />} />
                                </Route>

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

                            <Route path="/admin/result" element={<Result />} />
                            <Route path="/admin/blog" element={<BlogAdmin />} />
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
