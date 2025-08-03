import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { getAllCategoryGrammar } from '@/services/categoryGrammar';
import { getDetailGrammar, updateGrammar } from '@/services/grammarService';
import { toast } from 'react-toastify';

function EditGrammar() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id_danh_muc: null,
        tieu_de: '',
        noi_dung: '',
        ghi_chu: '',
        vi_du: '',
    });
    const [loading, setLoading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [initLoading, setInitLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catRes = await getAllCategoryGrammar();
                const options = catRes.data.data.map((cat) => ({
                    value: Number(cat.id_danh_muc),
                    label: cat.ten_danh_muc,
                }));

                setCategoryOptions(options);

                const grammarRes = await getDetailGrammar(id);
                const grammar = grammarRes.data.data;
                setFormData({
                    id_danh_muc: Number(grammar.id_danh_muc),
                    tieu_de: grammar.tieu_de || '',
                    noi_dung: grammar.noi_dung || '',
                    ghi_chu: grammar.ghi_chu || '',
                    vi_du: grammar.vi_du || '',
                });
            } catch {
                toast.error('Lỗi khi tải dữ liệu');
            } finally {
                setInitLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({ ...formData, id_danh_muc: selectedOption ? Number(selectedOption.value) : null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                id_danh_muc: formData.id_danh_muc,
                tieu_de: formData.tieu_de.trim(),
                noi_dung: formData.noi_dung.trim(),
                ghi_chu: formData.ghi_chu.trim(),
                vi_du: formData.vi_du.trim(),
            };

            const res = await updateGrammar(id, payload);
            toast.success(res.data.message || 'Cập nhật ngữ pháp thành công!');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };

    if (initLoading) {
        return (
            <div className="text-center py-5">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h1>Chỉnh sửa ngữ pháp</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Danh mục ngữ pháp</label>
                    <Select
                        options={categoryOptions}
                        value={categoryOptions.find((opt) => opt.value === formData.id_danh_muc) || null}
                        onChange={handleSelectChange}
                        placeholder="Chọn danh mục"
                        isClearable
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Tiêu đề</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tieu_de"
                        value={formData.tieu_de}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Nội dung</label>
                    <textarea
                        className="form-control"
                        name="noi_dung"
                        value={formData.noi_dung}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Ghi chú</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ghi_chu"
                        value={formData.ghi_chu}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Ví dụ</label>
                    <input
                        type="text"
                        className="form-control"
                        name="vi_du"
                        value={formData.vi_du}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <i className="fa-solid fa-spinner fa-spin me-2"></i>}
                        Cập nhật ngữ pháp
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditGrammar;
