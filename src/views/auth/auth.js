import axios from 'axios';
import { stopSubmit } from 'react';

  const initialState = {
    isLoading: false,
    isAuthenticated: null,
    user: null,
    token: localStorage.getItem('token')
  };

// const API_URL = 'https://mdquilindo.pythonanywhere.com';
const API_URL = 'http://localhost:8000' 
  // LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  
    try {
      const res = await axios.get('/api/auth/user', tokenConfig(getState));
      dispatch({
        payload: res.data
      });
    } catch (err) {
      dispatch({
      });
    }
  };

  // LOGIN USER
export const login = ({ username, password }) => async dispatch => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };  
// Request Body
const body = JSON.stringify({ username, password });

try {
  const res = await axios.post('/api/auth/login', body, config);
  dispatch({
    payload: res.data
  });
} catch (err) {
  dispatch({
  });
  dispatch(stopSubmit('login', err.response.data));
}
};
// helper function
export const tokenConfig = getState => {
    // Get token
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };
  
  // LOGOUT USER
export const Logout = async(token) =>{
    const URL = `${API_URL}/api/auth/logout`;
    return await axios.post(URL,token,{ headers: {'X-Requested-With': 'XMLHttpRequest','Authorization' : `token ${token}`}});
  };