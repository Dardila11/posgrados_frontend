import axios from 'axios';
//const API_URL = 'http://mdquilindo.pythonanywhere.com';
const API_URL = 'http://localhost:8000';



export const CreateProfessorApi = Professor => {
  const url = `${API_URL}/api/1.0/crear_profesor/`;
  return axios.post(url, Professor);
};

export const ConsultarProfesor = professor => {
  const url = `${API_URL}/api/1.0/consultar_profesor/${professor.user}`;
  return axios.put(url, professor);
};
