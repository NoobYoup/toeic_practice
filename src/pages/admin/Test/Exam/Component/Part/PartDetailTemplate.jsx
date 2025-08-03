import { useOutletContext } from 'react-router-dom';

function PartDetailTemplate({ partId }) {
    // Lấy dữ liệu đề thi từ Outlet context (được truyền từ DetailExam)
    const { exam } = useOutletContext() || {};

    if (!exam) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    // Lọc danh sách câu hỏi của part hiện tại
    const questions = (exam.cau_hoi_cua_bai_thi || [])
        .filter((item) => item.cau_hoi.id_phan === partId)
        .map((item) => item.cau_hoi);

    // Tính số câu của các part trước để xác định số bắt đầu
    let startNumber = 1;
    if (Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        const countsBefore = {};
        // đếm số câu theo part
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
        <div className="vstack gap-5">
            {questions.map((q, idx) => (
                <div className="card" key={q.id_cau_hoi}>
                    <div className="card-body">
                        <h6 className="card-title mb-3">Câu {startNumber + idx}:</h6>

                        {q.hinh_anh?.url_phuong_tien && (
                            <img
                                src={q.hinh_anh.url_phuong_tien}
                                className="img-fluid rounded mb-3"
                                alt={`Ảnh câu hỏi ${startNumber + idx}`}
                            />
                        )}

                        {q.am_thanh?.url_phuong_tien && (
                            <audio controls className="w-100 mb-3">
                                <source src={q.am_thanh.url_phuong_tien} type="audio/mpeg" />
                                Trình duyệt của bạn không hỗ trợ audio.
                            </audio>
                        )}

                        {/* Nội dung câu hỏi */}
                        {q.noi_dung && <p className="fw-semibold" dangerouslySetInnerHTML={{ __html: q.noi_dung }}></p>}

                        {/* Danh sách đáp án */}
                        <ul className="list-group">
                            {q.lua_chon.map((choice) => {
                                const isCorrect = choice.ky_tu_lua_chon === q.dap_an_dung;
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

                        {q.giai_thich && (
                            <div className="mt-3">
                                <small className="text-muted fs-6">Giải thích: {q.giai_thich}</small>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PartDetailTemplate;
