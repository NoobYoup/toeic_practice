import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllPermission = () => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/permissions`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const createPermission = (permission) => {
    const token = localStorage.getItem('admin_token');

    return axios.post(`${API}/permissions/create`, permission, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const updatePermission = (permissionId, permission) => {
    const token = localStorage.getItem('admin_token');

    return axios.patch(`${API}/permissions/update/${permissionId}`, permission, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const deletePermission = (permissionId) => {
    const token = localStorage.getItem('admin_token');

    return axios.delete(`${API}/permissions/delete/${permissionId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export { getAllPermission, createPermission, updatePermission, deletePermission };
