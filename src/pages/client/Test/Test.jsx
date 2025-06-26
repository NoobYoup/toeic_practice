import styles from './Test.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Part1Test from './Part/Part1Test.jsx';
import Part2Test from './Part/Part2Test.jsx';
import Part3Test from './Part/Part3Test.jsx';
import Part4Test from './Part/Part4Test.jsx';
import Part5Test from './Part/Part5Test.jsx';
import Part6Test from './Part/Part6Test.jsx';
import Part7Test from './Part/Part7Test.jsx';

const cx = classNames.bind(styles);

const partInfos = [
    { part: 1 },
    { part: 2 },
    { part: 3 },
    { part: 4 },
    { part: 5 },
    { part: 6 },
    { part: 7 },
];

function Test() {
    const [currentPart, setCurrentPart] = useState(1);

    const renderCurrentPart = () => {
        switch (currentPart) {
            case 1:
                return <Part1Test />;
            case 2:
                return <Part2Test />;
            case 3:
                return <Part3Test />;
            case 4:
                return <Part4Test />;
            case 5:
                return <Part5Test />;
            case 6:
                return <Part6Test />;
            case 7:
                return <Part7Test />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="container-fluid mb-5 main-content">
                {partInfos.map(({ part }) => (
                    <button
                        key={part}
                        className={cx('part-label', 'border-0', 'mt-3', 'me-2', { active: currentPart === part })}
                        onClick={() => setCurrentPart(part)}
                    >
                        {`PART ${part}`}
                    </button>
                ))}
                <div className="row g-4">
                    <div className="col-lg-9">
                        {renderCurrentPart()}
                    </div>

                    <div className="col-lg-3">
                        <div className="shadow p-4 my-4" style={{ borderRadius: '10px' }}>
                            <div className={`${cx('timer-container')} mb-4`}>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="mb-0">Thời gian còn lại</h5>
                                    
                                </div>
                                <div class={`${cx('timer')} text-center`}>1:59:45</div>
                                
                            </div>

                            <div class={`${cx('question-nav')} mb-4`}>
                                <h5 class="mb-3">Listening (100 câu)</h5>
                                <div class="mb-2">
                                    <strong>Part 1: Questions 1-6</strong>
                                </div>
                                <div class="mb-3">
                                    <span class={`${cx('question-number')} active`}>1</span>
                                    <span class={`${cx('question-number')}`}>2</span>
                                    <span class={`${cx('question-number')}`}>3</span>
                                    <span class={`${cx('question-number')}`}>4</span>
                                    <span class={`${cx('question-number')}`}>5</span>
                                    <span class={`${cx('question-number')}`}>6</span>
                                </div>

                                <div class="mb-2">
                                    <strong>Part 2: Questions 7-31</strong>
                                </div>
                                <div class="mb-3">
                                    <span class={`${cx('question-number')}`}>7</span>
                                    <span class={`${cx('question-number')}`}>8</span>
                                    <span class={`${cx('question-number')}`}>9</span>
                                    <span class={`${cx('question-number')}`}>10</span>
                                    <span class={`${cx('question-number')}`}>11</span>
                                    <span class={`${cx('question-number')}`}>12</span>
                                    <span class={`${cx('question-number')}`}>13</span>
                                    <span class={`${cx('question-number')}`}>14</span>
                                    <span class={`${cx('question-number')}`}>15</span>
                                    <span class={`${cx('question-number')}`}>16</span>
                                    <span class={`${cx('question-number')}`}>17</span>
                                    <span class={`${cx('question-number')}`}>18</span>
                                    <span class={`${cx('question-number')}`}>19</span>
                                    <span class={`${cx('question-number')}`}>20</span>
                                    <span class={`${cx('question-number')}`}>21</span>
                                    <span class={`${cx('question-number')}`}>22</span>
                                    <span class={`${cx('question-number')}`}>23</span>
                                    <span class={`${cx('question-number')}`}>24</span>
                                    <span class={`${cx('question-number')}`}>25</span>
                                    <span class={`${cx('question-number')}`}>26</span>
                                    <span class={`${cx('question-number')}`}>27</span>
                                    <span class={`${cx('question-number')}`}>28</span>
                                    <span class={`${cx('question-number')}`}>29</span>
                                    <span class={`${cx('question-number')}`}>30</span>
                                    <span class={`${cx('question-number')}`}>31</span>
                                </div>

                                <div class="mb-2">
                                    <strong>Part 3: Questions 32-70</strong>
                                </div>
                                <div class="mb-3">
                                    <span class={`${cx('question-number')}`}>32</span>
                                    <span class={`${cx('question-number')}`}>33</span>
                                    <span class={`${cx('question-number')}`}>34</span>
                                    <span class={`${cx('question-number')}`}>35</span>
                                    <span class={`${cx('question-number')}`}>36</span>
                                    <span class={`${cx('question-number')}`}>37</span>
                                    <span class={`${cx('question-number')}`}>38</span>
                                    <span class={`${cx('question-number')}`}>39</span>
                                    <span class={`${cx('question-number')}`}>40</span>
                                    <span class={`${cx('question-number')}`}>...</span>
                                </div>

                                <div class="mb-2">
                                    <strong>Part 4: Questions 71-100</strong>
                                </div>
                                <div class="mb-3">
                                    <span class={`${cx('question-number')}`}>71</span>
                                    <span class={`${cx('question-number')}`}>72</span>
                                    <span class={`${cx('question-number')}`}>73</span>
                                    <span class={`${cx('question-number')}`}>74</span>
                                    <span class={`${cx('question-number')}`}>75</span>
                                    <span class={`${cx('question-number')}`}>76</span>
                                </div>

                                <hr />

                                <h5 class="mb-3">Reading (100 câu)</h5>
                                <div class="mb-2">
                                    <strong>Part 5: Questions 101-130</strong>
                                </div>
                                <div class="mb-3">
                                    <span class={`${cx('question-number')}`}>101</span>
                                    <span class={`${cx('question-number')}`}>102</span>
                                    <span class={`${cx('question-number')}`}>103</span>
                                    <span class={`${cx('question-number')}`}>104</span>
                                    <span class={`${cx('question-number')}`}>105</span>
                                    <span class={`${cx('question-number')}`}>...</span>
                                </div>

                                <div class="mb-2">
                                    <strong>Part 6: Questions 131-146</strong>
                                </div>
                                <div class="mb-3">
                                    <span class={`${cx('question-number')}`}>131</span>
                                    <span class={`${cx('question-number')}`}>132</span>
                                    <span class={`${cx('question-number')}`}>133</span>
                                    <span class={`${cx('question-number')}`}>134</span>
                                    <span class={`${cx('question-number')}`}>135</span>
                                    <span class={`${cx('question-number')}`}>...</span>
                                </div>

                                <div class="mb-2">
                                    <strong>Part 7: Questions 147-200</strong>
                                </div>
                                <div class="mb-3">
                                    <span class={`${cx('question-number')}`}>147</span>
                                    <span class={`${cx('question-number')}`}>148</span>
                                    <span class={`${cx('question-number')}`}>149</span>
                                    <span class={`${cx('question-number')}`}>150</span>
                                    <span class={`${cx('question-number')}`}>...</span>
                                </div>

                                <div class="mt-4">
                                    <div class="d-flex align-items-center mb-2">
                                        <span class={`${cx('question-number')} me-2`}></span>
                                        <small>Chưa trả lời</small>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <span class={`${cx('question-number')} active me-2`}></span>
                                        <small>Câu hiện tại</small>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <span class={`${cx('question-number')} answered me-2`}></span>
                                        <small>Đã trả lời</small>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class={`${cx('question-number')} flagged me-2`}></span>
                                        <small>Đánh dấu xem lại</small>
                                    </div>
                                </div>
                            </div>

                            <div class="d-grid gap-2">
                                <button
                                    class="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#submitTestModal"
                                >
                                    <i class="fas fa-check-circle me-2"></i>Nộp bài
                                </button>
                                <button
                                    class="btn btn-outline-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exitTestModal"
                                >
                                    <i class="fas fa-times-circle me-2"></i>Thoát bài thi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Test;
