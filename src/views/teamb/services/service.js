import axios from 'axios';
const API_URL = 'http://mdquilindo.pythonanywhere.com';

export default class service {

    GetPeriodService(id) {
        const url= `${API_URL}/api/period/student/`+id+`/`; //El numero depende del id del usuario/estudiante actual
        return axios.get(url);
    }
    GetActivities(id, academic_year) {
        const url= `${API_URL}/api/activities/student/`+id+`/`+academic_year+`/`; 
        const result = axios.get(url);
        return axios.get(url);
    }

    GetActivity(id) {
        const url= `${API_URL}/api/activity/`+id+`/`; 
        return axios.get(url);
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