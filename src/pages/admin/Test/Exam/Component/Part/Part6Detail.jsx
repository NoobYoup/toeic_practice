import { useOutletContext } from 'react-router-dom';

function Part6Detail() {
    const { exam } = useOutletContext() || {};

    if (!exam) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    /* ------------------------------------------------------------ */
    /* TÍNH SỐ THỨ TỰ BẮT ĐẦU CHO PART 6                            */
    /* ------------------------------------------------------------ */
    let startNumber = 1;
    if (Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        const countsBefore = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pId = item.cau_hoi.id_phan;
            countsBefore[pId] = (countsBefore[pId] || 0) + 1;
        });
        for (let p = 1; p < 6; p += 1) {
            startNumber += countsBefore[p] || 0;
        }
    }

    // Lọc danh sách câu hỏi Part 6
    const partQuestions = (exam.cau_hoi_cua_bai_thi || [])
        .filter((item) => item.cau_hoi.id_phan === 6)
        .map((item) => item.cau_hoi);

    // Nhóm các câu hỏi theo id_doan_van
    const groupedQuestions = partQuestions.reduce((groups, question) => {
        const passageId = question.id_doan_van || 'no-passage';
        if (!groups[passageId]) {
            groups[passageId] = {
                passage: question.doan_van,
                questions: [],
            };
        }
        groups[passageId].questions.push(question);
        return groups;
    }, {});

    const questionGroups = Object.values(groupedQuestions);

    if (questionGroups.length === 0) {
        return <p>Không có câu hỏi cho phần này.</p>;
    }

    return (
        <div className="vstack gap-5">
            {questionGroups.map((group, groupIndex) => (
                <div className="card" key={group.passage?.id_doan_van || `group-${groupIndex}`}>
                    <div className="card-body">
                        {/* Đoạn văn */}
                        {group.passage ? (
                            <div className="mb-4 bg-secondary-subtle p-4 rounded-3">
                                {group.passage.tieu_de && <h6 className="mb-2">{group.passage.tieu_de}</h6>}
                                {group.passage.noi_dung && <div className="mb-2">{group.passage.noi_dung}</div>}
                            </div>
                        ) : (
                            <></>
                        )}

                        {/* Danh sách câu hỏi thuộc đoạn văn */}
                        {group.questions.map((question) => {
                            const indexInPart = partQuestions.findIndex((q) => q.id_cau_hoi === question.id_cau_hoi);
                            const globalNumber = startNumber + indexInPart;
                            return (
                                <div key={question.id_cau_hoi} className="mb-4">
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
                                        {question.lua_chon.map((choice) => {
                                            const isCorrect = choice.ky_tu_lua_chon === question.dap_an_dung;
                                            return (
                                                <li
                                                    key={choice.ky_tu_lua_chon}
                                                    className={`list-group-item ${
                                                        isCorrect ? 'list-group-item-success' : ''
                                                    }`}
                                                >
                                                    {choice.ky_tu_lua_chon}) {choice.noi_dung}
                                                    {isCorrect && <span className="badge bg-success ms-2">Đáp án</span>}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {question.giai_thich && (
                                        <div className="mt-2">
                                            <small className="text-muted fs-6">Giải thích: {question.giai_thich}</small>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Part6Detail;
