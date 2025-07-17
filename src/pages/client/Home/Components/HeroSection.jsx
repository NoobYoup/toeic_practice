import { Link } from 'react-router-dom';
import { DEFAULT_BACKGROUND } from '@/constants/default';
import './HeroSection.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntranceExamModal from '@/components/client/Modal/EntranceExamModal';
import Login from '@/components/client/Modal/Login';
import Register from '@/components/client/Modal/Register';
import ForgotPassword from '@/components/client/Modal/ForgotPassword';
import { getDetailEntryExam } from '@/services/examService';
import { toast } from 'react-toastify';

function HeroSection() {
    const [showExamModal, setShowExamModal] = useState(false);
    const navigate = useNavigate();
    const [currentModal, setCurrentModal] = useState(null);

    const [loadingExam, setLoadingExam] = useState(false);
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('user_token'));

    const [entryExam, setEntryExam] = useState(null);

    const handleShowExamModal = async () => {
        if (!isLogin) {
            setCurrentModal('login');
        } else {
            setLoadingExam(true);
            try {
                const res = await getDetailEntryExam();
                setEntryExam(res.data.data);
                setShowExamModal(true);
            } catch (err) {
                toast.error(err?.response?.data?.message);
            }
            setLoadingExam(false);
        }
    };

    const handleStartExam = async () => {
        setShowExamModal(false);
        navigate(`/test/${entryExam.id_bai_thi}`, { state: { examId: entryExam.id_bai_thi } });

        // if (startRequested && isLogin && entryExam) {
        //     navigate(`/test/${entryExam.id_bai_thi}`, { state: { examId: entryExam.id_bai_thi } });
        //     setStartRequested(false); // gắn cờ
        // }
    };

    // useEffect(() => {
    //     if (startRequested && isLogin && entryExam) {
    //         navigate(`/test/${entryExam.id_bai_thi}`, { state: { examId: entryExam.id_bai_thi } });
    //         setStartRequested(false); // gắn cờ
    //     }
    // }, [startRequested, isLogin, entryExam, navigate]);

    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 hero-text">
                        <h1 className="mb-4">Chinh phục TOEIC cùng chúng tôi</h1>
                        <p className="lead mb-4">Hãy làm bài thi đầu vào để kiểm tra năng lực của bạn.</p>
                        <div className="d-flex flex-wrap">
                            <button
                                type="button"
                                className="btn btn-light btn-lg me-3 mb-3"
                                onClick={handleShowExamModal}
                                disabled={loadingExam}
                            >
                                {loadingExam && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Làm bài thi đầu vào
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-5 mt-lg-0 text-center">
                        <img
                            src={DEFAULT_BACKGROUND}
                            alt="TOEIC Test Preparation"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>

            <EntranceExamModal
                isOpen={showExamModal}
                onClose={() => setShowExamModal(false)}
                onStart={handleStartExam}
                loading={loadingExam}
                entryExam={entryExam}
            />

            {/* Auth Modals */}
            <Login
                key="login"
                isOpen={currentModal === 'login'}
                onSwitch={(modal) => setCurrentModal(modal)}
                onClose={() => setCurrentModal(null)}
                setIsLogin={setIsLogin}
            />

            <Register
                key="register"
                isOpen={currentModal === 'register'}
                onSwitch={(modal) => setCurrentModal(modal)}
                onClose={() => setCurrentModal(null)}
                setIsLogin={setIsLogin}
            />

            <ForgotPassword
                key="forgot"
                isOpen={currentModal === 'forgot'}
                onSwitch={(modal) => setCurrentModal(modal)}
                onClose={() => setCurrentModal(null)}
            />
        </section>
    );
}

export default HeroSection;
