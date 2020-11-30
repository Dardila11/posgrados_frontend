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
    GetPrograms() {
        const url= `${API_URL}/api/program/`;
        return axios.get(url);
    }
    GetInstitutions() {
        const url= `${API_URL}/api/instititution/`;
        return axios.get(url);
    }
    GetCities() {
        const url= `${API_URL}/api/city/`;
        return axios.get(url);
    }
    GetCountries() {
        const url= `${API_URL}/api/country/`;
        return axios.get(url);
    }
    GetInvestigators() {
        const url= `${API_URL}/api/investigator/`;
        return axios.get(url);
    }
    GetInvestigationLines() {
        const url= `${API_URL}/api/investigationline/`;
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
    GetActivityByType(id, type) {
        const url= `${API_URL}/api/`+type+`/`+id+`/`; 
        return axios.get(url);
    }
    GetDirectorEvaluation(id) {
        const url= `${API_URL}/api/testDirector/`+id+`/`; 
        return axios.get(url);
    }
    GetCoordinatorEvaluation(id) {
        const url= `${API_URL}/api/testCoordinator/`+id+`/`; 
        return axios.get(url);
    }
    GetPrizes(id) {
        const url= `${API_URL}/api/prizes/`+id+`/`;
        return axios.get(url);
    }
    GetProgram(id) {
        const url= `${API_URL}/api/program/`+id+`/`;
        return axios.get(url);
    }
    GetInstitution(id) {
        const url= `${API_URL}/api/instititution/`+id+`/`;
        return axios.get(url);
    }
    GetCity(id) {
        const url= `${API_URL}/api/city/`+id+`/`;
        return axios.get(url);
    }
    GetInvestigator(id) {
        const url= `${API_URL}/api/investigator/`+id+`/`;
        return axios.get(url);
    }
    GetInvestigationLine(id){
        const url= `${API_URL}/api/investigationline/`+id+`/`;
        return axios.get(url);
    }

    PostActivityOne(activity) {
        const url= `${API_URL}/api/projectCourse/`;
        return axios.post(url,activity);
    }
    PostActivityTwo(activity) {
        const url= `${API_URL}/api/lecture/`;
        return axios.post(url,activity);
    }
    PostActivityThree(activity) {
        const url= `${API_URL}/api/publication/`;
        return axios.post(url,activity);
    }
    PostActivityFour(activity) {
        const url= `${API_URL}/api/presentationResults/`;
        return axios.post(url,activity);
    }
    PostActivityFive(activity) {
        const url= `${API_URL}/api/researchStays/`;
        return axios.post(url,activity);
    }
    PostActivitySix(activity) {
        const url= `${API_URL}/api/participationProjects/`;
        return axios.post(url,activity);
    }
    PostPrize(prize) {
        const url= `${API_URL}/api/prize/`;
        return axios.post(url,prize);
    }

    PutActivityOneEdit(activity, id){
        const url= `${API_URL}/api/projectCourse/`+id+`/`;
        return axios.put(url, activity);
    }

    PutActivityThreeEdit(activity, id){
        const url= `${API_URL}/api/publication/`+id+`/`;
        return axios.put(url, activity);
    }

    DeleteActivity(id) {
        const url= `${API_URL}/api/activity/`+id+`/`;  
        return axios.delete(url);
    }
}