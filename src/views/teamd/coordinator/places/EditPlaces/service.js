import axios from 'axios';
const API_URL = 'http://localhost:8000/';
// const API_URL = 'https://mdquilindo.pythonanywhere.com';
export const EditCountryService = Country => {
    const url =  `${API_URL}api/1.0/consultar_pais_id/${Country.id}`;
    console.log(url)
    console.log(Country)
    const axi= axios.put(url,Country) 
    console.log(axi) 
    return  axi
  };

  export const EditDeparmentService = Deparment => {
    const url = `${API_URL}api/1.0/consultar_departamento_pais/${Deparment.id}`;
    console.log(url)
    console.log(Deparment)
    return axios.put(url,Deparment)
  };
  
  export const EditCityService = City => {
    console.log(City)
    const url = `${API_URL}api/1.0/consultar_ciudad_departamento/${City.id}`;
    console.log(url)
    
    return axios.put(url,City)
  };

  export const EditInstitutionService = Institution => {
    const url = `${API_URL}api/1.0/consultar_institucion_id/${Institution.id}`;
    return axios.put(url,Institution)
  };
  