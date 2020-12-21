import axios from 'axios';
// const API_URL = 'http://localhost:8000/';
const API_URL = 'https://mdquilindo.pythonanywhere.com';
export const EditCountryService = Country => {
    const url =  `${API_URL}api/country/${Country.id}/`;
    const axi= axios.put(url,Country) 
    return  axi
  };

  export const EditDeparmentService = Deparment => {
    const url = `${API_URL}api/state/${Deparment.id}/`;
    return axios.put(url,Deparment)
  };
  
  export const EditCityService = City => {
    console.log(City)
    const url = `${API_URL}api/city/${City.id}/`;
    console.log(url)
    
    return axios.put(url,City)
  };

  export const EditInstitutionService = Institution => {
    const url = `${API_URL}api/institution/${Institution.id}/`;
    return axios.put(url,Institution)
  };
  