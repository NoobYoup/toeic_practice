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

export { getAllQuestion, getDetailQuestion };
