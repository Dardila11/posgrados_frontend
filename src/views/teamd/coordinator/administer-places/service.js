import axios from 'axios'
const API_URL = 'http://localhost:8000';

    export const CreateCountry = (Country) =>{
        const url= `${API_URL}/api/1.0/crear_pais/`;
        return axios.post(url,Country);
    }
    export const CreateDeparment = (Deparment)  => {
        const url= `${API_URL}/api/1.0/crear_departamento/`;
        return axios.post(url,Deparment);
    }
    export const CreateCity = (City) => {
        const url= `${API_URL}/api/1.0/crear_ciudad/`;
        return axios.post(url,City);
    }
    export const CreateInstitution = (Institution) => {
        const url= `${API_URL}/api/1.0/crear_institucion/`;
        return axios.post(url,Institution);
    }
    export const listCountries = () => {
        const url= `${API_URL}/api/1.0/listar_paises/`;
        return axios.get(url);
    }
    export const listDeparments = (idPais) => {

        const url= `${API_URL}/api/1.0/listar_departamentos/${idPais}`;
        return axios.get(url);
    }
    

