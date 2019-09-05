import axios from 'axios';

const BASE_URL = 'https://api.github.com/graphql';

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer abc54d2d877be83c6fe4dc83b84d2dcb0b253712`
    }
});

export default axiosConfig;
