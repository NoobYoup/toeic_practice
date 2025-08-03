import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPermission } from '@/services/permissionService';

function CreatePermission() {
    const [tenQuyen, setTenQuyen] = useState('');
    const [maQuyen, setMaQuyen] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ten_quyen: tenQuyen.trim(),
                ma_quyen: maQuyen.trim().toUpperCase(),
            };
            const res = await createPermission(payload);

            toast.success(res.data?.message);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <>
            <h2 className="mb-4">Thêm quyền</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tenQuyen" className="form-label">
                                Tên quyền
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="tenQuyen"
                                placeholder="Nhập tên quyền"
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
                                placeholder="Nhập mã quyền (ví dụ: RESULT_VIEW)"
                                value={maQuyen}
                                onChange={(e) => setMaQuyen(e.target.value)}
                            />
                        </div>
                        <div className="text-end">
                            <Link to="/admin/permission" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Tạo quyền
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreatePermission;
