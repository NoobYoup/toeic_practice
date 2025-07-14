import { useState, useEffect } from 'react';
import { getDetailCategoryGrammar } from '@/services/categoryGrammar';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function DetailCategoryGrammar() {
    const { id } = useParams();
    const [categoryGrammar, setCategoryGrammar] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCategoryGrammar = async () => {
        setLoading(true);
        try {
            const res = await getDetailCategoryGrammar(id);
            setCategoryGrammar(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
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
            <h5 className="fw-bold mb-3">Thông tin danh mục</h5>

            <div className="row g-3">
                <div className="col-md-3">
                    <strong>ID: </strong> {categoryGrammar?.id_danh_muc}
                </div>
                <div className="col-md-3">
                    <strong>Tên danh mục:</strong> {categoryGrammar?.ten_danh_muc}
                </div>

                <div className="col-md-3">
                    <strong>Mô tả:</strong> {categoryGrammar?.mo_ta}
                </div>

                <div className="col-md-3">
                    <strong>Thời gian tạo:</strong> {new Date(categoryGrammar?.thoi_gian_tao).toLocaleString()}
                </div>
                <div className="col-md-3">
                    <strong>Thời gian cập nhật:</strong>{' '}
                    {new Date(categoryGrammar?.thoi_gian_cap_nhat).toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default DetailCategoryGrammar;
