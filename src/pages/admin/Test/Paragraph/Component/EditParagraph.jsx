import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect } from 'react';
import { editPassage, getPassageDetail } from '@/services/passageService';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditParagraph() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [passageData, setPassageData] = useState({
        id: id || '',
        tieu_de: '',
        noi_dung: '',
        id_phan: '7',
    });
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        // Fetch chi tiết đoạn văn theo id
        async function fetchParagraph() {
            setFetching(true);
            try {
                const res = await getPassageDetail(id);
                console.log(res.data.data);
                const data = res.data.data;
                setPassageData({
                    id: data.id_doan_van,
                    tieu_de: data.tieu_de,
                    noi_dung: data.noi_dung,
                    id_phan: String(data.id_phan),
                });
            } catch (error) {
                toast.error('Không thể tải thông tin đoạn văn!');
            }
            setFetching(false);
        }
        if (id) fetchParagraph();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await editPassage(passageData.id, passageData);
            toast.success('Cập nhật đoạn văn thành công!');
            navigate('/admin/test/paragraph');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
        }
        setLoading(false);
    };

    if (fetching) {
        return (
            <div className="text-center ">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    return (
        <>
            <h1>Sửa đoạn văn</h1>
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
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditParagraph;
