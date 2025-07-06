import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllRole = () => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/roles`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const createRole = (role) => {
    const token = localStorage.getItem('admin_token');

    return axios.post(`${API}/roles/create`, role, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const updateRole = (roleId, role) => {
    const token = localStorage.getItem('admin_token');

    return axios.patch(`${API}/roles/update/${roleId}`, role, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const detailRole = (roleId) => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/roles/detail/${roleId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const deleteRole = (roleId) => {
    const token = localStorage.getItem('admin_token');

    return axios.delete(`${API}/roles/delete/${roleId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const getPermissionTable = () => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/roles/permissions-table`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const updatePermissionTable = (permissionId, permission) => {
    const token = localStorage.getItem('admin_token');

    return axios.post(`${API}/roles/permissions/${permissionId}`, permission, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export { getAllRole, createRole, updateRole, deleteRole, detailRole, getPermissionTable, updatePermissionTable };
