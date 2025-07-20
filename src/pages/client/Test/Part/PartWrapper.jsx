import PartTestTemplate from './PartTestTemplate.jsx';
import PropTypes from 'prop-types';

/**
 * Component wrapper cho các Part đơn giản (Part 1, 2, 5)
 * Chỉ cần truyền partId và sử dụng PartTestTemplate
 */
function PartWrapper({ partId, exam, selectedAnswers = {}, onSelectAnswer = () => {} }) {
    return (
        <PartTestTemplate
            partId={partId}
            exam={exam}
            selectedAnswers={selectedAnswers}
            onSelectAnswer={onSelectAnswer}
        />
    );
}

PartWrapper.propTypes = {
    partId: PropTypes.number.isRequired,
    exam: PropTypes.object,
    selectedAnswers: PropTypes.object,
    onSelectAnswer: PropTypes.func,
};

export default PartWrapper;
