import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetailQuestion } from '@/services/questionService';
import { toast } from 'react-toastify';

function DetailQuesionBank() {
    const { id } = useParams();
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchQuestionDetail = async (id) => {
        setLoading(true);
        try {
            const res = await getDetailQuestion(id);
            console.log(res.data.data);
            setQuestionData(res.data.data);
        } catch (error) {
            console.error('Error fetching question detail:', error);
            toast.error(error.response?.data?.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuestionDetail(id);
    }, [id]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    const getDifficultyBadge = (level) => {
        switch (level) {
            case 'de':
                return { class: 'badge bg-success', text: 'Dễ' };
            case 'trung_binh':
                return { class: 'badge bg-warning text-dark', text: 'Trung bình' };
            case 'kho':
                return { class: 'badge bg-danger', text: 'Khó' };
            default:
                return { class: 'badge bg-secondary', text: level };
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'da_xuat_ban':
                return { class: 'badge bg-success', text: 'Đã xuất bản' };
            case 'luu_tru':
                return { class: 'badge bg-secondary', text: 'Lưu trữ' };
            case 'ban_nhap':
                return { class: 'badge bg-warning text-dark', text: 'Bản nháp' };
            default:
                return { class: 'badge bg-secondary', text: status };
        }
    };

    const getQuestionTypeBadge = (type) => {
        return type === 'listening'
            ? { class: 'badge bg-info', text: 'Listening' }
            : { class: 'badge bg-primary', text: 'Reading' };
    };

    const difficultyBadge = getDifficultyBadge(questionData?.muc_do_kho);
    const statusBadge = getStatusBadge(questionData?.trang_thai);
    const typeBadge = getQuestionTypeBadge(questionData?.phan?.loai_phan);

    if (loading) {
        return (
            <div className="text-center py-5">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    if (!questionData) {
        return <div className="text-center py-5">Đang tải...</div>;
    }

    return (
        <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <h2 className="mb-0">Chi tiết câu hỏi #{questionData.id_cau_hoi}</h2>
                </div>

                <div>
                    <Link to={`/admin/test/question/edit-question/${id}`} className="btn btn-primary me-2">
                        <i className="fas fa-edit me-2"></i>Chỉnh sửa
                    </Link>
                </div>
            </div>

            {/* Status badges */}
            <div className="mb-4">
                {/* <span className={`${typeBadge.class} me-2`}>{typeBadge.text}</span>
                <span className={`${difficultyBadge.class} me-2`}>{difficultyBadge.text}</span>
                <span className={statusBadge.class}>{statusBadge.text}</span> */}
            </div>

            <div className="row">
                {/* Main Content */}
                <div className="col-lg-8">
                    {/* Question Content */}
                    {questionData?.noi_dung ? (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <i className="fas fa-question-circle me-2"></i>Nội dung câu hỏi
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="alert alert-light" role="alert">
                                    <p className="mb-0 fs-5">{questionData?.noi_dung}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {questionData?.doan_van && questionData?.doan_van.noi_dung ? (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <i className="fas fa-question-circle me-2"></i>Nội dung đoạn văn
                                </h5>
                            </div>
                            <h3 className="mb-0 px-3">{questionData?.doan_van.tieu_de}</h3>
                            <div className="card-body">
                                <div className="alert alert-light" role="alert">
                                    <p className="mb-0 fs-5">{questionData?.doan_van.noi_dung}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* Hiển thị hình ảnh minh họa đoạn văn nếu có */}
                    {questionData?.doan_van?.danh_sach_phuong_tien?.length > 0 && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <i className="fas fa-images me-2"></i>Hình ảnh minh họa đoạn văn
                                </h5>
                            </div>
                            <div className="card-body d-flex flex-wrap gap-3">
                                {questionData.doan_van.danh_sach_phuong_tien
                                    .filter((pt) => pt.loai_phuong_tien === 'hinh_anh')
                                    .map((pt) => (
                                        <img
                                            key={pt.id_phuong_tien}
                                            src={pt.url_phuong_tien}
                                            alt="Đoạn văn minh họa"
                                            className="img-fluid rounded border"
                                            style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Media Content */}
                    {(questionData?.hinh_anh || questionData?.am_thanh) && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <i className="fas fa-photo-video me-2"></i>Media
                                </h5>
                            </div>
                            <div className="card-body">
                                {questionData?.hinh_anh && (
                                    <div className="mb-4">
                                        <h6 className="fw-bold text-muted mb-2">
                                            <i className="fas fa-image me-2"></i>Hình ảnh
                                        </h6>
                                        <img
                                            src={questionData?.hinh_anh?.url_phuong_tien}
                                            alt="Question image"
                                            className="img-fluid rounded border"
                                            style={{ maxHeight: '400px' }}
                                        />
                                    </div>
                                )}

                                {questionData?.am_thanh && (
                                    <div>
                                        <h6 className="fw-bold text-muted mb-2">
                                            <i className="fas fa-volume-up me-2"></i>Audio
                                        </h6>
                                        <div className="mt-3">
                                            <audio controls className="w-100" style={{ maxWidth: '400px' }}>
                                                <source src={questionData?.am_thanh?.url_phuong_tien} />
                                                Trình duyệt của bạn không hỗ trợ phát audio.
                                            </audio>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Answer Choices */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-list-ul me-2"></i>Lựa chọn đáp án
                            </h5>
                        </div>
                        <div className="card-body">
                            {questionData?.lua_chon?.map((choice) => (
                                <div
                                    key={choice.ky_tu_lua_chon}
                                    className={`border rounded p-3 mb-3 ${
                                        choice.ky_tu_lua_chon === questionData?.dap_an_dung
                                            ? 'border-success bg-success bg-opacity-10'
                                            : 'border-light bg-light'
                                    }`}
                                >
                                    <div className="d-flex align-items-start">
                                        <span
                                            className={`badge ${
                                                choice.ky_tu_lua_chon === questionData?.dap_an_dung
                                                    ? 'bg-success'
                                                    : 'bg-secondary'
                                            } me-3 fs-6 d-flex align-items-center justify-content-center`}
                                            style={{ width: '32px', height: '32px' }}
                                        >
                                            {choice.ky_tu_lua_chon}
                                        </span>
                                        <div className="flex-grow-1">
                                            <p className="mb-0">{choice.noi_dung}</p>
                                        </div>
                                        {choice.ky_tu_lua_chon === questionData?.dap_an_dung && (
                                            <span className="badge bg-success rounded-pill">
                                                <i className="fas fa-check me-1"></i>Đáp án đúng
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Explanation */}
                    {questionData?.giai_thich && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <i className="fas fa-lightbulb me-2"></i>Giải thích
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="alert alert-info border-start border-info border-4">
                                    <i className="fas fa-info-circle me-2"></i>
                                    {questionData?.giai_thich}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-lg-4">
                    {/* Question Info */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-info-circle me-2"></i>Thông tin câu hỏi
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted">ID câu hỏi</label>
                                    <p className="mb-0 font-monospace fw-bold">{questionData?.id_cau_hoi}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted">Phần thi</label>
                                    <span className={`${typeBadge.class} ms-2`}>{typeBadge.text}</span>
                                    <p className="mb-1 fw-semibold">{questionData?.phan?.ten_phan}</p>
                                    <small className="text-muted">{questionData?.phan?.mo_ta}</small>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted">Mức độ khó</label>
                                    <div>
                                        <span className={difficultyBadge.class}>{difficultyBadge.text}</span>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted">Trạng thái</label>
                                    <div>
                                        <span className={statusBadge.class}>{statusBadge.text}</span>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted">Nguồn gốc</label>
                                    <p className="mb-0">
                                        {questionData?.nguon_goc === 'thu_cong'
                                            ? 'Thủ công'
                                            : questionData?.nguon_goc === 'nhap_excel'
                                            ? 'Nhập excel'
                                            : ''}
                                    </p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted">Thời gian tạo</label>
                                    <p className="mb-0">
                                        <i className="fas fa-calendar-alt me-2 text-muted"></i>
                                        {formatDate(questionData?.thoi_gian_tao)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailQuesionBank;
