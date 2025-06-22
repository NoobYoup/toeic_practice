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
                        <strong>ID bài thi:</strong> <span className="text-primary">{exam.id_bai_thi}</span>
                    </div>
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
                        <strong>Năm xuất bản:</strong> {new Date(exam.nam_xuat_ban).getFullYear()}
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
                            <h5 className="mb-3">Listening (100 câu)</h5>
                            <div className="mb-2">
                                <strong>Part 1: Questions 1-6</strong>
                            </div>
                            <div className="mb-3">
                                <span className={`${cx('question-number')} active`}>1</span>
                                <span className={`${cx('question-number')}`}>2</span>
                                <span className={`${cx('question-number')}`}>3</span>
                                <span className={`${cx('question-number')}`}>4</span>
                                <span className={`${cx('question-number')}`}>5</span>
                                <span className={`${cx('question-number')}`}>6</span>
                            </div>

                            <div className="mb-2">
                                <strong>Part 2: Questions 7-31</strong>
                            </div>
                            <div className="mb-3">
                                <span className={`${cx('question-number')}`}>7</span>
                                <span className={`${cx('question-number')}`}>8</span>
                                <span className={`${cx('question-number')}`}>9</span>
                                <span className={`${cx('question-number')}`}>10</span>
                                <span className={`${cx('question-number')}`}>11</span>
                                <span className={`${cx('question-number')}`}>12</span>
                                <span className={`${cx('question-number')}`}>13</span>
                                <span className={`${cx('question-number')}`}>14</span>
                                <span className={`${cx('question-number')}`}>15</span>
                                <span className={`${cx('question-number')}`}>16</span>
                                <span className={`${cx('question-number')}`}>17</span>
                                <span className={`${cx('question-number')}`}>18</span>
                                <span className={`${cx('question-number')}`}>19</span>
                                <span className={`${cx('question-number')}`}>20</span>
                                <span className={`${cx('question-number')}`}>21</span>
                                <span className={`${cx('question-number')}`}>22</span>
                                <span className={`${cx('question-number')}`}>23</span>
                                <span className={`${cx('question-number')}`}>24</span>
                                <span className={`${cx('question-number')}`}>25</span>
                                <span className={`${cx('question-number')}`}>26</span>
                                <span className={`${cx('question-number')}`}>27</span>
                                <span className={`${cx('question-number')}`}>28</span>
                                <span className={`${cx('question-number')}`}>29</span>
                                <span className={`${cx('question-number')}`}>30</span>
                                <span className={`${cx('question-number')}`}>31</span>
                            </div>

                            <div className="mb-2">
                                <strong>Part 3: Questions 32-70</strong>
                            </div>
                            <div className="mb-3">
                                <span className={`${cx('question-number')}`}>32</span>
                                <span className={`${cx('question-number')}`}>33</span>
                                <span className={`${cx('question-number')}`}>34</span>
                                <span className={`${cx('question-number')}`}>35</span>
                                <span className={`${cx('question-number')}`}>36</span>
                                <span className={`${cx('question-number')}`}>37</span>
                                <span className={`${cx('question-number')}`}>38</span>
                                <span className={`${cx('question-number')}`}>39</span>
                                <span className={`${cx('question-number')}`}>40</span>
                                <span className={`${cx('question-number')}`}>...</span>
                            </div>

                            <div className="mb-2">
                                <strong>Part 4: Questions 71-100</strong>
                            </div>
                            <div className="mb-3">
                                <span className={`${cx('question-number')}`}>71</span>
                                <span className={`${cx('question-number')}`}>72</span>
                                <span className={`${cx('question-number')}`}>73</span>
                                <span className={`${cx('question-number')}`}>74</span>
                                <span className={`${cx('question-number')}`}>75</span>
                                <span className={`${cx('question-number')}`}>76</span>
                            </div>

                            <hr />

                            <h5 className="mb-3">Reading (100 câu)</h5>
                            <div className="mb-2">
                                <strong>Part 5: Questions 101-130</strong>
                            </div>
                            <div className="mb-3">
                                <span className={`${cx('question-number')}`}>101</span>
                                <span className={`${cx('question-number')}`}>102</span>
                                <span className={`${cx('question-number')}`}>103</span>
                                <span className={`${cx('question-number')}`}>104</span>
                                <span className={`${cx('question-number')}`}>105</span>
                                <span className={`${cx('question-number')}`}>...</span>
                            </div>

                            <div className="mb-2">
                                <strong>Part 6: Questions 131-146</strong>
                            </div>
                            <div className="mb-3">
                                <span className={`${cx('question-number')}`}>131</span>
                                <span className={`${cx('question-number')}`}>132</span>
                                <span className={`${cx('question-number')}`}>133</span>
                                <span className={`${cx('question-number')}`}>134</span>
                                <span className={`${cx('question-number')}`}>135</span>
                                <span className={`${cx('question-number')}`}>...</span>
                            </div>

                            <div className="mb-2">
                                <strong>Part 7: Questions 147-200</strong>
                            </div>
                            <div className="mb-3">
                                <span className={`${cx('question-number')}`}>147</span>
                                <span className={`${cx('question-number')}`}>148</span>
                                <span className={`${cx('question-number')}`}>149</span>
                                <span className={`${cx('question-number')}`}>150</span>
                                <span className={`${cx('question-number')}`}>...</span>
                            </div>

                            {/* <div className="mt-4">
                                <div className="d-flex align-items-center mb-2">
                                    <span className={`${cx('question-number')}`}></span>
                                    <small>Chưa trả lời</small>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <span className={`${cx('question-number')}`}></span>
                                    <small>Câu hiện tại</small>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <span className={`${cx('question-number')}`}></span>
                                    <small>Đã trả lời</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className={`${cx('question-number')}`}></span>
                                    <small>Đánh dấu xem lại</small>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailExam;
