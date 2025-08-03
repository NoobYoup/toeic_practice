import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function CongratulationModal({ isOpen, onClose, totalScore, readingScore, listeningScore }) {
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal d-block"
                    key="congratulation-modal"
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
                        transition={{ duration: 0.2 }}
                    >
                        <div className="modal-content border-0 p-4" ref={modalRef}>
                            <button type="button" className="btn-close ms-auto" onClick={onClose}></button>
                            <h2 className=" text-center fw-bold mb-3" style={{ color: '#2563eb' }}>
                                Chúc mừng bạn đã hoàn thành bài thi đầu vào
                            </h2>

                            <h2 className="text-center mb-3">Tổng điểm: {totalScore}</h2>
                            <div className="d-flex justify-content-around">
                                <p className="fs-5 text-muted text-center mb-4">Reading: {readingScore}</p>
                                <p className="fs-5 text-muted text-center mb-4">Listening: {listeningScore}</p>
                            </div>

                            <div className="d-grid gap-2 col-6 mx-auto">
                                <Link to="/list-test" className="btn btn-primary btn-lg">
                                    Xem đề thi gợi ý
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default CongratulationModal;
