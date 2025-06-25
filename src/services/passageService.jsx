import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllPassage = (page, filters = {}) => {
    const token = localStorage.getItem('admin_token');

    const params = {
        page,
        ...filters,
    };

    return axios.get(`${API}/passages`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const createPassage = (passageData) => {
    const token = localStorage.getItem('admin_token');

    // Nếu dữ liệu được truyền vào là FormData (upload ảnh) thì đặt header multipart/form-data
    const isFormData = passageData instanceof FormData;

    return axios.post(`${API}/passages/create`, passageData, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...(isFormData && { 'Content-Type': 'multipart/form-data' }),
        },
    });
};

const editPassage = (id, data) => {
    const token = localStorage.getItem('admin_token');

    return axios.put(`${API}/passages/edit/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deletePassage = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.delete(`${API}/passages/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getPassageDetail = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/passages/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getAllPassage, createPassage, editPassage, deletePassage, getPassageDetail };
