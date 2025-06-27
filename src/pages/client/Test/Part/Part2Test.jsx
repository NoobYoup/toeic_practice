import classNames from 'classnames/bind';
import styles from '../Test.module.scss';

const cx = classNames.bind(styles);

function Part2Test() {
    return (
        <>
            <div className={`${cx('test-container')} p-4 shadow my-4`}>
                <h5>Câu 1</h5>

                <audio controls className={cx('audio-player')}>
                    <source src="question1.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                <div className={cx('question-section', 'mt-3')}>
                    <h6 className={cx('question-text')}>1. Look at the picture and listen to the four statements. Choose the statement that best describes what you see in the picture.</h6>

                    <div className={cx('answer-options')}>
                        <div className={`${cx('answer-option')} d-flex align-items-center`}>
                            <input type="radio" name="question1" id="q1-a" className="me-3" />
                            <label htmlFor="q1-a" className="flex-grow-1 mb-0">
                                A.
                            </label>
                        </div>
                        <div className={`${cx('answer-option')} d-flex align-items-center`}>
                            <input type="radio" name="question1" id="q1-b" className="me-3" />
                            <label htmlFor="q1-b" className="flex-grow-1 mb-0">
                                B.
                            </label>
                        </div>
                        <div className={`${cx('answer-option')} d-flex align-items-center`}>
                            <input type="radio" name="question1" id="q1-c" className="me-3" />
                            <label htmlFor="q1-c" className="flex-grow-1 mb-0">
                                C.
                            </label>
                        </div>
                        <div className={`${cx('answer-option')} d-flex align-items-center`}>
                            <input type="radio" name="question1" id="q1-d" className="me-3" />
                            <label htmlFor="q1-d" className="flex-grow-1 mb-0">
                                D.
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button className="btn btn-primary d-block ms-auto">
                    Câu tiếp theo<i className="fas fa-arrow-right ms-2"></i>
                </button>
            </div>
        </>
    );
}

export default Part2Test;