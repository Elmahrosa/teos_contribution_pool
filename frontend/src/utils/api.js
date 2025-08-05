import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const contribute = async (amount, walletAddress) => {
    return await api.post('/contribute', { amount, walletAddress });
};

export const fetchContributions = async () => {
    return await api.get('/contributions');
};
