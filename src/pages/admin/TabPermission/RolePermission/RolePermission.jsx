import { getPermissionTable, updatePermissionTable } from '@/services/roleService';
import { refreshToken } from '@/services/authService';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from './RolePermission.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function RolePermission() {
    const [permissionTable, setPermissionTable] = useState([]);
    const [initialPermissionTable, setInitialPermissionTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchPermissionTable = async () => {
        setLoading(true);
        try {
            const res = await getPermissionTable();
            const raw = res.data?.permissions || {};

            const flat = [];
            Object.entries(raw).forEach(([group, list]) => {
                list.forEach((perm) => {
                    const rolesObj = {};
                    const roleIds = {};
                    (perm.roles || []).forEach((r) => {
                        rolesObj[r.ten_vai_tro] = r.co_quyen;
                        roleIds[r.ten_vai_tro] = r.id_vai_tro;
                    });
                    flat.push({ ...perm, roles: rolesObj, roleIds, group });
                });
            });
            const tableData = flat;
            setPermissionTable(Array.isArray(tableData) ? tableData : []);
            // Lưu lại bản deep copy làm dữ liệu gốc
            setInitialPermissionTable(JSON.parse(JSON.stringify(Array.isArray(tableData) ? tableData : [])));
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPermissionTable();
    }, []);

    const rolesList =
        permissionTable.length > 0 ? Array.from(new Set(permissionTable.flatMap((p) => Object.keys(p.roles)))) : [];

    const handleToggle = (ma_quyen, roleKey) => {
        setPermissionTable((prev) =>
            prev.map((p) =>
                p.ma_quyen === ma_quyen ? { ...p, roles: { ...p.roles, [roleKey]: !p.roles[roleKey] } } : p,
            ),
        );
    };

    const ROLE_LABEL = {
        giang_vien: 'Giảng viên',
        quan_tri_vien: 'Quản trị viên',
        hoc_vien: 'Học viên',
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const roleIdMap = permissionTable.reduce((acc, p) => {
                if (p.roleIds) {
                    Object.entries(p.roleIds).forEach(([key, id]) => {
                        if (!acc[key]) acc[key] = id;
                    });
                }
                return acc;
            }, {});

            // So sánh thay đổi từng role
            let hasChange = false;
            for (const roleKey of rolesList) {
                // Lấy danh sách quyền hiện tại và ban đầu cho role này
                const currentPerms = permissionTable
                    .filter((p) => p.roles[roleKey])
                    .map((p) => p.ma_quyen)
                    .sort();
                const initialPerms = initialPermissionTable
                    .filter((p) => p.roles[roleKey])
                    .map((p) => p.ma_quyen)
                    .sort();

                // So sánh
                const isChanged = JSON.stringify(currentPerms) !== JSON.stringify(initialPerms);
                if (isChanged) {
                    hasChange = true;
                    const roleId = roleIdMap[roleKey];
                    if (!roleId) continue;
                    const payload = { ds_ma_quyen: currentPerms };

                    try {
                        await updatePermissionTable(roleId, payload);
                        toast.success(`Cập nhật quyền cho ${ROLE_LABEL[roleKey] || roleKey} thành công!`);
                        const ress = await refreshToken();
                        localStorage.setItem('access_token', ress.data.token);
                    } catch {
                        toast.error(`Cập nhật quyền cho ${ROLE_LABEL[roleKey] || roleKey} thất bại!`);
                    }
                }
            }
            if (!hasChange) {
                toast.info('Không có thay đổi nào để lưu.');
            } else {
                // Sau khi lưu thành công, cập nhật lại dữ liệu gốc
                setInitialPermissionTable(JSON.parse(JSON.stringify(permissionTable)));
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setSaving(false);
    };

    return (
        <div className="col-12">
            <h1>Phân quyền</h1>
            <div className={`${cx('card')} card shadow bg-white`}>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-4">
                            <i className="fas fa-spinner fa-spin fa-2x"></i>
                        </div>
                    ) : permissionTable.length === 0 ? (
                        <h4 className="text-center">Không có dữ liệu</h4>
                    ) : (
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Quyền</th>
                                        {rolesList.map((role) => (
                                            <th key={role} className="text-center text-capitalize">
                                                {role}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(
                                        permissionTable.reduce((acc, p) => {
                                            (acc[p.group] = acc[p.group] || []).push(p);
                                            return acc;
                                        }, {}),
                                    ).map(([groupName, perms]) => (
                                        <React.Fragment key={groupName}>
                                            <tr className="table-secondary">
                                                <th colSpan={rolesList.length + 1}>{groupName}</th>
                                            </tr>
                                            {perms.map((permission) => (
                                                <tr key={permission.ma_quyen}>
                                                    <td width="35%">
                                                        <strong>{permission.ten_quyen}</strong>
                                                        <br />
                                                        <small className="text-muted">{permission.ma_quyen}</small>
                                                    </td>
                                                    {rolesList.map((role) => (
                                                        <td key={role} className="text-center">
                                                            <div className="form-check form-switch d-flex justify-content-center">
                                                                <input
                                                                    className="form-check-input permission-switch"
                                                                    type="checkbox"
                                                                    checked={permission.roles[role]}
                                                                    // disabled={role === 'quan_tri_vien'}
                                                                    onChange={() =>
                                                                        handleToggle(permission.ma_quyen, role)
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="text-end mt-3">
                        {user.permissions.includes('ROLE_PERMISSION') ? (
                            <button className="btn btn-success" onClick={handleSave} disabled={saving}>
                                {saving && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Lưu thay đổi
                            </button>
                        ) : (
                            <button className="btn btn-success" disabled>
                                Lưu thay đổi
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RolePermission;
