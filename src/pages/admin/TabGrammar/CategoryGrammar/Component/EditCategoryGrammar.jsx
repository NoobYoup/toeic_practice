import { useState, useEffect } from 'react';
import { updateCategoryGrammar, getDetailCategoryGrammar } from '@/services/categoryGrammar';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function EditCategoryGrammar() {
    const { id } = useParams();
    const [tenDanhMuc, setTenDanhMuc] = useState('');
    const [moTa, setMoTa] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const fetchCategoryGrammar = async () => {
        setLoading(true);
        try {
            const res = await getDetailCategoryGrammar(id);
            setTenDanhMuc(res.data.data.ten_danh_muc);
            setMoTa(res.data.data.mo_ta);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        try {
            const payload = {
                ten_danh_muc: tenDanhMuc.trim(),
                mo_ta: moTa.trim(),
            };
            const res = await updateCategoryGrammar(id, payload);
            toast.success(res.data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }

        setLoadingSubmit(false);
    };

    useEffect(() => {
        fetchCategoryGrammar();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-4">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }
    return (
        <div className="container-fluid">
            <h1>Sửa danh mục ngữ pháp</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ten_danh_muc">Tên danh mục</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ten_danh_muc"
                        name="ten_danh_muc"
                        value={tenDanhMuc}
                        onChange={(e) => setTenDanhMuc(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mo_ta">Mô tả</label>
                    <textarea
                        className="form-control"
                        id="mo_ta"
                        name="mo_ta"
                        value={moTa}
                        onChange={(e) => setMoTa(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary" disabled={loadingSubmit}>
                        {loadingSubmit && <i className="fa-solid fa-spinner fa-spin me-2"></i>}
                        Sửa danh mục
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditCategoryGrammar;
