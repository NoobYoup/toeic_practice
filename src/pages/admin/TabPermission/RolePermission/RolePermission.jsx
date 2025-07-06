import { getPermissionTable } from '@/services/roleService';
import { useState, useEffect } from 'react';
import styles from './RolePermission.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function RolePermission() {
    const [permissionTable, setPermissionTable] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPermissionTable = async () => {
        setLoading(true);
        try {
            const res = await getPermissionTable();
            console.log(res);
            const tableData = res.data?.permissions;
            setPermissionTable(Array.isArray(tableData) ? tableData : []);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPermissionTable();
    }, []);

    // Determine list of role columns from the first permission entry
    const rolesList =
        Array.isArray(permissionTable) && permissionTable.length > 0 ? Object.keys(permissionTable[0].roles) : [];

    // Toggle a specific role's permission state in the UI (local only for now)
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
                                            <th key={role} className="text-center">
                                                {ROLE_LABEL[role] || role.replace(/_/g, ' ')}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissionTable.map((permission) => (
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
                                                            onChange={() => handleToggle(permission.ma_quyen, role)}
                                                        />
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RolePermission;
//    <div className="col-12">
//         <h1>Phân quyền</h1>
//         {loading ? (
//             <div className="text-center py-4">
//                 <i className="fas fa-spinner fa-spin fa-2x"></i>
//             </div>
//         ) : (
//             <div className={`${cx('card')} card shadow bg-white`}>
//                 <div className="row" style={{ padding: '0 12px' }}>
//                     {permissionTable.length === 0 ? (
//                         <h4 className="text-center">Không có dữ liệu</h4>
//                     ) : (
//                         permissionTable.map((permission) => (
//                             <div className="card-header d-flex mb-3">
//                                 <div className="col-md-3"></div>
//                                 <div className="col-md-3 text-center">
//                                     <h4>{permission.roles}</h4>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//                 <div className="card-body">
//                     <div className={`${cx('permission-group')}`}>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Xem danh sách</strong>
//                                         <br />
//                                         <small className="text-muted">Xem danh sách người dùng</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Tạo người dùng</strong>
//                                         <br />
//                                         <small className="text-muted">Thêm người dùng mới</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Chỉnh sửa</strong>
//                                         <br />
//                                         <small className="text-muted">Sửa thông tin người dùng</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Xóa người dùng</strong>
//                                         <br />
//                                         <small className="text-muted">Xóa người dùng khỏi hệ thống</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`${cx('permission-group')}`}>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Xem đề thi</strong>
//                                         <br />
//                                         <small className="text-muted">Xem danh sách đề thi</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Tạo đề thi</strong>
//                                         <br />
//                                         <small className="text-muted">Thêm đề thi mới</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Chỉnh sửa</strong>
//                                         <br />
//                                         <small className="text-muted">Sửa nội dung đề thi</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Xóa đề thi</strong>
//                                         <br />
//                                         <small className="text-muted">Xóa đề thi khỏi hệ thống</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`${cx('permission-group')}`}>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Cài đặt hệ thống</strong>
//                                         <br />
//                                         <small className="text-muted">Thay đổi cấu hình hệ thống</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Xem báo cáo</strong>
//                                         <br />
//                                         <small className="text-muted">Truy cập các báo cáo hệ thống</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Quản lý phân quyền</strong>
//                                         <br />
//                                         <small className="text-muted">Thay đổi quyền hạn người dùng</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('permission-item')}>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <div>
//                                         <strong>Backup & Restore</strong>
//                                         <br />
//                                         <small className="text-muted">Sao lưu và khôi phục dữ liệu</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 d-flex justify-content-center">
//                                     <div className="form-check form-switch ">
//                                         <input
//                                             className="form-check-input permission-switch"
//                                             type="checkbox"
//                                             defaultChecked
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="text-end mt-4">
//                         <button className="btn btn-success">Lưu thay đổi</button>
//                     </div>
//                 </div>
//             </div>
//         )}
//     </div>
