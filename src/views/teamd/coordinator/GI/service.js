import axios from 'axios';
const API_URL = 'http://mdquilindo.pythonanywhere.com';

export const CreateGIApi = GI => {
  const url = `${API_URL}/api/1.0/crear_grupo_investigacion/`;
  return axios.post(url, GI);
};
//TODO en back no esta
export const ListProfessorApi = IdGi => {
  const url = `${API_URL}/api/1.0/listar_profesor/`;
  return axios.post(url, IdGi);
};
