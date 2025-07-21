import React from 'react';
import QuestionResult from './QuestionResult.jsx';

function PassageGroupResult({ group, cx }) {
    if (!group || !Array.isArray(group.questions)) return null;
    const { passage, questions } = group;
    return (
        <div className="card border-0 shadow mb-4" style={{ borderRadius: '10px' }}>
            <div className="card-body">
                <div className="row p-2">
                    <div className="col-lg-8 bg-secondary-subtle rounded-3 p-4">
                        {passage && (
                            <div className="mb-4">
                                {passage.tieu_de && (
                                    <h6 className="mb-2" dangerouslySetInnerHTML={{ __html: passage.tieu_de }}></h6>
                                )}
                                {/* Nội dung đoạn văn */}
                                {passage.noi_dung && (
                                    <div className="mb-2" dangerouslySetInnerHTML={{ __html: passage.noi_dung }}></div>
                                )}
                                {/* Passage media */}
                                {Array.isArray(passage.danh_sach_phuong_tien) &&
                                    passage.danh_sach_phuong_tien.length > 0 && (
                                        <div className="d-flex flex-wrap gap-3 mb-2">
                                            {passage.danh_sach_phuong_tien.map((media) => {
                                                const isImage = /\.(jpeg|jpg|gif|png)$/.test(media.url_phuong_tien);
                                                const isAudio = /\.(mp3|wav|ogg)$/.test(media.url_phuong_tien);
                                                if (isImage) {
                                                    return (
                                                        <img
                                                            key={media.id_phuong_tien}
                                                            src={media.url_phuong_tien}
                                                            alt="passage"
                                                            className="img-fluid rounded border"
                                                            style={{ maxWidth: '100%' }}
                                                        />
                                                    );
                                                }
                                                if (isAudio) {
                                                    return (
                                                        <audio key={media.id_phuong_tien} controls className="w-100">
                                                            <source src={media.url_phuong_tien} type="audio/mpeg" />
                                                            Audio not supported.
                                                        </audio>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                    <div className="col-lg-4">
                        {questions
                            .sort((a, b) => a.globalIndex - b.globalIndex)
                            .map((item) => (
                                <QuestionResult key={item.id_cau_tra_loi} item={item} cx={cx} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PassageGroupResult;
