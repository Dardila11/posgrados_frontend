import axios from 'axios'
const API_URL = 'http://localhost:8000';

export default class service {
    
    GetPeriodService(periodo) {
        const url= `${API_URL}/api/periodo/`;
        return axios.get(url,periodo);
    }
    PostActivityThree(activity){
        console.log(activity);
        const url= `${API_URL}/api/activity/`;
        return axios.post(url,activity);
    }
    
    GetCurrentYear(currentPeriod) { 
        var Splits = currentPeriod.split(".");
        var CurrentYear = Splits[0];
        var semester = Splits[1];

        var Year1, Year2;

        if (parseInt(semester) > 1) {
            Year1 = CurrentYear;
            Year2 = CurrentYear.slice(2);
            parseInt(Year2);
            Year2++;
        }
        else {
            Year2 = CurrentYear.slice(2);
            Year1 = parseInt(CurrentYear);
            parseInt(Year1);
            Year1--;
        }
        return (Year1 + "-" + Year2)
    }
}