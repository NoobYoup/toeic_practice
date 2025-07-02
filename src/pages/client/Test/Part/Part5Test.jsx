import PartTestTemplate from './PartTestTemplate.jsx';
import PropTypes from 'prop-types';

function Part5Test({ exam, selectedAnswers = {}, onSelectAnswer = () => {} }) {
    return (
        <PartTestTemplate partId={5} exam={exam} selectedAnswers={selectedAnswers} onSelectAnswer={onSelectAnswer} />
    );
}

Part5Test.propTypes = {
    exam: PropTypes.object,
    selectedAnswers: PropTypes.object,
    onSelectAnswer: PropTypes.func,
};

export default Part5Test;
