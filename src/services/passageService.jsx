import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAllPassage = (page) => {
    const token = localStorage.getItem('admin_token');

    return axios.get(`${API}/passages?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getAllPassage };
// export default {
//     getAllPassage,
// };
