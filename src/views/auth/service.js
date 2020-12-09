import axios from 'axios';
const API_URL = 'http://localhost:8000/';

export const loginService = dates => {
    const url = `${API_URL}api/auth/login`;    
    return axios.post(url, dates);
  };
  export const perfilService = dates => {
    const url = `${API_URL}api/auth_user/${dates.id}`;    
    return axios.get(url);
  };


  export const Usuario = async(token) =>{
    const URL = `${API_URL}api/auth/user`;

    return await axios({
      method: 'GET',
      url: URL,
      data: token,
      headers: {'X-Requested-With': 'XMLHttpRequest','Authorization' : `token ${token}`}

    })
  };

  export const serviceDirectorDates = datesCompletId => {
    const url = `${API_URL}api/auth/consult_user_id/${datesCompletId.id}`; 
    return axios.get(url);
  }

  export const getUserInfoService = async (id) => {
    const url = `${API_URL}api/auth/consult_user_id/${id}`;
    return await axios.get(url);
  }

  