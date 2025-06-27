import { useMemo } from 'react';
import PropTypes from 'prop-types';

function Part7Test({ exam }) {
    // Lấy danh sách câu hỏi Part 7
    const partQuestions = useMemo(() => {
        if (!exam) return [];
        return (exam.cau_hoi_cua_bai_thi || [])
            .filter((item) => item.cau_hoi.id_phan === 7)
            .map((item) => item.cau_hoi);
    }, [exam]);

    // Nhóm theo id_doan_van
    const groupedQuestions = useMemo(() => {
        return partQuestions.reduce((groups, question) => {
            const passageId = question.id_doan_van || 'no-passage';
            if (!groups[passageId]) {
                groups[passageId] = {
                    passage: question.doan_van, // chứa tiêu đề / nội dung + có thể có hinh_anh
                    questions: [],
                };
            }
            groups[passageId].questions.push(question);
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

    // Tính số thứ tự bắt đầu cho Part 7
    let startNumber = 1;
    if (Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        const countsBefore = {};
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const pId = item.cau_hoi.id_phan;
            countsBefore[pId] = (countsBefore[pId] || 0) + 1;
        });
        for (let p = 1; p < 7; p += 1) {
            startNumber += countsBefore[p] || 0;
        }
    }

    return (
        <div className="vstack gap-5 my-4">
            {questionGroups.map((group, groupIdx) => (
                <div
                    className="card border-0 shadow"
                    style={{ borderRadius: '10px' }}
                    key={group.passage?.id_doan_van || `group-${groupIdx}`}
                >
                    <div className="card-body">
                        <div className="row p-2">
                            <div className="col-lg-8 bg-secondary-subtle rounded-3 p-4">
                                {/* PHẦN ĐOẠN VĂN & HÌNH ẢNH */}
                                {group.passage ? (
                                    <div className="mb-4">
                                        {/* Tiêu đề đoạn văn */}
                                        {group.passage.tieu_de && (
                                            <h6
                                                className="mb-2"
                                                dangerouslySetInnerHTML={{ __html: group.passage.tieu_de }}
                                            ></h6>
                                        )}

                                        {/* Phương tiện (hình ảnh / âm thanh) của đoạn văn */}
                                        {Array.isArray(group.passage.danh_sach_phuong_tien) &&
                                            group.passage.danh_sach_phuong_tien.length > 0 && (
                                                <div className="d-flex flex-wrap gap-3 mb-2">
                                                    {group.passage.danh_sach_phuong_tien.map((media) => {
                                                        if (media.loai_phuong_tien === 'hinh_anh') {
                                                            return (
                                                                <img
                                                                    key={media.id_phuong_tien}
                                                                    src={media.url_phuong_tien}
                                                                    alt={`Hình ảnh đoạn văn ${media.id_phuong_tien}`}
                                                                    className="img-fluid rounded border"
                                                                    style={{ maxWidth: '100%' }}
                                                                />
                                                            );
                                                        }
                                                        if (media.loai_phuong_tien === 'am_thanh') {
                                                            return (
                                                                <audio
                                                                    key={media.id_phuong_tien}
                                                                    controls
                                                                    className="w-100"
                                                                >
                                                                    <source
                                                                        src={media.url_phuong_tien}
                                                                        type="audio/mpeg"
                                                                    />
                                                                    Trình duyệt của bạn không hỗ trợ audio.
                                                                </audio>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            )}

                                        {/* Nội dung đoạn văn */}
                                        {/* {group.passage.noi_dung && (
                                            <div
                                                className="mb-2"
                                                dangerouslySetInnerHTML={{ __html: group.passage.noi_dung }}
                                            ></div>
                                        )} */}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="col-lg-4">
                                {/* DANH SÁCH CÂU HỎI THUỘC ĐOẠN VĂN */}
                                {group.questions.map((question) => {
                                    const indexInPart = partQuestions.findIndex(
                                        (q) => q.id_cau_hoi === question.id_cau_hoi,
                                    );
                                    const globalNumber = startNumber + indexInPart;
                                    return (
                                        <div key={question.id_cau_hoi} className="mb-4">
                                            <h6 className="mb-2">Câu {globalNumber}:</h6>

                                            {/* Hình ảnh câu hỏi nếu có */}
                                            {question.hinh_anh?.url_phuong_tien && (
                                                <img
                                                    src={question.hinh_anh.url_phuong_tien}
                                                    alt="question"
                                                    className="img-fluid rounded mb-3"
                                                />
                                            )}

                                            {/* Nội dung câu hỏi */}
                                            {question.noi_dung && (
                                                <p
                                                    className="fw-semibold"
                                                    dangerouslySetInnerHTML={{ __html: question.noi_dung }}
                                                ></p>
                                            )}

                                            {/* Đáp án */}
                                            <ul className="list-group">
                                                {question.lua_chon.map((choice) => (
                                                    <li
                                                        key={choice.ky_tu_lua_chon}
                                                        className="list-group-item border-0"
                                                    >
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
                    </div>
                </div>
            ))}
        </div>
    );
}

Part7Test.propTypes = {
    exam: PropTypes.object,
};

export default Part7Test;
