import { Link } from 'react-router-dom';
import { DEFAULT_BACKGROUND } from '@/constants/default';
import './HeroSection.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntranceExamModal from '@/components/client/Modal/EntranceExamModal';

function HeroSection() {
    const [showExamModal, setShowExamModal] = useState(false);
    const navigate = useNavigate();

    const handleStartExam = () => {
        setShowExamModal(false);
        navigate('/test');
    };

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
                                onClick={() => setShowExamModal(true)}
                            >
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
            />
        </section>
    );
}

export default HeroSection;
