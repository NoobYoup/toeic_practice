import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllBlog = (page) => {
    const token = localStorage.getItem('admin_token');

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

const getAllBlogPublic = (page, filters) => {
    const params = {
        page,
        ...filters,
    };
    return axios.get(`${API}/blogs/public`, {
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

const updateBlog = (id, data) => {
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();

    formData.append('tieu_de', data.tieu_de);
    formData.append('noi_dung', data.noi_dung);
    formData.append('id_danh_muc', data.id_danh_muc);
    formData.append('hinh_anh', data.hinh_anh);

    return axios.patch(`${API}/blogs/admin-update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const deleteBlog = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.delete(`${API}/blogs/admin-delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailBlog = (id) => {
    const token = localStorage.getItem('admin_token');
    return axios.get(`${API}/blogs/admin-detail/${id}`, {
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
    const token = localStorage.getItem('admin_token');
    return axios.get(`${API}/blogs/pending`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const approvedBlog = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.patch(`${API}/blogs/approve/${id}`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const rejectedBlog = (id) => {
    const token = localStorage.getItem('admin_token');

    return axios.patch(`${API}/blogs/reject/${id}`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getMyBlog = (page) => {
    const token = localStorage.getItem('user_token');
    const params = {
        page,
    };
    return axios.get(`${API}/blogs/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const updateMyBlog = (id, data) => {
    const token = localStorage.getItem('user_token');
    const formData = new FormData();

    formData.append('tieu_de', data.tieu_de);
    formData.append('noi_dung', data.noi_dung);
    formData.append('id_danh_muc', data.id_danh_muc);
    formData.append('hinh_anh', data.hinh_anh);

    return axios.patch(`${API}/blogs/update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const getDetailMyBlog = (id) => {
    const token = localStorage.getItem('user_token');
    return axios.get(`${API}/blogs/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteMyBlog = (id) => {
    const token = localStorage.getItem('user_token');
    return axios.delete(`${API}/blogs/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailBlogPublic = (id) => {
    return axios.get(`${API}/blogs/detail-public/${id}`);
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
    getMyBlog,
    updateMyBlog,
    getDetailMyBlog,
    deleteMyBlog,
    getAllBlogPublic,
    getDetailBlogPublic,
};
