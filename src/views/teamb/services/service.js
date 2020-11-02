import axios from 'axios'
const API_URL = 'http://localhost:8000';

export default class service {
    
    GetPeriodService(periodo) {
        const url= `${API_URL}/api/period/student/1/`; //El numero depende del id del usuario/estudiante actual
        return axios.get(url,periodo);
    }
    PostActivityThree(activity) {
        const url= `${API_URL}/api/publication/`;
        return axios.post(url,activity);
    }
    
}