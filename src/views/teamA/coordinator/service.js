import axios from 'axios'
const API_URL = 'http://mdquilindo.pythonanywhere.com';


export const registerStudent = (registro) =>{
        const url= `${API_URL}/student/`;
        return axios.post(url,registro);
    }
    export const CreateUserService = user => {
        const url = `${API_URL}/api/auth/create_user`;
        return axios.post(url, user);
      };
export const UpdateStudent = (registro) =>{
        const url= `${API_URL}/api/1.0/updateStudent/`;
        return axios.put(url,registro);
    }
export const registerProject = (registro) =>{
        console.log("axios -",registro)
        const url= `${API_URL}/project/`;
        return axios.post(url,registro);
    }
    export const registerGrant = (registro) =>{
        console.log("axios -",registro)
        const url= `${API_URL}/grant/`;
        return axios.post(url,registro);
    }
    //TODO en back no esta
