import React from 'react';
import QuestionResult from './QuestionResult.jsx';

function AudioGroupResult({ group, cx }) {
    if (!group || !Array.isArray(group.questions)) return null;
    const { audioUrl, questions } = group;
    return (
        <div className={`${cx('results-container')} p-4 mb-4`}>
            {audioUrl && <audio controls src={audioUrl} className="w-100 mb-3" />}
            {questions
                .sort((a, b) => a.globalIndex - b.globalIndex)
                .map((item) => (
                    <QuestionResult key={item.id_cau_tra_loi} item={item} cx={cx} />
                ))}
        </div>
    );
}

export default AudioGroupResult;
