import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllCategoryBlog = (page = 1) => {
    const token = localStorage.getItem('admin_token');

    const params = {
        page,
    };

    return axios.get(`${API}/categorys`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const createCategoryBlog = (data) => {
    const token = localStorage.getItem('admin_token');
    return axios.post(`${API}/categorys/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateCategoryBlog = (id, data) => {
    const token = localStorage.getItem('admin_token');
    return axios.put(`${API}/categorys/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteCategoryBlog = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.delete(`${API}/categorys/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailCategoryBlog = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.get(`${API}/categorys/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getAllCategoryBlog, createCategoryBlog, updateCategoryBlog, deleteCategoryBlog, getDetailCategoryBlog };
