import axios from 'axios';
const API_URL = 'http://mdquilindo.pythonanywhere.com';
//const API_URL = 'http://localhost:8000';

export default class service {

    GetPeriodService(id) {
        const url= `${API_URL}/api/period/student/`+id+`/`;
        return axios.get(url);
    }
    GetPeriodsService(id) {
        const url= `${API_URL}/api/periods/student/`+id+`/`; 
        return axios.get(url);
    }
    GetPrograms(){
        const url= `${API_URL}/api/program/`;
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
        const url= `${API_URL}/api/presentationResults/`;
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