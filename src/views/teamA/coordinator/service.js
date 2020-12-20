import axios from 'axios';
const API_URL = 'https://mdquilindo.pythonanywhere.com';

export const registerStudent = registro => {
  const url = `${API_URL}/student/`;
  return axios.post(url, registro);
};
export const registerEnrrollment = registro => {
  const url = `${API_URL}/enrrollment/`;
  return axios.post(url, registro);
};
export const CreateUserService = user => {
  const url = `${API_URL}/api/auth/create_user`;
  return axios.post(url, user);
};
export const UpdateStudent = registro => {
  const url = `${API_URL}/api/1.0/updateStudent/`;
  return axios.put(url, registro);
};
export const registerProject = registro => {
  console.log('axios -', registro);
  const url = `${API_URL}/project/`;
  return axios.post(url, registro);
};
export const ConsultUserService = () => {
  const url = `${API_URL}/api/auth/consult_user`;
  return axios.get(url);
};
export const ConsultProfesorService = () => {
  const url = `${API_URL}/api/1.0/consultar_profesor/`;
  return axios.get(url);
};
export const registerAgreement = (registro) =>{
     console.log("axios -",registro)
    const url= `${API_URL}/agreement/`;
    return axios.post(url,registro);
    }
export const registerDirector = (registro) =>{
      console.log("axios -",registro)
      const url= `${API_URL}/createstudentprofessor`;
      return axios.post(url,registro);
  }
export const registerGrant = (registro) =>{
    console.log("axios -",registro)
    const url= `${API_URL}/grant/`;
    return axios.post(url,registro);
}
export const getStudents = () =>{
  const url= `${API_URL}/student/`;
  return axios.get(url);
}
export const registerSpecificObjective = registro => {
  const url = `${API_URL}/specific/`;
  return axios.post(url, registro);
};
export const registerGeneralObjective = registro => {
  const url = `${API_URL}/general/`;
  return axios.post(url, registro);
};
//TODO en back no esta

