import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllCategoryGrammar = (page = 1) => {
    const token = localStorage.getItem('admin_token');

    const params = {
        page,
    };

    return axios.get(`${API}/category-grammars`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const createCategoryGrammar = (data) => {
    const token = localStorage.getItem('admin_token');
    return axios.post(`${API}/category-grammars/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteCategoryGrammar = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.delete(`${API}/category-grammars/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailCategoryGrammar = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.get(`${API}/category-grammars/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateCategoryGrammar = (id, data) => {
    const token = localStorage.getItem('admin_token');
    return axios.patch(`${API}/category-grammars/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export {
    getAllCategoryGrammar,
    createCategoryGrammar,
    deleteCategoryGrammar,
    getDetailCategoryGrammar,
    updateCategoryGrammar,
};
