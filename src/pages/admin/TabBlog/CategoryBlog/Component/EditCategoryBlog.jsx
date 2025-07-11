import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDetailCategoryBlog, updateCategoryBlog } from '@/services/categoryBlogService';
import { useNavigate } from 'react-router-dom';

function EditCategoryBlog() {
    const { id } = useParams();
    const [categoryBlog, setCategoryBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tenDanhMuc, setTenDanhMuc] = useState('');
    const [moTa, setMoTa] = useState('');
    const navigate = useNavigate();

    const fetchCategoryBlog = async () => {
        setLoading(true);
        try {
            const res = await getDetailCategoryBlog(id);
            setCategoryBlog(res.data.data);
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

        setLoading(true);
        try {
            const payload = {
                ten_danh_muc: tenDanhMuc.trim(),
                mo_ta: moTa.trim(),
            };
            console.log(payload);
            const res = await updateCategoryBlog(id, payload);
            toast.success(res.data?.message);
            navigate('/admin/tab-blog/category-blog');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategoryBlog();
    }, [id]);

    return (
        <div>
            <h5 className="fw-bold mb-3">Sửa danh mục</h5>
            {loading ? (
                <div className="text-center py-4">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="tenDanhMuc" className="form-label">
                            Tên danh mục
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tenDanhMuc"
                            placeholder="Nhập tên danh mục"
                            value={tenDanhMuc}
                            onChange={(e) => setTenDanhMuc(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="moTa" className="form-label">
                            Mô tả
                        </label>
                        <textarea
                            className="form-control"
                            id="moTa"
                            placeholder="Nhập mô tả"
                            value={moTa}
                            onChange={(e) => setMoTa(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary ms-auto" disabled={loading}>
                            {loading && <i className="fa-solid fa-spinner fa-spin me-2"></i>}
                            Cập nhật danh mục
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default EditCategoryBlog;
