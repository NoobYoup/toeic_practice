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

export { getAllExam, getAllQuestionExam, createExam };
