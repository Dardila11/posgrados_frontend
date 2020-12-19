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
//TODO en back no esta
