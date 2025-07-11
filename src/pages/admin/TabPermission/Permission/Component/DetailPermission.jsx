import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetailPermission } from '@/services/permissionService';

function DetailPermission() {
    const { id } = useParams();
    const [permission, setPermission] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchPermission = async () => {
        try {
            setLoading(true);
            const res = await getDetailPermission(id);

            setPermission(res.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPermission();
    }, [id]);

    return (
        <div>
            {loading ? (
                <div className="text-center py-4">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                </div>
            ) : (
                <>
                    <h5 className="fw-bold mb-3">Thông tin quyền</h5>

                    <div className="row g-3">
                        <div className="col-md-3">
                            <strong>ID: </strong> {permission?.id_quyen}
                        </div>
                        <div className="col-md-3">
                            <strong>Tên quyền:</strong> {permission?.ten_quyen}
                        </div>

                        <div className="col-md-3">
                            <strong>Mã quyền:</strong> {permission?.ma_quyen}
                        </div>

                        <div className="col-md-3">
                            <strong>Thời gian tạo:</strong> {new Date(permission?.thoi_gian_tao).toLocaleString()}
                        </div>
                        <div className="col-md-3">
                            <strong>Thời gian cập nhật:</strong>{' '}
                            {new Date(permission?.thoi_gian_cap_nhat).toLocaleString()}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default DetailPermission;
