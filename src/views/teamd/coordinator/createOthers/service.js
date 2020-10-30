import axios from 'axios'
const API_URL = 'http://localhost:8000';


export const CreateKnowLedgeService = () =>{
    const url= `${API_URL}/api/1.0/crear_area_conocimiento/`;
    return axios.post(url);
}

export const CreateLineRearchService =(idArea) =>{
const url= `${API_URL}/api/1.0/crear_linea_investigacion/`;
return axios.post(url,idArea);

}
