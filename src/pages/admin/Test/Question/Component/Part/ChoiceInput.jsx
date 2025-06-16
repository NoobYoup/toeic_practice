// ChoiceInput.jsx
// Component hiển thị 1 lựa chọn A/B/C/D gồm nút radio chọn đáp án đúng + ô nhập nội dung
// Tách riêng để tránh lặp mã 4 lần trong mỗi câu hỏi

import PropTypes from 'prop-types';

function ChoiceInput({ questionIdx, choiceIdx, optionLetter, value, isCorrect, onTextChange, onChooseCorrect }) {
    return (
        <div className="mb-3 ">
            {/* Radio chọn đáp án đúng */}
            <input
                type="radio"
                className="form-check-input me-2"
                id={`q${questionIdx}-option${optionLetter}`}
                name={`answerOption${questionIdx}`}
                value={optionLetter}
                checked={isCorrect}
                onChange={() => onChooseCorrect(optionLetter)}
            />
            <label htmlFor={`q${questionIdx}-option${optionLetter}`} className="form-label mb-2">
                Lựa chọn {optionLetter}
            </label>
            {/* Ô nhập nội dung đáp án */}
            <input
                type="text"
                className="form-control flex-grow-1"
                id={`q${questionIdx}-option${optionLetter}-input`}
                value={value}
                onChange={(e) => onTextChange(e.target.value)}
            />
        </div>
    );
}

ChoiceInput.propTypes = {
    questionIdx: PropTypes.number.isRequired,
    choiceIdx: PropTypes.number.isRequired,
    optionLetter: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onChooseCorrect: PropTypes.func.isRequired,
};

export default ChoiceInput;
