import axios from 'axios';
// import axios from './customizeAxios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllUser = (search = '', page = 1) => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/users?search=${encodeURIComponent(search)}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailUser = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/users/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteUser = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.delete(`${API}/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const editUser = (id, userData, file) => {
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();

    // Append user data fields
    Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
    });

    // Append file if provided
    if (file) {
        formData.append('avatar', file);
    }

    return axios.put(`${API}/users/edit/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
};

const getProfile = (token) => {
    return axios.get(`${API}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export { getAllUser, getDetailUser, deleteUser, editUser, getProfile };
