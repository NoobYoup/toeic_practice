import { useMemo } from 'react';
import PropTypes from 'prop-types';

function Part3Test({ exam, selectedAnswers = {}, onSelectAnswer = () => {} }) {
    // Lấy danh sách câu hỏi Part 3 (khi exam chưa có thì mảng rỗng)
    const partQuestions = useMemo(() => {
        if (!exam) return [];
        return (exam.cau_hoi_cua_bai_thi || [])
            .filter((item) => item.cau_hoi.id_phan === 3)
            .map((item) => item.cau_hoi);
    }, [exam]);

    // Nhóm các câu hỏi theo id_phuong_tien_am_thanh
    const groupedQuestions = useMemo(() => {
        return partQuestions.reduce((groups, question) => {
            const audioId = question.id_phuong_tien_am_thanh || 'no-audio';
            if (!groups[audioId]) {
                groups[audioId] = {
                    audio: question.am_thanh,
                    questions: [],
                };
            }
            groups[audioId].questions.push(question);
            return groups;
        }, {});
    }, [partQuestions]);

    if (!exam) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    const questionGroups = Object.values(groupedQuestions);

    // Tính số thứ tự bắt đầu cho Part 3
    let startNumber = 1;
    if (Array.isArray(exam?.cau_hoi_cua_bai_thi)) {
        const countsBefore = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pId = item.cau_hoi.id_phan;
            countsBefore[pId] = (countsBefore[pId] || 0) + 1;
        });
        for (let p = 1; p < 3; p += 1) {
            startNumber += countsBefore[p] || 0;
        }
    }

    return (
        <div className="vstack gap-5 my-4">
            {questionGroups.map((group, groupIndex) => (
                <div
                    className="card border-0 shadow"
                    style={{ borderRadius: '10px' }}
                    key={group.audio?.id_phuong_tien_am_thanh || `group-${groupIndex}`}
                >
                    <div className="card-body">
                        {/* Audio */}
                        {group.audio?.url_phuong_tien && (
                            <audio controls className="mb-4" style={{ width: '100%' }}>
                                <source src={group.audio.url_phuong_tien} />
                                Trình duyệt của bạn không hỗ trợ thẻ audio.
                            </audio>
                        )}

                        {/* Danh sách câu hỏi thuộc đoạn audio */}
                        {group.questions.map((question) => {
                            const indexInPart = partQuestions.findIndex((q) => q.id_cau_hoi === question.id_cau_hoi);
                            const globalNumber = startNumber + indexInPart;
                            return (
                                <div id={`question-${globalNumber}`} key={question.id_cau_hoi} className="mb-4">
                                    <h6 className="mb-2">Câu {globalNumber}:</h6>

                                    {/* Nội dung câu hỏi */}
                                    {question.noi_dung && (
                                        <p
                                            className="fw-semibold"
                                            dangerouslySetInnerHTML={{ __html: question.noi_dung }}
                                        ></p>
                                    )}

                                    {/* Danh sách đáp án */}
                                    <ul className="list-group">
                                        {question.lua_chon.map((choice) => (
                                            <li key={choice.ky_tu_lua_chon} className="list-group-item border-0">
                                                <label className="d-flex align-items-center mb-0 w-100">
                                                    <input
                                                        type="radio"
                                                        name={`question_${question.id_cau_hoi}`}
                                                        value={choice.ky_tu_lua_chon}
                                                        className="form-check-input me-2"
                                                        checked={
                                                            selectedAnswers[question.id_cau_hoi] ===
                                                            choice.ky_tu_lua_chon
                                                        }
                                                        onChange={() =>
                                                            onSelectAnswer(question.id_cau_hoi, choice.ky_tu_lua_chon)
                                                        }
                                                    />
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: `${choice.ky_tu_lua_chon}. ${choice.noi_dung}`,
                                                        }}
                                                    ></span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

Part3Test.propTypes = {
    exam: PropTypes.object,
    selectedAnswers: PropTypes.object,
    onSelectAnswer: PropTypes.func,
};

export default Part3Test;
