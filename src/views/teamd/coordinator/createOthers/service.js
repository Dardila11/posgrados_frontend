import axios from 'axios';
const API_URL = 'http://mdquilindo.pythonanywhere.com';
// const API_URL = 'http://localhost:8000';
export const CreateKnowLedgeService = area => {
  const url = `${API_URL}/api/knowledge_area/`;
  return axios.post(url, area);
};

export const CreateLineRearchService = line => {
  const url = `${API_URL}/api/investigation_line/`;
  return axios.post(url, line);
};

export const EditarKnowLedge = area => {
  const url = `${API_URL}/api/knowledge_area/${area.id}/`;
  return axios.put(url, area);
};
export const EditarLineReseach = line => {
  const url = `${API_URL}/api/investigation_line/${line.id}/`;
  return axios.put(url, line);
};

export const ConsultarKnowLedge = area => {
  const url = `${API_URL}/api/knowledge_area/${area}`;
  return axios.get(url);
};
export const ConsultarLineResearch = id => {
  const URL = `${API_URL}/api/investigation_line/${id}`;
  return axios.get(URL);
};