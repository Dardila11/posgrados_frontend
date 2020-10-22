import axios from 'axios';

const API_URL = 'https://my.api.mockaroo.com/';
const API_KEY = 'f0256220';

export default axios.create({
  baseURL: API_URL,
  params: {
    key: API_KEY
  },
  headers: {
    'Content-type': 'application/json'
  }
});
