import { useParams } from 'react-router-dom';
import { detailRole } from '@/services/roleService';
import { useEffect, useState } from 'react';

function DetailRole() {
    const { id } = useParams();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            setLoading(true);
            try {
                const res = await detailRole(id);
                console.log(res);

                setRole(res.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchRole();
    }, [id]);
    return (
        <div>
            <h5 className="fw-bold mb-3">Thông tin vai trò</h5>

            <div className="row g-3">
                <div className="col-md-3">
                    <strong>ID: </strong> {role.id_vai_tro}
                </div>
                <div className="col-md-3">
                    <strong>Tên vai trò:</strong> {''}
                    <span className="badge bg-primary">
                        {role.ten_vai_tro === 'quan_tri_vien'
                            ? 'Quản trị viên'
                            : role.ten_vai_tro === 'nguoi_dung'
                            ? 'Người dùng'
                            : 'Giảng viên'}
                    </span>
                </div>

                <div className="col-md-3">
                    <strong>Mô tả:</strong> {role.mo_ta}
                </div>

                <div className="col-md-3">
                    <strong>Thời gian tạo:</strong> {new Date(role.thoi_gian_tao).toLocaleString()}
                </div>
                <div className="col-md-3">
                    <strong>Thời gian cập nhật:</strong> {new Date(role.thoi_gian_cap_nhat).toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default DetailRole;
