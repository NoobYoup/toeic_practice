import PartTestTemplate from './PartTestTemplate.jsx';
import PropTypes from 'prop-types';

function Part1Test({ exam, selectedAnswers = {}, onSelectAnswer = () => {} }) {
    return (
        <PartTestTemplate partId={1} exam={exam} selectedAnswers={selectedAnswers} onSelectAnswer={onSelectAnswer} />
    );
}

Part1Test.propTypes = {
    exam: PropTypes.object,
    selectedAnswers: PropTypes.object,
    onSelectAnswer: PropTypes.func,
};

export default Part1Test;
