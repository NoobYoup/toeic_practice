import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const submitResult = (data) => {
    const token = localStorage.getItem('user_token');

    return axios.post(`${API}/results/submit-exam`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { submitResult };
