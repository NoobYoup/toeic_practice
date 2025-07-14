import { useState } from 'react';
import { createCategoryGrammar } from '@/services/categoryGrammar';
import { toast } from 'react-toastify';

function CreateCategoryGrammar() {
    const [formData, setFormData] = useState({
        ten_danh_muc: '',
        mo_ta: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ten_danh_muc: formData.ten_danh_muc.trim(),
                mo_ta: formData.mo_ta.trim(),
            };
            const res = await createCategoryGrammar(payload);
            toast.success(res.data.message);
            setFormData({
                ten_danh_muc: '',
                mo_ta: '',
            });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <h1>Tạo danh mục ngữ pháp</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ten_danh_muc">Tên danh mục</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ten_danh_muc"
                        name="ten_danh_muc"
                        value={formData.ten_danh_muc}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mo_ta">Mô tả</label>
                    <textarea
                        className="form-control"
                        id="mo_ta"
                        name="mo_ta"
                        value={formData.mo_ta}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <i className="fa-solid fa-spinner fa-spin me-2"></i>}
                        Tạo danh mục
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCategoryGrammar;
