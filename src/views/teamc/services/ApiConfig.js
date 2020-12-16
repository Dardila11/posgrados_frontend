import axios from 'axios';

const API_URL = 'https://mdquilindo.pythonanywhere.com/';

export default axios.create({
  baseURL: API_URL
});
