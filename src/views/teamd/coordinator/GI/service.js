import axios from 'axios';
//const API_URL = 'https://mdquilindo.pythonanywhere.com';
const API_URL = 'http://localhost:8000'

export const CreateGIApi = GI => {
  const url = `${API_URL}/api/1.0/crear_grupo_investigacion/`;
  return axios.post(url, GI,{ headers: {'Authorization' : `token ${localStorage.getItem('token')}`}});
};
//TODO en back no esta
export const ListProfessorApi = () => {
  const url = `${API_URL}/api/1.0/consultar_profesor/`;
  return axios.get(url);
};
export const AssignDirector = (director) => {
  const url = `${API_URL}/api/1.0/crear_dirige/`
  return axios.post(url, director);
}
export const EditDirector = (director) => {
  const url = `${API_URL}/api/1.0/consultar_dirige/${director.id}/${director.gi}`
  return axios.put(url, director);
}
export const GetDirige =(gi) => {
  const url = `${API_URL}/api/1.0/consultar_dirige_gi/${gi}`
  return axios.get(url,);
}

export const ConsultUser = (idUser) => {
  const url = `${API_URL}/api/auth/consult_user_id/${idUser}`
  return axios.get(url);
}
export const ConsultInstitution = (id) => {
  const url = `${API_URL}/api/1.0/consultar_institucion_id/${id}`
  return axios.get(url);
}
export const ConsultDeparment = (id) => {
  const url = `${API_URL}/api/1.0/consultar_departamentoU_id/${id}`
  return axios.get(url);
}
export const ListGiApi = () =>{
    const url = `${API_URL}/api/1.0/consultar_gi_dep/1`
    return axios.get(url);
}
export const ConsultGi = (gi)=>{
  const url = `${API_URL}/api/1.0/consultar_gi_id/${gi.id}`
    return axios.put(url,gi);
}
export const ConsultProfesorService = () => {
  const url = `${API_URL}/api/1.0/consultar_profesor/`;
  return axios.get(url);
};


