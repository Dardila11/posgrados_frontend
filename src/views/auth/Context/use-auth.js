import React, { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
import {Usuario} from "../service"
const authContext = createContext();
//const API_URL = 'https://mdquilindo.pythonanywhere.com';
const API_URL = 'http://localhost:8000'

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [stateLogin, setStateLogin] = useState()
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
    const login = ({ username, password }) => async dispatch => {
        const config = {
        headers: {
            'Content-Type': 'application/json'
        }
        };
            
        const body = JSON.stringify({ username, password });

        try {
        const res = await axios.post('/api/auth/login', body, config);
        dispatch({
            type: setStateLogin(true),
            payload: res.data
        });
        Usuario(localStorage.getItem("token")).then(request => setUser(request.data)).catch(false)
        } catch (err) {
        dispatch({
            type: setStateLogin(false)
        });
        }
    };
    const Logout = async(token) =>{
        const URL = `${API_URL}/api/auth/logout`;
        return await axios.post(URL,token,{ headers: {'X-Requested-With': 'XMLHttpRequest','Authorization' : `token ${token}`}});
      };


  useEffect(async () => {
    if(localStorage.getItem("token") === null){
      setUser(false)
    }else{
      await Usuario(localStorage.getItem("token")).then(request => setUser(request.data)).catch(setUser(false))
    }
  }, []);
  
  // Return the user object and auth methods
  return {
    user,
    setUser,
    login,
    Logout
  };
}