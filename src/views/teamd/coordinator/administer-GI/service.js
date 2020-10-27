import axios from 'axios'
const API_URL = 'http://localhost:8000';


export const CreateGIApi = (GI) =>{
        const url= `${API_URL}/api/1.0/crear_grupo_investigacion/`;
        return axios.post(url,GI);
    }
    //TODO
export const ListProfessorApi = (IdGi) =>{
        const url= `${API_URL}/api/1.0/listar_profesor/`;
        return axios.post(url,IdGi);
    }

