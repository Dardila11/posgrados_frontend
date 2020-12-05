import axios from 'axios';
const API_URL = 'https://mdquilindo.pythonanywhere.com';

export const CreateProfessorApi = Professor => {
  const url = `${API_URL}/api/1.0/crear_profesor/`;
  return axios.post(url, Professor);
};
