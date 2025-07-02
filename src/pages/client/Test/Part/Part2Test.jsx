import PartTestTemplate from './PartTestTemplate.jsx';
import PropTypes from 'prop-types';

function Part2Test({ exam, selectedAnswers = {}, onSelectAnswer = () => {} }) {
    return (
        <PartTestTemplate partId={2} exam={exam} selectedAnswers={selectedAnswers} onSelectAnswer={onSelectAnswer} />
    );
}

Part2Test.propTypes = {
    exam: PropTypes.object,
    selectedAnswers: PropTypes.object,
    onSelectAnswer: PropTypes.func,
};

export default Part2Test;
