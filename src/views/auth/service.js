import axios from 'axios';
const API_URL = 'http://localhost:8000/';

export const loginService = dates => {
    const url = `${API_URL}api/auth/login`;
    return axios.post(url, dates);
  };