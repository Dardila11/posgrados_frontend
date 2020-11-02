import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class service {

    GetPeriodService(periodo) {
        const url= `${API_URL}/api/period/student/1/`; //El numero depende del id del usuario/estudiante actual
        return axios.get(url,periodo);
    }
    
    PostActivityOne(activity){
        console.log(activity);
        const url= `${API_URL}/api/projectCourse/`;
        return axios.post(url,activity);
    }
    PostActivityTwo(activity){
        console.log(activity);
        const url= `${API_URL}/api/lecture/`;
        return axios.post(url,activity);
    }
    PostActivityThree(activity) {
        const url= `${API_URL}/api/publication/`;
        return axios.post(url,activity);
    }
    PostActivityFour(activity){
        console.log(activity);
        const url= `${API_URL}/api/presentationResult/`;
        return axios.post(url,activity);
    }
}