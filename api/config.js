import axios from 'axios';

const { API_URL } = "https://trabseg-api.herokuapp.com"

const api = axios.create({
    baseURL: API_URL,
})

export default api;