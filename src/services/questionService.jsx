import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllQuestion = (page = 1, filters = {}) => {
    const token = localStorage.getItem('admin_token');

    const params = {
        page,
        ...filters, // ví dụ: {loai_phan:'listening', muc_do_kho: 'de'}
    };

    return axios.get(`${API}/questions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const getDetailQuestion = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/questions/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const createQuestion = async ({ hinh_anh, am_thanh, data }) => {
    const token = localStorage.getItem('admin_token');

    const formData = new FormData();
    if (hinh_anh) formData.append('hinh_anh', hinh_anh);
    if (am_thanh) formData.append('am_thanh', am_thanh);
    formData.append('data', JSON.stringify(data));

    return axios.post(`${API}/questions/create`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const editQuestion = (id, data) => {
    const token = localStorage.getItem('admin_token');

    return axios.put(`${API}/questions/edit/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteQuestion = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.delete(`${API}/questions/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getAllQuestion, getDetailQuestion, createQuestion, editQuestion, deleteQuestion };
