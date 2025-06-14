import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllPassage = (page) => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/passages?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const createPassage = (passageData) => {
    const token = localStorage.getItem('admin_token');

    return axios.post(`${API}/passages/create`, passageData, {
        headers: {
            Authorization: `Bearer ${token}`,
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
