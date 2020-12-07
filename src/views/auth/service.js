import axios from 'axios';
const API_URL = 'http://localhost:8000/';

export const loginService = dates => {
    const url = `${API_URL}api/auth/login`;    
    console.log("url: "+url)
    console.log(dates)
    return axios.post(url, dates);
  };
  export const perfilService = dates => {
    const url = `${API_URL}api/auth_user/${dates.id}`;    
    console.log("url: "+url)
    console.log(dates)
    return axios.get(url);
  };

  export const serviceDirectorDates = datesCompletId => {
    const url = `${API_URL}api/auth/consult_user_id/${datesCompletId.id}`; 
    console.log("url: "+url)
    console.log("datospor id: "+datesCompletId)
    return axios.get(url);
  }
  