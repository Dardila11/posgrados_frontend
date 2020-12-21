import axios from 'axios';
const API_URL = 'http://localhost:8000/';
// const API_URL = 'http://localhost:8000';
export const EditCountryService = Country => {
    const url =  `${API_URL}/api/country/${Country.id}/`;
    console.log(url)
    console.log(Country)
    const axi= axios.put(url,Country) 
    console.log(axi) 
    return  axi
  };

  export const EditDeparmentService = Deparment => {
    const url = `${API_URL}/api/state/${Deparment.id}/`;
    console.log(url)
    console.log(Deparment)
    return axios.put(url,Deparment)
  };
  
  export const EditCityService = City => {
    console.log(City)
    const url = `${API_URL}/api/city/${City.id}/`;
    console.log(url)
    
    return axios.put(url,City)
  };

  export const EditInstitutionService = Institution => {
    console.log(Institution)
    const url = `${API_URL}/api/institution/${Institution.id}/`;
    console.log(Institution)
    return axios.put(url,Institution)
  };
  