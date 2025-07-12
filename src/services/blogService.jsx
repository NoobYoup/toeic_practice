import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllBlog = (page) => {
    const token = localStorage.getItem('user_token');

    const params = {
        page,
    };

    return axios.get(`${API}/blogs`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const createBlog = (data) => {
    const token = localStorage.getItem('user_token');
    const formData = new FormData();

    formData.append('tieu_de', data.tieu_de);
    formData.append('noi_dung', data.noi_dung);
    formData.append('id_danh_muc', data.id_danh_muc);
    formData.append('hinh_anh', data.hinh_anh);

    return axios.post(`${API}/blogs/create`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const updateBlog = (id, data, file) => {
    const token = localStorage.getItem('user_token');
    const formData = new FormData();
    formData.append('tieu_de', data.tieu_de);
    formData.append('noi_dung', data.noi_dung);
    formData.append('id_danh_muc', data.id_danh_muc);
    formData.append('hinh_anh', file);
    return axios.put(`${API}/blogs/update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const deleteBlog = (id) => {
    const token = localStorage.getItem('user_token');
    return axios.delete(`${API}/blogs/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailBlog = (id) => {
    const token = localStorage.getItem('user_token');
    return axios.get(`${API}/blogs/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getAllCategory = () => {
    const token = localStorage.getItem('user_token');
    return axios.get(`${API}/categorys/get-all-categorys`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getAdminPendingBlog = () => {
    const token = localStorage.getItem('user_token');
    return axios.get(`${API}/blogs/pending`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const approvedBlog = (id) => {
    const token = localStorage.getItem('user_token');
    return axios.get(`${API}/blogs/approve/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const rejectedBlog = (id) => {
    const token = localStorage.getItem('user_token');
    return axios.get(`${API}/blogs/reject/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export {
    getAllBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getDetailBlog,
    getAllCategory,
    getAdminPendingBlog,
    approvedBlog,
    rejectedBlog,
};
