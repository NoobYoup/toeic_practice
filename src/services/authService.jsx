import axios from 'axios';
// import axios from './customizeAxios';

const API = import.meta.env.VITE_API_BASE_URL;

const login = (data) => {
    return axios.post(`${API}/auth/login`, data);
};

const register = (data) => {
    return axios.post(`${API}/auth/register`, data);
};

const forgotPassword = (data) => {
    return axios.post(`${API}/auth/forgot-password`, data);
};

const verifyOTP = (data) => {
    return axios.post(`${API}/auth/vertify-otp`, data);
};

const resetPassword = (data) => {
    return axios.post(`${API}/auth/reset-password`, data);
};

const loginGoogle = (token) => {
    return axios.post(
        `${API}/auth/google`,
        { token }, // Request body
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
};

export { login, register, forgotPassword, verifyOTP, resetPassword, loginGoogle };
