import axios from 'axios';

const API_URL = 'http://mdquilindo.pythonanywhere.com/';

export default axios.create({
  baseURL: API_URL
});
