import { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllCategoryGrammar } from '@/services/categoryGrammar';
import { createGrammar } from '@/services/grammarService';
import { toast } from 'react-toastify';

function CreateGrammar() {
    const [formData, setFormData] = useState({
        id_danh_muc: null,
        tieu_de: '',
        noi_dung: '',
        ghi_chu: '',
        vi_du: '',
    });
    const [loading, setLoading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategoryGrammar();
                const options = res.data.data.map((cat) => ({
                    value: cat.id_danh_muc,
                    label: cat.ten_danh_muc,
                }));
                setCategoryOptions(options);
            } catch {
                toast.error('Lỗi khi tải danh mục ngữ pháp');
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({ ...formData, id_danh_muc: selectedOption ? selectedOption.value : null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.id_danh_muc) {
            toast.error('Vui lòng chọn danh mục');
            return;
        }
        if (!formData.tieu_de.trim() || !formData.noi_dung.trim()) {
            toast.error('Vui lòng nhập tiêu đề và nội dung');
            return;
        }
        setLoading(true);
        try {
            const payload = {
                id_danh_muc: formData.id_danh_muc,
                tieu_de: formData.tieu_de.trim(),
                noi_dung: formData.noi_dung.trim(),
                ghi_chu: formData.ghi_chu.trim(),
                vi_du: formData.vi_du.trim(),
            };
            const res = await createGrammar(payload);
            toast.success(res.data.message || 'Tạo ngữ pháp thành công!');
            setFormData({
                id_danh_muc: null,
                tieu_de: '',
                noi_dung: '',
                ghi_chu: '',
                vi_du: '',
            });
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <h1>Tạo ngữ pháp mới</h1>
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
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Nội dung</label>
                    <textarea
                        className="form-control"
                        name="noi_dung"
                        value={formData.noi_dung}
                        onChange={handleChange}
                        required
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
                        Tạo ngữ pháp
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateGrammar;
