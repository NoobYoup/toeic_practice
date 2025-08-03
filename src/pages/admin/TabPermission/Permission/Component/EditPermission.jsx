import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllPermission, updatePermission } from '@/services/permissionService';

function EditPermission() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tenQuyen, setTenQuyen] = useState('');
    const [maQuyen, setMaQuyen] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const res = await getAllPermission();
                const list = res.data?.data || res.data;
                const permission = list.find((p) => String(p.id_quyen) === String(id));
                if (!permission) throw new Error('Không tìm thấy quyền');
                setTenQuyen(permission.ten_quyen);
                setMaQuyen(permission.ma_quyen);
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || err.message);
                navigate('/admin/tab-permission/permission');
            }
            setLoading(false);
        };
        fetchDetail();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ten_quyen: tenQuyen.trim(),
                ma_quyen: maQuyen.trim().toUpperCase(),
            };

            const res = await updatePermission(id, payload);
            toast.success(res.data?.message || 'Cập nhật quyền thành công');
            navigate('/admin/tab-permission/permission');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Đã có lỗi xảy ra');
        }
        setLoading(false);
    };

    return (
        <>
            <h2 className="mb-4">Chỉnh sửa quyền</h2>
            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-5">
                            <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="tenQuyen" className="form-label">
                                    Tên quyền
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tenQuyen"
                                    value={tenQuyen}
                                    onChange={(e) => setTenQuyen(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maQuyen" className="form-label">
                                    Mã quyền
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="maQuyen"
                                    value={maQuyen}
                                    onChange={(e) => setMaQuyen(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="text-end">
                                <Link to="/admin/tab-permission/permission" className="btn btn-secondary me-2">
                                    Hủy
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default EditPermission;
