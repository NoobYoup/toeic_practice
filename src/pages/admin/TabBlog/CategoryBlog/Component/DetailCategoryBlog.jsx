import { getDetailCategoryBlog } from '@/services/categoryBlogService';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function DetailCategoryBlog() {
    const { id } = useParams();
    const [categoryBlog, setCategoryBlog] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCategoryBlog = async () => {
        setLoading(true);
        try {
            const res = await getDetailCategoryBlog(id);
            setCategoryBlog(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategoryBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-4">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }
    return (
        <>
            <h5 className="fw-bold mb-3">Thông tin danh mục</h5>

            <div className="row g-3">
                <div className="col-md-3">
                    <strong>ID: </strong> {categoryBlog?.id_danh_muc}
                </div>
                <div className="col-md-3">
                    <strong>Tên danh mục:</strong> {categoryBlog?.ten_danh_muc}
                </div>

                <div className="col-md-3">
                    <strong>Mô tả:</strong> {categoryBlog?.mo_ta}
                </div>

                <div className="col-md-3">
                    <strong>Thời gian tạo:</strong> {new Date(categoryBlog?.thoi_gian_tao).toLocaleString()}
                </div>
                <div className="col-md-3">
                    <strong>Thời gian cập nhật:</strong> {new Date(categoryBlog?.thoi_gian_cap_nhat).toLocaleString()}
                </div>
            </div>
        </>
    );
}

export default DetailCategoryBlog;
