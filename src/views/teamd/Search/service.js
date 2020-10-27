import axios from 'axios';

const API_URL = 'https://localhost:8000'



//TODO CONFIGURAR BIEN EL URL
export const GetKnowLedgeListService = () =>{
    const URL = `${API_URL}/api/1.0/obtener_areas_conocimiento/`;
    return axios.get(URL);

}


export const GetDeparmentIListService = () =>{
    const URL = `${API_URL}/api/1.0/obtener_departamento_institucion/`;
    return axios.get(URL);
}