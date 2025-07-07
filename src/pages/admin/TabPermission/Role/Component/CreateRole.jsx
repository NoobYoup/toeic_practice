import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createRole } from '@/services/roleService';

function CreateRole() {
    const [tenVaiTro, setTenVaiTro] = useState('');
    const [moTa, setMoTa] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const payload = {
                ten_vai_tro: tenVaiTro.trim(),
                mo_ta: moTa.trim(),
                is_admin: isAdmin,
            };
            console.log(payload);
            const res = await createRole(payload);
            toast.success(res.data?.message);
            navigate('/admin/tab-permission/role');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <>
            <h2 className="mb-4">Thêm vai trò</h2>
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
                                placeholder="Nhập tên vai trò (ví dụ: quan_ly_noi_dung)"
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
                        <div className="mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label htmlFor="isAdmin" className="ms-2 form-label">
                                Là quản trị viên
                            </label>
                        </div>
                        <div className="text-end">
                            <Link to="/admin/permission/role" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Tạo vai trò
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateRole;
