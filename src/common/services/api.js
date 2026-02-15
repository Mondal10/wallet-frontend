import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_WALLET_API_URL_V1}/v1`,
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

export default api;