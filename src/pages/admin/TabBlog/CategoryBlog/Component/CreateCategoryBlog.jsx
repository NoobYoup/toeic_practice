import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCategoryBlog } from '@/services/categoryBlogService';

function CreateCategoryBlog() {
    const navigate = useNavigate();
    const [tenDanhMuc, setTenDanhMuc] = useState('');
    const [moTa, setMoTa] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const payload = {
                ten_danh_muc: tenDanhMuc.trim(),
                mo_ta: moTa.trim(),
            };
            console.log(payload);
            const res = await createCategoryBlog(payload);
            toast.success(res.data?.message);
            navigate('/admin/tab-blog/category-blog');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Thêm danh mục</h2>

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
                        Thêm danh mục
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCategoryBlog;
