import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllGrammar = (page) => {
    const token = localStorage.getItem('admin_token');

    const params = {
        page,
    };

    return axios.get(`${API}/grammars`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const createGrammar = (data) => {
    const token = localStorage.getItem('admin_token');
    return axios.post(`${API}/grammars/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailGrammar = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.get(`${API}/grammars/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteGrammar = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.delete(`${API}/grammars/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateGrammar = (id, data) => {
    const token = localStorage.getItem('admin_token');
    return axios.put(`${API}/grammars/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getGrammarHome = (page = 1, filters = {}) => {
    const token = localStorage.getItem('admin_token');
    const params = {
        page,
    };
    if (filters.danh_muc) {
        params.id_danh_muc = filters.danh_muc;
    }
    return axios.get(`${API}/grammars/home`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

export { getAllGrammar, deleteGrammar, createGrammar, getDetailGrammar, updateGrammar, getGrammarHome };
