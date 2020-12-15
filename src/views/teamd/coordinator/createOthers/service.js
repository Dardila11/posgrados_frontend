import axios from 'axios';
const API_URL = 'http://mdquilindo.pythonanywhere.com';
// const API_URL = 'http://localhost:8000';
export const CreateKnowLedgeService = area => {
  const url = `${API_URL}/api/1.0/crear_area_conocimiento/`;
  return axios.post(url, area);
};

export const CreateLineRearchService = line => {
  const url = `${API_URL}/api/1.0/crear_linea_investigacion/`;
  return axios.post(url, line);
};

export const EditarKnowLedge = area => {
  const url = `${API_URL}/api/1.0/consultar_area_conocimiento/${area.id}`;
  return axios.put(url, area);
};
export const EditarLineReseach = line => {
  const url = `${API_URL}/api/1.0/consultar_li_id/${line.id}`;
  return axios.put(url, line);
};

export const ConsultarKnowLedge = area => {
  const url = `${API_URL}/api/1.0/consultar_area_conocimiento/${area}`;
  return axios.get(url);
};
export const ConsultarLineResearch = id => {
  const URL = `${API_URL}/api/1.0/consultar_li_id/${id}`;
  return axios.get(URL);
};