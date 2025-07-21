import React from 'react';

function QuestionResult({ item, cx }) {
    if (!item || !item.question) return null;
    return (
        <div className={`${cx('results-container')} p-4 mb-4`} id={`question-${item.globalIndex}`}>
            <div className="d-flex justify-content-between">
                <h6>Câu {item.globalIndex}:</h6>
                {item.lua_chon_da_chon === null && (
                    <span className="badge bg-warning px-3 py-2 mb-3 d-flex align-items-center">Bỏ trống</span>
                )}
            </div>

            {item.question.hinh_anh && (
                <div className="mb-4 text-center">
                    <img
                        src={item.question.hinh_anh.url_phuong_tien}
                        alt={`Question ${item.globalIndex} Image`}
                        className="img-fluid rounded"
                    />
                </div>
            )}

            {item.question.noi_dung && <h5 className={`${cx('question-text')}`}>{item.question.noi_dung}</h5>}

            <div className={`${cx('answer-options')}`}>
                {item.question.lua_chon.map((choice) => {
                    const isUserChoice = choice.ky_tu_lua_chon === item.lua_chon_da_chon;
                    const isCorrectChoice = choice.ky_tu_lua_chon === item.question.dap_an_dung;
                    return (
                        <div
                            key={choice.ky_tu_lua_chon}
                            className={cx('answer-option', {
                                correct: isCorrectChoice,
                                'user-incorrect': isUserChoice && !item.la_dung,
                            })}
                        >
                            <strong>{choice.ky_tu_lua_chon}.</strong> {choice.noi_dung}
                        </div>
                    );
                })}
            </div>

            {item.question.giai_thich && (
                <div className={`${cx('explanation-box')}`}>
                    <h6>
                        <i className="fas fa-lightbulb me-2"></i>Giải thích
                    </h6>
                    <p className="mb-0">{item.question.giai_thich}</p>
                </div>
            )}
        </div>
    );
}

export default QuestionResult;
