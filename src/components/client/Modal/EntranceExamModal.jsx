import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

function EntranceExamModal({ examInfo = {}, isOpen, onClose, onStart }) {
    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const {
        title = 'Đề thi đầu vào',
        description = 'Bài test đánh giá trình độ đầu vào của bạn trước khi bắt đầu luyện thi TOEIC.',
        totalQuestions = 120,
        totalTime = 120,
        listeningQuestions = 100,
        readingQuestions = 20,
    } = examInfo;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal d-block"
                    key="entrance-exam-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <motion.div
                        className="modal-dialog modal-lg"
                        role="document"
                        initial={{ y: '-30px', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-30px', opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="modal-content border-0 p-4" ref={modalRef}>
                            <button type="button" className="btn-close ms-auto" onClick={onClose}></button>
                            <h2 className="text-center mb-3">{title}</h2>
                            <p className="text-muted text-center mb-4">{description}</p>

                            <div className="row text-center mb-4">
                                <div className="col-6 col-md-3 mb-3">
                                    <h4 className="mb-0 fw-bold">{totalQuestions}</h4>
                                    <small className="text-uppercase">Câu hỏi</small>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                    <h4 className="mb-0 fw-bold">{listeningQuestions}</h4>
                                    <small className="text-uppercase">Listening</small>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                    <h4 className="mb-0 fw-bold">{readingQuestions}</h4>
                                    <small className="text-uppercase">Reading</small>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                    <h4 className="mb-0 fw-bold">{totalTime} phút</h4>
                                    <small className="text-uppercase">Thời gian</small>
                                </div>
                            </div>

                            <div className="alert alert-info text-center mb-4" role="alert">
                                Lưu ý: Bạn chỉ có thể làm bài 1 lần duy nhất. Hãy chắc chắn bạn đã sẵn sàng trước khi
                                bắt đầu.
                            </div>

                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-primary btn-lg" onClick={onStart}>
                                    Bắt đầu làm bài
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

EntranceExamModal.propTypes = {
    examInfo: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired,
};

export default EntranceExamModal;
