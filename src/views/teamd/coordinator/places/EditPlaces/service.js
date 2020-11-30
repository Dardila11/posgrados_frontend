import axios from 'axios';
const API_URL = 'http://localhost:8000/';

export const EditCountryService = Country => {
    const url =  `${API_URL}api/1.0/consultar_pais_id/${Country.id}`;
    console.log(url)
    console.log(Country)
    const axi= axios.put(url,Country) 
    console.log(axi) 
    return  axi
  };