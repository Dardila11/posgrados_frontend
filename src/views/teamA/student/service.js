import axios from 'axios'
const API_URL = 'https://mdquilindo.pythonanywhere.com';


export const registerStudent = (registro) =>{
        const url= `${API_URL}/student/`;
        return axios.post(url,registro);
    }
    export const CreateStudentService = user => {
        const url = `${API_URL}/student/`;
        return axios.post(url, user);
      };

export const registerProject = (registro) =>{
        console.log("axios -",registro)
        const url= `${API_URL}/project/`;
        return axios.post(url,registro);
    }
export const getProject = () =>{
        const url= `${API_URL}/project/`;
        return axios.get(url);
    }
export const registerAgreement = (registro) =>{
     console.log("axios -",registro)
    const url= `${API_URL}/agreement/`;
    return axios.post(url,registro);
    }
export const registerGrant = (registro) =>{
    console.log("axios -",registro)
    const url= `${API_URL}/grant/`;
    return axios.post(url,registro);
}


//TODO HACER PETICION PARA OBTENER ESTUDIANTE LOGEADO
export const getUserLogin = () =>{
    console.log("axios login-")
    const url= `${API_URL}/student/1`;
    return axios.get(url);
}
export const getStudents = () =>{
    const url= `${API_URL}/student/`;
    return axios.get(url);
}
export const UpdateStudentService = (registro) =>{
    const url= `${API_URL}/updatestudent/${registro.id}`;
    return axios.put(url,registro);
}
export const UpdateProjectService = (registro) =>{
    console.log("axios -",registro)
    const url= `${API_URL}/project/${registro.id}/`;
    return axios.put(url,registro);
}
export const GetGrantsService = () =>{
    const url= `${API_URL}/grant/`;
    return axios.get(url);
}
export const UpdateGrantService = (registro) =>{
    const url= `${API_URL}/updategrant/${registro.id}`;
    return axios.put(url,registro);
}
export const GetAgreementsService = () =>{
    const url= `${API_URL}/agreement/`;
    return axios.get(url);
}
export const UpdateAgreementService = (registro) =>{
    const url= `${API_URL}/updateagreement/${registro.id}`;
    return axios.put(url,registro);
}
export const UpdateUserService = (registro) =>{
    const url= `${API_URL}/api/auth/consult_user_id/${registro.id}`;
    return axios.put(url,registro);
}



