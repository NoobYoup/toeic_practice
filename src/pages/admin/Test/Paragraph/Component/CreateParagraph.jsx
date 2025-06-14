import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPassage } from '@/services/passageService';

function CreateParagraph() {
    const [passageData, setPassageData] = useState({
        tieu_de: '',
        noi_dung: '',
        id_phan: '6',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createPassage(passageData);
            navigate('/admin/test/paragraph');
            toast.success('Tạo đoạn văn thành công!');
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };
    return (
        <>
            <h1>Thêm đoạn văn mới</h1>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="question-form">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="draftExam" className="form-label">
                                        Phần
                                    </label>
                                    <select
                                        className="form-select"
                                        id="draftExam"
                                        required
                                        value={passageData.id_phan}
                                        onChange={(e) =>
                                            setPassageData((prev) => ({ ...prev, id_phan: e.target.value }))
                                        }
                                    >
                                        <option value="6">Phần 6</option>
                                        <option value="7">Phần 7</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="titlePassage" className="form-label">
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titlePassage"
                                        placeholder="Nhập tiêu đề đoạn văn"
                                        value={passageData.tieu_de}
                                        onChange={(e) =>
                                            setPassageData((prev) => ({ ...prev, tieu_de: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionContent" className="form-label">
                                Nội dung
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={passageData.noi_dung}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setPassageData((prev) => ({ ...prev, noi_dung: data }));
                                }}
                                config={{
                                    placeholder: 'Nội dung đoạn văn',
                                }}
                            />
                        </div>

                        <div className="text-end">
                            <Link to="/admin/test/paragraph" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Thêm đoạn văn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateParagraph;
