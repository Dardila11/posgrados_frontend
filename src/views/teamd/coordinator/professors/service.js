import axios from 'axios';
//const API_URL = 'https://mdquilindo.pythonanywhere.com';
const API_URL = 'http://localhost:8000'



export const CreateProfessorApi = Professor => {
  const url = `${API_URL}/api/1.0/crear_profesor/`;
  return axios.post(url, Professor);
};

export const ConsultarProfesor = professor => {
  const url = `${API_URL}/api/1.0/consultar_profesor/${professor.id}`;
  return axios.put(url, professor);
};

export const CreateFormation = professor => {
  
  const url = `${API_URL}/api/1.0/crear_formacion_academica/`;
  let token = localStorage.getItem('token')
  let sinComillas = token.slice(1,-1)
  console.log(sinComillas)
  
  return axios.post(url, professor,{ headers: {"Authorization" : `token ${sinComillas}`}});
}
