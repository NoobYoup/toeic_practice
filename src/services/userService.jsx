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
        formData.append('url_hinh_dai_dien', file); // Changed from 'url_hinh_dai_dien' to 'avatar'
        console.log('File appended:', file.name, file.type, file.size); // Debug file info
    }

    // Log formData contents for debugging
    for (let [key, value] of formData.entries()) {
        console.log(`FormData: ${key} =`, value);
    }

    return axios.patch(`${API}/users/edit/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
};

const getProfile = (token) => {
    return axios.get(`${API}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const updateProfile = (userData, file, token) => {
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
    });
    if (file) {
        formData.append('hinh_dai_dien', file);
        console.log('File appended:', file.name, file.type, file.size);
    }
    for (let [key, value] of formData.entries()) {
        console.log(`FormData: ${key} =`, value);
    }
    return axios.patch(`${API}/users/update-profile`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const changeUserStatus = (id, status) => {
    const token = localStorage.getItem('admin_token');

    return axios.put(`${API}/users/change-status/${id}`, status, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getMe = () => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export { getAllUser, getDetailUser, deleteUser, editUser, getProfile, updateProfile, changeUserStatus, getMe };
