import axios from 'axios';

//const API_URL = 'http://mdquilindo.pythonanywhere.com';
const API_URL = 'http://localhost:8000';

export const GetKnowLedgeListService = () => {
  const URL = `${API_URL}/api/1.0/consultar_area_conocimiento/`;
  return axios.get(URL);
};

export const GetLineResearch = idArea => {
  const URL = `${API_URL}/api/1.0/consultar_li_area/${idArea}`;
  return axios.get(URL);
};

export const GetDeparmentIListService = () => {
  const URL = `${API_URL}/api/1.0/consultar_departamentoU_id/${1}`;
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

export const listDeparmentsService = idPais => {
  const url = `${API_URL}/api/1.0/consultar_departamento_pais/${idPais}`;
  return axios.get(url);
};

export const listCitiesService = idDepartamento => {
  const url = `${API_URL}/api/1.0/consultar_ciudad_departamento/${idDepartamento}`;
  return axios.get(url);
};

export const GetlistInstitutionService = () => {
  const url = `${API_URL}/api/1.0/consultar_institucion/`;
  return axios.get(url);
};
export const ConsultUserService = () => {
  const url = `${API_URL}/api/auth/consult_user`;
  return axios.get(url);
};

