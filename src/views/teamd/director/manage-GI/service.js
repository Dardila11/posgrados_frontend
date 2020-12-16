import axios from 'axios';
// const API_URL = 'https://mdquilindo.pythonanywhere.com';
const API_URL = 'http://localhost:8000'
export const AddKnowLedgeService = GI => {
  const url = `${API_URL}/api/1.0/crear_trabaja/`;
  return axios.post(url, GI);
};

export const AddLineRearchService = GI => {
  const url = `${API_URL}/api/1.0/crear_linea_investigacion/`;
  return axios.post(url, GI);
};
//TODO
export const ListMembersApi = GI => {
  const url = `${API_URL}/api/1.0/consultar_miembro_gi/${GI}`;
  return axios.get(url);
};
export const ConsultProfesor = id => {
  const url = `${API_URL}/api/1.0/consultar_profesor/${id}`;
  return axios.get(url);
};
export const ConsultProfesorAll = () => {
  const url = `${API_URL}/api/1.0/consultar_profesor/`;
  return axios.get(url);
};
export const ConsultUser = id => {
  const url = `${API_URL}/api/auth/consult_user_id/${id}`;
  return axios.get(url);
};
export const ConsultGi = id => {
  const url = `${API_URL}/api/1.0/consultar_gi_id/${id}`;
  return axios.get(url);
};

export const addMemberService = member => {
  const url = `${API_URL}/api/1.0/create_is_member/`;
  return axios.post(url,member);
};
export const ConsultDirige_d = (id) => {
  const url = `${API_URL}/api/1.0/consultar_dirige_d/${id}`;
  return axios.get(url);
};
export const eliminarMiembroSerivce = (info) => {
  const url = `${API_URL}/api/1.0/consultar_es_miembro/${info.professor}/${info.inv_group}`;
  return axios.put(url);
};






