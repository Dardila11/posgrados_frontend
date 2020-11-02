import axios from 'axios'
import activitiesData from '../services/student_activities.json';
const API_URL = 'http://localhost:8000';

export default class service {
    GetStudentActivitiesLocal = () => {
        return activitiesData;
    };
    GetPeriodService(periodo) {
        const url= `${API_URL}/api/period/student/1/`; //El numero depende del id del usuario/estudiante actual
        return axios.get(url,periodo);
    }
    PostActivityOne(activity){
        console.log(activity);
        const url= `${API_URL}/api/projectCourse/`;
        return axios.post(url,activity);
    }
    PostActivityThree(activity) {
        const url= `${API_URL}/api/publication/`;
        return axios.post(url,activity);
    }
    
}