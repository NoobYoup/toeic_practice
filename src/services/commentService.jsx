import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const createComment = async (data) => {
    const token = localStorage.getItem('user_token');

    return await axios.post(`${API}/comments/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getCommentById = async (id) => {
    const token = localStorage.getItem('user_token');

    return await axios.get(`${API}/comments/list/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateComment = async (id, data) => {
    const token = localStorage.getItem('user_token');

    return await axios.patch(`${API}/comments/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteComment = async (id) => {
    const token = localStorage.getItem('user_token');

    return await axios.delete(`${API}/comments/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { createComment, getCommentById, updateComment, deleteComment };
