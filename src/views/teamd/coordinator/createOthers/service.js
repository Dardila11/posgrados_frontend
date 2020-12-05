import axios from 'axios';
const API_URL = 'https://mdquilindo.pythonanywhere.com';

export const CreateKnowLedgeService = area => {
  const url = `${API_URL}/api/1.0/crear_area_conocimiento/`;
  return axios.post(url, area);
};

export const CreateLineRearchService = line => {
  const url = `${API_URL}/api/1.0/crear_linea_investigacion/`;
  return axios.post(url, line);
};
