import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const submitExamToResult = (payload) => {
    const token = localStorage.getItem('user_token');

    return axios.post(`${API}/results/submit-from-fe-react`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const submitResult = (data) => {
    const token = localStorage.getItem('user_token');

    return axios.post(`${API}/results/submit-exam`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDetailResult = (id) => {
    const token = localStorage.getItem('user_token') || localStorage.getItem('admin_token');

    if (!token) {
        return Promise.reject(new Error('Không tìm thấy token đăng nhập'));
    }

    return axios
        .get(`${API}/results/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .catch((error) => {
            console.error('Lỗi khi lấy chi tiết kết quả:', error);
            throw error; // Giữ nguyên lỗi để xử lý tiếp ở component
        });
};

const getAllResultExam = () => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/results`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getAllExamSubmit = (id, page = 1, limit = 20) => {
    const token = localStorage.getItem('user_token');

    return axios.get(`${API}/results/get-all-exam-submit/${id}?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { submitResult, getDetailResult, getAllResultExam, submitExamToResult, getAllExamSubmit };
