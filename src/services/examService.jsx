import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllExam = (page = 1, filters = {}) => {
    const token = localStorage.getItem('admin_token');

    const params = {
        page,
        ...filters,
    };

    return axios.get(`${API}/exams`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const getAllQuestionExam = (page = 1, filters = {}) => {
    const token = localStorage.getItem('admin_token');

    const params = {
        page,
        ...filters,
    };

    return axios.get(`${API}/exams/questions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
};

const createExam = (examData) => {
    const token = localStorage.getItem('admin_token');

    return axios.post(`${API}/exams/create`, examData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const addQuestionToExam = (examId, questionIds) => {
    const token = localStorage.getItem('admin_token');

    return axios.post(`${API}/exams/questions/add-questions/${examId}`, { ds_cau_hoi: questionIds }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const approveExam = (examId) => {
    const token = localStorage.getItem('admin_token');

    return axios.post(`${API}/exams/approve/${examId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteExam = (examId) => {
    const token = localStorage.getItem('admin_token');

    return axios.delete(`${API}/exams/delete/${examId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getDraftExam = (examId) => {
    // Ưu tiên token quản trị nếu có, nếu không thì lấy token phía người dùng (nếu được lưu)
    const adminToken = localStorage.getItem('admin_token');
    const userToken = localStorage.getItem('user_token');
    const token = adminToken || userToken || '';

    const headers = token ? {
        Authorization: `Bearer ${token}`,
    } : {};

    return axios.get(`${API}/exams/draft/${examId}`, {
        headers,
    });
};

const editExam = (examId, examData) => {
    const token = localStorage.getItem('admin_token');

    return axios.put(`${API}/exams/edit/${examId}`, examData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export { getAllExam, getAllQuestionExam, createExam, addQuestionToExam, approveExam, deleteExam, getDraftExam, editExam };
