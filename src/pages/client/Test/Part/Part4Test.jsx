import { useMemo } from 'react';
import PropTypes from 'prop-types';

function Part4Test({ exam }) {
    // Lấy danh sách câu hỏi thuộc Part 4
    const partQuestions = useMemo(() => {
        if (!exam) return [];
        return (exam.cau_hoi_cua_bai_thi || [])
            .filter((item) => item.cau_hoi.id_phan === 4)
            .map((item) => item.cau_hoi);
    }, [exam]);

    // Nhóm câu hỏi theo id_phuong_tien_am_thanh
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

    // Tính số thứ tự bắt đầu cho Part 4
    let startNumber = 1;
    if (Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        const countsBefore = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pid = item.cau_hoi.id_phan;
            countsBefore[pid] = (countsBefore[pid] || 0) + 1;
        });
        for (let p = 1; p < 4; p += 1) {
            startNumber += countsBefore[p] || 0;
        }
    }

    return (
        <div className="vstack gap-5 my-4">
            {questionGroups.map((group, groupIdx) => (
                <div className="card border-0 shadow" style={{ borderRadius: '10px' }} key={group.audio?.id_phuong_tien_am_thanh || `group-${groupIdx}`}>
                    <div className="card-body">
                        {/* Audio */}
                        {group.audio?.url_phuong_tien && (
                            <audio controls style={{ width: '100%' }} className="mb-4">
                                <source src={group.audio.url_phuong_tien} />Trình duyệt của bạn không hỗ trợ audio.
                            </audio>
                        )}

                        {/* Danh sách câu hỏi trong nhóm */}
                        {group.questions.map((question) => {
                            const indexInPart = partQuestions.findIndex((q) => q.id_cau_hoi === question.id_cau_hoi);
                            const globalNumber = startNumber + indexInPart;
                            return (
                                <div key={question.id_cau_hoi} className="mb-4">
                                    <h6 className="mb-2">Câu {globalNumber}:</h6>
                                    {question.noi_dung && (
                                        <p
                                            className="fw-semibold"
                                            dangerouslySetInnerHTML={{ __html: question.noi_dung }}
                                        ></p>
                                    )}
                                    <ul className="list-group">
                                        {question.lua_chon.map((choice) => (
                                            <li key={choice.ky_tu_lua_chon} className="list-group-item border-0">
                                                <label className="d-flex align-items-center mb-0 w-100">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input me-2"
                                                        name={`question_${question.id_cau_hoi}`}
                                                        value={choice.ky_tu_lua_chon}
                                                    />
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: `${choice.ky_tu_lua_chon}) ${choice.noi_dung}`,
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

Part4Test.propTypes = {
    exam: PropTypes.object,
};

export default Part4Test;
