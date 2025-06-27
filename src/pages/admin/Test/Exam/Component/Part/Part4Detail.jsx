import { useOutletContext } from 'react-router-dom';
// import PartDetailTemplate from './PartDetailTemplate.jsx';

function Part4Detail() {
    const { exam } = useOutletContext() || {};
    
    if (!exam) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }
    /* ------------------------------------------------------------ */
    /* TÍNH SỐ THỨ TỰ BẮT ĐẦU CHO PART 4                            */
    /* ------------------------------------------------------------ */
    let startNumber = 1;
    if (Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        const countsBefore = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pId = item.cau_hoi.id_phan;
            countsBefore[pId] = (countsBefore[pId] || 0) + 1;
        });
        for (let p = 1; p < 4; p += 1) {
            startNumber += countsBefore[p] || 0;
        }
    }

    // Lọc danh sách câu hỏi Part 4
    const partQuestions = (exam.cau_hoi_cua_bai_thi || [])
        .filter((item) => item.cau_hoi.id_phan === 4)
        .map((item) => item.cau_hoi);

    // Nhóm câu hỏi theo id_phuong_tien_am_thanh
    const groupedQuestions = partQuestions.reduce((groups, question) => {
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

    const questionGroups = Object.values(groupedQuestions);

    return (
        <div className="vstack gap-5">
            {questionGroups.map((group, groupIndex) => (
                <div className="card" key={group.audio?.id_phuong_tien || `group-${groupIndex}`}>
                    <div className="card-body">
                        {/* Hiển thị audio nếu có */}
                        {group.audio?.url_phuong_tien && (
                            <div className="mb-4">
                                <h6 className="mb-2">Âm thanh:</h6>
                                <audio controls className="w-100">
                                    <source src={group.audio.url_phuong_tien} type="audio/mpeg" />
                                    Trình duyệt của bạn không hỗ trợ audio.
                                </audio>
                            </div>
                        )}

                        {/* Danh sách câu hỏi */}
                        {group.questions.map((question) => {
                            const indexInPart = partQuestions.findIndex((q) => q.id_cau_hoi === question.id_cau_hoi);
                            const globalNumber = startNumber + indexInPart;

                            return (
                                <div key={question.id_cau_hoi} className="mb-4">
                                    <h6 className="mb-2">Câu {globalNumber}</h6>

                                    {question.noi_dung && (
                                        <p
                                            className="fw-semibold"
                                            dangerouslySetInnerHTML={{ __html: question.noi_dung }}
                                        ></p>
                                    )}

                                    <ul className="list-group">
                                        {question.lua_chon.map((choice) => {
                                            const isCorrect = choice.ky_tu_lua_chon === question.dap_an_dung;
                                            return (
                                                <li
                                                    key={choice.ky_tu_lua_chon}
                                                    className={`list-group-item ${isCorrect ? 'list-group-item-success' : ''}`}
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

export default Part4Detail;