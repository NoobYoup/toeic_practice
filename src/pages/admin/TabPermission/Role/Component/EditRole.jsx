import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateRole, detailRole } from '@/services/roleService';

function EditRole() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tenVaiTro, setTenVaiTro] = useState('');
    const [moTa, setMoTa] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            setFetching(true);
            try {
                const res = await detailRole(id);
                const data = res.data.data;
                setTenVaiTro(data.ten_vai_tro || '');
                setMoTa(data.mo_ta || '');
            } catch (err) {
                console.error(err);
                toast.error('Không thể lấy thông tin vai trò');
            }
            setFetching(false);
        };
        fetchRole();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ten_vai_tro: tenVaiTro.trim(),
                mo_ta: moTa.trim(),
            };
            const res = await updateRole(id, payload);
            toast.success(res.data?.message);
            navigate('/admin/permission/role');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    if (fetching) {
        return (
            <div className="text-center py-5">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }

    return (
        <>
            <h2 className="mb-4">Chỉnh sửa vai trò</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tenVaiTro" className="form-label">
                                Tên vai trò
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="tenVaiTro"
                                placeholder="Nhập tên vai trò"
                                value={tenVaiTro}
                                onChange={(e) => setTenVaiTro(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="moTa" className="form-label">
                                Mô tả
                            </label>
                            <textarea
                                className="form-control"
                                id="moTa"
                                rows="3"
                                placeholder="Mô tả ngắn về vai trò"
                                value={moTa}
                                onChange={(e) => setMoTa(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="text-end">
                            <Link to="/admin/permission/role" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditRole;
