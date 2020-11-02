import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class service {

    GetPeriodService(periodo) {
        const url= `${API_URL}/api/period/student/1/`; //El numero depende del id del usuario/estudiante actual
        return axios.get(url,periodo);
    }
    
    PostActivityOne(activity){
        const url= `${API_URL}/api/projectCourse/`;
        return axios.post(url,activity);
    }
    PostActivityTwo(activity){
        const url= `${API_URL}/api/lecture/`;
        return axios.post(url,activity);
    }
    PostActivityThree(activity) {
        const url= `${API_URL}/api/publication/`;
        return axios.post(url,activity);
    }
    PostActivityFour(activity){
        const url= `${API_URL}/api/presentationResult/`;
        return axios.post(url,activity);
    }
    PostActivityFive(activity){
        const url= `${API_URL}/api/researchStays/`;
        return axios.post(url,activity);
    }
    PostActivitySix(activity){
        const url= `${API_URL}/api/participationProjects/`;
        return axios.post(url,activity);
    }
}