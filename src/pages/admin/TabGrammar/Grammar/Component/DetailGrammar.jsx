import { useState, useEffect } from 'react';
import { getDetailGrammar } from '@/services/grammarService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function DetailGrammar() {
    const [grammar, setGrammar] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchGrammar();
    }, [id]);

    const fetchGrammar = async () => {
        setLoading(true);
        try {
            const res = await getDetailGrammar(id);
            setGrammar(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h5 className="fw-bold mb-3">Thông tin ngữ pháp</h5>

            <div className="row g-3">
                <div className="col-md-3">
                    <strong>ID: </strong> {grammar?.id_tai_lieu}
                </div>
                <div className="col-md-3">
                    <strong>Tiêu đề:</strong> {grammar?.tieu_de}
                </div>

                <div className="col-md-3">
                    <strong>Nội dung:</strong> {grammar?.noi_dung}
                </div>

                <div className="col-md-3">
                    <strong>Ví dụ:</strong> {grammar?.vi_du}
                </div>

                <div className="col-md-3">
                    <strong>Ghi chú:</strong> {grammar?.ghi_chu}
                </div>

                <div className="col-md-3">
                    <strong>ID Danh mục:</strong> {grammar?.id_danh_muc}
                </div>

                <div className="col-md-3">
                    <strong>Người tạo:</strong> {grammar?.nguoi_tao}
                </div>

                <div className="col-md-3">
                    <strong>Thời gian tạo:</strong> {new Date(grammar?.thoi_gian_tao).toLocaleString()}
                </div>
                <div className="col-md-3">
                    <strong>Thời gian cập nhật:</strong> {new Date(grammar?.thoi_gian_cap_nhat).toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default DetailGrammar;
