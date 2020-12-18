import axios from 'axios';
// const API_URL = 'http://localhost:8000/';
const API_URL = 'http://localhost:8000/';
export const DeleteCountryService = Country => {
  console.log(Country)
  const url =  `${API_URL}api/1.0/consultar_pais_id/${Country.id}`;
  console.log(url)
  
  const axi= axios.put(url,Country) 
  console.log(axi) 
  return  axi
};

export const DeleteDeparmentService = Deparment => {
  console.log(Deparment)
  const url = `${API_URL}api/1.0/consultar_departamento_pais/${Deparment.id}`;
  console.log(url)
  
  return axios.put(url,Deparment)
};

export const DeleteCityService = City => {  
    console.log(City)
    const url = `${API_URL}api/1.0/consultar_ciudad_departamento/${City.id}`;
    console.log(url)
  //  console.log(City)
    return axios.put(url,City)
  };

  export const DeleteInstitutionService = Institution => {
    console.log(Institution)
    const url = `${API_URL}api/1.0/consultar_institucion_id/${Institution.id}`;
    console.log(url)
    return axios.put(url,Institution)
  };