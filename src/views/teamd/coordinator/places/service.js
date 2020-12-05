import axios from 'axios';
const API_URL = 'https://mdquilindo.pythonanywhere.com/';

export const CreateCountryService = Country => {
  const url = `${API_URL}/api/1.0/crear_pais/`;
  return axios.post(url, Country);
};
export const CreateDeparmentService = Deparment => {
  const url = `${API_URL}/api/1.0/crear_departamento/`;
  return axios.post(url, Deparment);
};
export const CreateCityService = City => {
  const url = `${API_URL}/api/1.0/crear_ciudad/`;
  return axios.post(url, City);
};
export const CreateInstitutionService = Institution => {
  const url = `${API_URL}/api/1.0/crear_institucion/`;
  return axios.post(url, Institution);
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

//TODO

// export const listInstitutions = (idDepartamento) => {

//     const url= `${API_URL}/api/1.0/consultar_ciudad_departamento/${idDepartamento}`;
//     return axios.get(url);
// }
