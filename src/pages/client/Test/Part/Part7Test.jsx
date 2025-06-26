import classNames from 'classnames/bind';
import styles from '../Test.module.scss';

const cx = classNames.bind(styles);

function Part7Test() {
    return (
        <>
            <div className={`${cx('test-container')} p-4 shadow my-4`}>
                <div className="row g-4">
                    <div className="col-lg-9 bg-light p-4 rounded-3">
                        <p className=' '>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                            of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                            a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
                            Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
                            word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
                            sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
                            Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
                            popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
                            amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since
                            the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de
                            Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
                            accompanied by English versions from the 1914 translation by H. Rackham.
                        </p>
                    </div>
                    <div className="col-lg-3">
                        <h5>Câu 1</h5>
                        <div className={cx('question-section', 'mt-3')}>
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
                        <h5>Câu 1</h5>
                        <div className={cx('question-section', 'mt-3')}>
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
                        <h5>Câu 1</h5>
                        <div className={cx('question-section', 'mt-3')}>
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
                        <h5>Câu 1</h5>
                        <div className={cx('question-section', 'mt-3')}>
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

export default Part7Test;