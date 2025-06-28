import PropTypes from 'prop-types';

function PartTestTemplate({ partId, exam }) {
    if (!exam) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    // Lọc câu hỏi thuộc part hiện tại
    const questions = (exam.cau_hoi_cua_bai_thi || [])
        .filter((item) => item.cau_hoi.id_phan === partId)
        .map((item) => item.cau_hoi);

    // Tính số thứ tự bắt đầu
    let startNumber = 1;
    if (Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        const countsBefore = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pId = item.cau_hoi.id_phan;
            countsBefore[pId] = (countsBefore[pId] || 0) + 1;
        });
        for (let p = 1; p < partId; p += 1) {
            startNumber += countsBefore[p] || 0;
        }
    }

    if (questions.length === 0) {
        return <p>Không có câu hỏi cho phần này.</p>;
    }

    return (
        <div className="vstack gap-5 my-4">
            {questions.map((q, idx) => {
                const number = startNumber + idx;
                return (
                    <div className="card border-0 shadow" style={{ borderRadius: '10px' }} key={q.id_cau_hoi}>
                        <div className="card-body">
                            <h6 className="card-title mb-3">Câu {number}:</h6>

                            {/* Hình ảnh nếu có */}
                            {q.hinh_anh?.url_phuong_tien && (
                                <img
                                    src={q.hinh_anh.url_phuong_tien}
                                    className="img-fluid rounded mb-3"
                                    alt={`Ảnh câu hỏi ${number}`}
                                />
                            )}

                            {/* Audio nếu có */}
                            {q.am_thanh?.url_phuong_tien && (
                                <audio controls className="mb-3" style={{ width: '100%' }}>
                                    <source src={q.am_thanh.url_phuong_tien} />
                                    Trình duyệt của bạn không hỗ trợ thẻ audio.
                                </audio>
                            )}

                            {/* Nội dung câu hỏi */}
                            {q.noi_dung && (
                                <p className="fw-semibold" dangerouslySetInnerHTML={{ __html: q.noi_dung }}></p>
                            )}

                            {/* Danh sách đáp án */}
                            <ul className="list-group">
                                {q.lua_chon.map((choice) => (
                                    <li key={choice.ky_tu_lua_chon} className="list-group-item border-0">
                                        <label className="d-flex align-items-center mb-0 w-100">
                                            <input
                                                type="radio"
                                                name={`question_${q.id_cau_hoi}`}
                                                value={choice.ky_tu_lua_chon}
                                                className="form-check-input me-2"
                                            />
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        partId === 1 || partId === 2
                                                            ? choice.ky_tu_lua_chon
                                                            : `${choice.ky_tu_lua_chon}. ${choice.noi_dung}`,
                                                }}
                                            ></span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

PartTestTemplate.propTypes = {
    partId: PropTypes.number.isRequired,
    exam: PropTypes.object,
};

export default PartTestTemplate;
