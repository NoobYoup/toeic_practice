import { Outlet, NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDraftExam } from '@/services/examService';
import styles from './Part/PartTab.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const partTabs = [
    { key: 'part1', label: 'Part 1' },
    { key: 'part2', label: 'Part 2' },
    { key: 'part3', label: 'Part 3' },
    { key: 'part4', label: 'Part 4' },
    { key: 'part5', label: 'Part 5' },
    { key: 'part6', label: 'Part 6' },
    { key: 'part7', label: 'Part 7' },
];

function DetailExam() {
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchExam = async () => {
            setLoading(true);
            try {
                const res = await getDraftExam(id);

                setExam(res.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchExam();
    }, [id]);

    /* ------------------------------------------------------------ */
    /* TÍNH SỐ THỨ TỰ CÂU HỎI THEO TỪNG PHẦN                       */
    /* ------------------------------------------------------------ */
    // Chuẩn bị dữ liệu đếm số câu hỏi cho mỗi phần
    const questionCounts = {};
    if (exam && Array.isArray(exam.cau_hoi_cua_bai_thi)) {
        exam.cau_hoi_cua_bai_thi.forEach((item) => {
            const partId = item?.cau_hoi?.id_phan;
            if (partId) {
                questionCounts[partId] = (questionCounts[partId] || 0) + 1;
            }
        });
    }

    // Tạo mảng thông tin chi tiết cho từng phần (bắt đầu, kết thúc, số lượng)
    const partInfos = [];
    let currentNumber = 1;
    for (let part = 1; part <= 7; part += 1) {
        const count = questionCounts[part] || 0;
        if (count > 0) {
            partInfos.push({
                part,
                count,
                start: currentNumber,
                end: currentNumber + count - 1,
            });
            currentNumber += count;
        }
    }

    const listeningParts = partInfos.filter((p) => p.part <= 4);
    const readingParts = partInfos.filter((p) => p.part >= 5);
    const listeningTotal = listeningParts.reduce((sum, p) => sum + p.count, 0);
    const readingTotal = readingParts.reduce((sum, p) => sum + p.count, 0);

    if (loading || !exam) {
        return (
            <div className="text-center">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }
    return (
        <>
            <h1>Chi tiết đề thi</h1>
            <div className="mb-4">
                <h5 className="fw-bold mb-3">Thông tin bài thi</h5>

                <div className="row g-3">
                    <div className="col-md-4">
                        <strong>Tên bài thi:</strong> {exam.ten_bai_thi}
                    </div>
                    <div className="col-md-4">
                        <strong>Bài thi đầu vào:</strong>{' '}
                        <span className="badge bg-primary">{exam.la_bai_thi_dau_vao ? 'Có' : 'Không'}</span>
                    </div>

                    <div className="col-md-4">
                        <strong>Mô tả:</strong> {exam.mo_ta}
                    </div>
                    <div className="col-md-4">
                        <strong>Người tạo:</strong> {exam.nguoi_tao}
                    </div>
                    <div className="col-md-4">
                        <strong>Số lượng câu hỏi:</strong> {exam.so_luong_cau_hoi}
                    </div>
                    <div className="col-md-4">
                        <strong>Mức độ điểm:</strong> {exam.muc_do_diem}
                    </div>
                    <div className="col-md-4">
                        <strong>Điểm tối đa:</strong> {exam.diem_toi_da}
                    </div>
                    <div className="col-md-4">
                        <strong>Thời gian thi (phút):</strong> {exam.thoi_gian_thi || exam.thoi_gian_bai_thi}
                    </div>
                    <div className="col-md-4">
                        <strong>Năm xuất bản:</strong> {exam.nam_xuat_ban}
                    </div>
                    <div className="col-md-4">
                        <strong>Trạng thái:</strong>{' '}
                        <span className="badge bg-success">
                            {exam.trang_thai === 'da_xuat_ban' ? 'Đã xuất bản' : 'Nháp'}
                        </span>
                    </div>
                    <div className="col-md-4">
                        <strong>Thời gian tạo:</strong> {new Date(exam.thoi_gian_tao).toLocaleString()}
                    </div>
                    <div className="col-md-4">
                        <strong>Thời gian cập nhật:</strong> {new Date(exam.thoi_gian_cap_nhat).toLocaleString()}
                    </div>
                </div>

                <h5 className="fw-bold my-3">Thông tin câu hỏi</h5>

                <div className={`${cx('part-tab-container')} mt-3`}>
                    {partTabs.map((tab) => (
                        <NavLink
                            key={tab.key}
                            // to={tab.key}
                            to={`/admin/test/exam/detail-exam/${id}/${tab.key}`}
                            className={({ isActive }) => cx('part-tab-btn', { active: isActive })}
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </div>

                <div className="row ">
                    <div className="col-md-9">
                        <Outlet context={{ exam }} />
                    </div>

                    <div className="col-md-3">
                        <div className={`${cx('question-nav')} mb-4`}>
                            {/* ---------------------- LISTENING ---------------------- */}
                            {listeningParts.length > 0 && (
                                <>
                                    <h5 className="mb-3">Listening ({listeningTotal} câu)</h5>
                                    {listeningParts.map((p) => (
                                        <div key={`part-${p.part}`} className="mb-3">
                                            <div className="mb-2">
                                                <strong>
                                                    Part {p.part}: Questions {p.start}-{p.end}
                                                </strong>
                                            </div>
                                            <div className="mb-2">
                                                {Array.from({ length: p.count }).map((_, idx) => (
                                                    <span key={p.start + idx} className={cx('question-number')}>
                                                        {p.start + idx}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <hr />
                                </>
                            )}

                            {/* ---------------------- READING ----------------------- */}
                            {readingParts.length > 0 && (
                                <>
                                    <h5 className="mb-3">Reading ({readingTotal} câu)</h5>
                                    {readingParts.map((p) => (
                                        <div key={`part-${p.part}`} className="mb-3">
                                            <div className="mb-2">
                                                <strong>
                                                    Part {p.part}: Questions {p.start}-{p.end}
                                                </strong>
                                            </div>
                                            <div className="mb-2">
                                                {Array.from({ length: p.count }).map((_, idx) => (
                                                    <span key={p.start + idx} className={cx('question-number')}>
                                                        {p.start + idx}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailExam;
