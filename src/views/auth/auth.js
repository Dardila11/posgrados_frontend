import axios from 'axios';
import { stopSubmit } from 'react';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT_SUCCESS
  } from './types';

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
    dispatch({ type: USER_LOADING });
  
    try {
      const res = await axios.get('/api/auth/user', tokenConfig(getState));
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
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
    type: LOGIN_SUCCESS,
    payload: res.data
  });
} catch (err) {
  dispatch({
    type: LOGIN_FAIL
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
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          user: action.payload
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          ...action.payload
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          token: null
        };
      default:
        return state;
    }
  }