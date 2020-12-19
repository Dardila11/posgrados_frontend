import axios from 'axios';
const API_URL = 'https://mdquilindo.pythonanywhere.com'; // url servidor

export const ConsultProgram = () => {
  // el back debe tener en cuenta que se debe consultar por departamento
  const url = `${API_URL}/program/`;
  return axios.get(url);
};
export const ConsultStudent = () => {
  // el back debe tener en cuenta que se debe consultar por departamento
  const url = `${API_URL}/student/`;
  return axios.get(url);
};

export const ConsultUserService = () => {
  const url = `${API_URL}/api/auth/consult_user`;
  return axios.get(url);
};

export const ConsultProfesorService = () => {
  const url = `${API_URL}/api/1.0/consultar_profesor/`;
  return axios.get(url);
};
export const GetDeparmentIListService = () => {
  const URL = `${API_URL}/api/1.0/consultar_departamentoU/`;
  return axios.get(URL);
};

export const GetGIforDeparment = idDeparment => {
  const URL = `${API_URL}/api/1.0/consultar_gi_dep/${idDeparment}`;
  return axios.get(URL);
};

export const listCountriesService = () => {
  const url = `${API_URL}/api/1.0/consultar_pais/`;
  return axios.get(url);
};

export const listFullCountriesService = () => {
  const url = `${API_URL}/api/1.0/full_consultar_pais/`;
  return axios.get(url);
};

export const listDeparmentsService = idPais => {
  const url = `${API_URL}/api/1.0/consultar_departamento_pais/${idPais}`;
  return axios.get(url);
};

export const listFullDeparmentsService = idPais => {
  const url = `${API_URL}/api/1.0/full_consultar_departamento_pais/${idPais}`;
  return axios.get(url);
};

export const listCitiesService = idDepartamento => {
  const url = `${API_URL}/api/1.0/consultar_ciudad_departamento/${idDepartamento}`;
  return axios.get(url);
};

export const listFullCitiesService = idDepartamento => {
  const url = `${API_URL}/api/1.0/full_consultar_ciudad_departamento/${idDepartamento}`;
  return axios.get(url);
};

export const GetlistInstitutionService = () => {
  const url = `${API_URL}/api/1.0/consultar_institucion/`;
  return axios.get(url);
};

export const GetlistFullInstitutionService = () => {
  const url = `${API_URL}/api/1.0/full_consultar_institucion/`;
  return axios.get(url);
};

//TODO en back no esta
