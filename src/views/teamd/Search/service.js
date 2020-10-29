import axios from 'axios';

const API_URL = 'http://localhost:8000'



//TODO CONFIGURAR BIEN EL URL
export const GetKnowLedgeListService = () =>{
    const URL = `${API_URL}/api/1.0/consultar_area_conocimiento/`;
    return axios.get(URL);

}

export const GetLineResearch = (idArea) =>{
    const URL = `${API_URL}/api/1.0/consultar_li_area/`;
    return axios.get(URL,idArea);

}


export const GetDeparmentIListService = () =>{
    const URL = `${API_URL}/api/1.0/consultar_departamentoU/`;
    return axios.get(URL);
}

export const GetGIforDeparment = (idDeparment) =>{
    const URL = `${API_URL}/api/1.0/consultar_gi_dep/`;
    return axios.get(URL,idDeparment);
}

export const listCountriesService = () => {
    const url= `${API_URL}/api/1.0/consultar_pais/`;
    return axios.get(url);
}

export const listDeparmentsService = (idPais) => {
    const url= `${API_URL}/api/1.0/consultar_departamento_pais/${idPais}`;
    return axios.get(url);
}

export const listCitiesService = (idDepartamento) => {
    const url= `${API_URL}/api/1.0/consultar_ciudad_departamento/${idDepartamento}`;
    return axios.get(url);
}