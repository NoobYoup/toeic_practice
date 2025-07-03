import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetailResult } from '@/services/resultService.jsx';

import styles from './ResultTest.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ResultTest() {
    const { id } = useParams();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchResult = async () => {
        setLoading(true);
        try {
            const res = await getDetailResult(id);
            console.log(res.data);
            setResult(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchResult();
    }, [id]);

    return (
        <>
            <div className="container-fluid min-vh-100 p-0">
                {loading ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : (
                    <>
                        <header className={`${cx('results-header')}`}>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h1>
                                            <i className="fas fa-chart-line me-3"></i>Kết Quả Bài Thi TOEIC #12
                                        </h1>
                                        <p className="lead mb-0">Hoàn thành vào: 15/07/2024 - 14:30</p>
                                    </div>
                                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                        <button className="btn btn-light btn-lg me-2" onClick={() => window.print()}>
                                            <i className="fas fa-print me-2"></i>In kết quả
                                        </button>
                                        <button className="btn btn-outline-light btn-lg">
                                            <i className="fas fa-share me-2"></i>Chia sẻ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="row g-4 px-3">
                            <div className="col-lg-9">
                                <button className={`${cx('part-label')} mb-3 me-2 border-0`}>Part 1</button>
                                <div className={`${cx('results-container')} p-4`}>
                                    <h6>Câu 1:</h6>
                                    <div className="mb-4 text-center">
                                        <img
                                            src="/images/logo_black.png"
                                            alt="Question 1 Image"
                                            className="img-fluid rounded"
                                        />
                                    </div>

                                    <div className={`${cx('question-section')}`}>
                                        <h5 className={`${cx('question-text')}`}>
                                            1. Look at the picture and listen to the four statements. Choose the
                                            statement that best describes what you see in the picture.
                                        </h5>

                                        <div className={`${cx('answer-options')}`}>
                                            <div className={`${cx('answer-option', 'user-incorrect')} `}>
                                                <strong>A.</strong> The woman is reading a book in the library.
                                                <span class="badge bg-danger ms-2">Bạn chọn</span>
                                            </div>
                                            <div className={`${cx('answer-option', 'correct')}`}>
                                                <strong>B.</strong> The woman is working on her laptop at a desk.
                                                <span class="badge bg-success ms-2">Đáp án đúng</span>
                                            </div>
                                            <div className={`${cx('answer-option')}`}>
                                                <strong>C.</strong> The woman is talking on the phone.
                                            </div>
                                            <div className={`${cx('answer-option')}`}>
                                                <strong>D.</strong> The woman is writing in a notebook.
                                            </div>
                                        </div>

                                        <div className={`${cx('explanation-box')}`}>
                                            <h6>
                                                <i className="fas fa-lightbulb me-2"></i>Giải thích
                                            </h6>
                                            <p className="mb-0">
                                                Trong hình ảnh, chúng ta có thể thấy một người phụ nữ đang ngồi tại bàn
                                                làm việc và sử dụng laptop. Đây là mô tả chính xác nhất về những gì đang
                                                diễn ra trong bức ảnh. Các lựa chọn khác không phù hợp với nội dung hình
                                                ảnh.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={`${cx('score-card')}`}>
                                    <div className={`${cx('score-number')}`}>785</div>
                                    <h4>Tổng điểm TOEIC</h4>
                                    <div className="row text-center mt-3">
                                        <div className="col-6">
                                            <div className="h5 mb-1">420</div>
                                            <small>Listening</small>
                                        </div>
                                        <div className="col-6">
                                            <div className="h5 mb-1">365</div>
                                            <small>Reading</small>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${cx('section-score')}`}>
                                    <h5 className="mb-3">
                                        <i className="fas fa-chart-pie me-2"></i>Tổng quan kết quả
                                    </h5>
                                    <div className="row text-center mb-3">
                                        <div className="col-4">
                                            <div className="h4 text-success">158</div>
                                            <small className="text-muted">Đúng</small>
                                        </div>
                                        <div className="col-4">
                                            <div className="h4 text-danger">35</div>
                                            <small className="text-muted">Sai</small>
                                        </div>
                                        <div className="col-4">
                                            <div className="h4 text-secondary">7</div>
                                            <small className="text-muted">Bỏ trống</small>
                                        </div>
                                    </div>
                                    {/* <div className="progress mb-2">
                                        <div className="progress-bar bg-success">79%</div>
                                        <div className="progress-bar bg-danger">17.5%</div>
                                        <div className="progress-bar bg-secondary">3.5%</div>
                                    </div>
                                    <small className="text-muted">Tỷ lệ chính xác: 79%</small> */}
                                </div>
                                <div className={`${cx('section-score')}`}>
                                    <h5 className="mb-3">
                                        <i className="fas fa-headphones me-2"></i>Listening Section
                                    </h5>
                                    <div className="row mb-2">
                                        <div className="col">Part 1:</div>
                                        <div className="col-auto">
                                            <span className="badge bg-success">5/6</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">Part 2:</div>
                                        <div className="col-auto">
                                            <span className="badge bg-success">22/25</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">Part 3:</div>
                                        <div className="col-auto">
                                            <span className="badge bg-warning">30/39</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Part 4:</div>
                                        <div className="col-auto">
                                            <span className="badge bg-success">26/30</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${cx('section-score')}`}>
                                    <h5 className="mb-3">
                                        <i className="fas fa-book-open me-2"></i>Reading Section
                                    </h5>
                                    <div className="row mb-2">
                                        <div class="col">Part 5:</div>
                                        <div class="col-auto">
                                            <span className="badge bg-success">25/30</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">Part 6:</div>
                                        <div className="col-auto">
                                            <span className="badge bg-warning">12/16</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Part 7:</div>
                                        <div className="col-auto">
                                            <span className="badge bg-danger">38/54</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${cx('legend')}`}>
                                    <h6 className="mb-3">Chú thích</h6>
                                    <div className={`${cx('legend-item')}`}>
                                        <div className={`${cx('legend-color')} bg-success`}></div>
                                        <small>Câu trả lời đúng</small>
                                    </div>
                                    <div className={`${cx('legend-item')}`}>
                                        <div className={`${cx('legend-color')} bg-danger`}></div>
                                        <small>Câu trả lời sai</small>
                                    </div>
                                    <div className={`${cx('legend-item')}`}>
                                        <div className={`${cx('legend-color')} bg-secondary`}></div>
                                        <small>Câu bỏ trống</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ResultTest;
