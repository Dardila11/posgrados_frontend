import axios from 'axios'
const API_URL = 'http://localhost:8000';

export default class service{
    
    ObtPeriodoService(periodo){
        const url= `${API_URL}/api/1.0/crear_pais/`;
        return axios.get(url,periodo);
    }
    ActivityView(actividad){
        const url= `${API_URL}/api/1.0/crear_pais/`;
        return axios.post(url,actividad);
    }

}