import axios from 'axios';

// const API_URL = 'http://localhost:8000';
const API_URL = 'https://mdquilindo.pythonanywhere.com';

//ACTIVAS
export const GetKnowLedgeListService = () => {
  const URL = `${API_URL}/api/1.0/consultar_area_conocimiento/`;
  return axios.get(URL);
};


export const GetLineGIService = (id) => {
  const URL = `${API_URL}/api/1.0/consultar_li_gi/${id}`;
  return axios.get(URL);
};


export const listFDeparmentsService = idPais => {
  const url = `${API_URL}/api/1.0/full_consultar_departamento_pais/${idPais}`;
  return axios.get(url);
};

export const listFCountriesService = () => {
  const url = `${API_URL}/api/country/`;
  return axios.get(url);
};

export const listFCitiesService = idDepartamento => {
  const url = `${API_URL}/api/1.0/full_consultar_ciudad_departamento/${idDepartamento}`;
  return axios.get(url);
};
export const listFInstitutionService = idCity => {
  console.log(idCity)
  const url = `${API_URL}/api/1.0/full_consultar_institucion_ciudad/${idCity}`;
  return axios.get(url);
};



//ACTIVAS
export const GetLineResearch = idArea => {
  const URL = `${API_URL}/api/1.0/consultar_li_area/${idArea}`;
  return axios.get(URL);
};
//ACTIVOS
export const GetDeparmentIListService = () => {
  const URL = `${API_URL}/api/1.0/consultar_departamentoU/`;
  return axios.get(URL);
};

//ACTIVOS
export const GetGIforDeparment = idDeparment => {
  const URL = `${API_URL}/api/1.0/consultar_gi_dep/${idDeparment}`;
  return axios.get(URL);
};

//ACTIVOS
export const listCountriesService = () => {
  const url = `${API_URL}/api/1.0/consultar_pais/`;
  return axios.get(url);
};


//TODOS sin importar estado
export const listFullCountriesService = () => {
  const url = `${API_URL}/api/country/`;
  return axios.get(url);
};

//ACTIVOS
export const listDeparmentsService = idPais => {
  const url = `${API_URL}/api/1.0/consultar_departamento_pais/${idPais}`;
  return axios.get(url);
};

export const listFullDeparmentsService = idPais => {
  const url = `${API_URL}/api/state/${idPais}/`;
  return axios.get(url);
};

export const listCitiesService = idDepartamento => {
  const url = `${API_URL}/api/1.0/consultar_ciudad_departamento/${idDepartamento}`;
  return axios.get(url);
};

export const listFullCitiesService = idDepartamento => {
  const url = `${API_URL}/api/city/${idDepartamento}/`;
  return axios.get(url);
};

//activas
export const GetlistInstitutionService = () => {
  const url = `${API_URL}/api/1.0/consultar_institucion/`;
  return axios.get(url);
};
// sin importar estado
export const GetlistFullInstitutionService = () => {
  const url = `${API_URL}/api/institution/`;
  return axios.get(url);
};

export const ConsultUserService = () => {
  const url = `${API_URL}/api/auth/consult_user`;
  return axios.get(url);
};

/////////////////////////////////////////////////////////////////////////////////////////////////
export const ConsultProfesorService = () => {
  const url = `${API_URL}/api/1.0/consultar_profesor/`;
  return axios.get(url);
};
export const EditarUser = (info) => {
  const url = `${API_URL}/api/auth/consult_user_id/${info.id}`;
  return axios.put(url,info);
};
export const ConsultProfesorAll = () => {
  const url = `${API_URL}/api/1.0/consultar_profesor/`;
  return axios.get(url);
};
export const CreateUserService = user => {
  const url = `${API_URL}/api/auth/create_user`;
  return axios.post(url, user);
};
export const ConsultMemberForProfesor = (idProfessor) => {
  let url = `${API_URL}/api/1.0/consultar_miembro_p/${idProfessor}`;
  return axios.get(url)
} 

export const IsMemberGI = (info) => {
  let url = `${API_URL}/api/1.0/consultar_es_miembro/${info.professor}/${info.gi}`;
  return axios.get(url)
}
export const GetGIId = (id) => {
  let url = `${API_URL}/api/investigation_group/${id}/`;
  return axios.get(url)
}

export const GetGIForIns = () => {
  let url = `${API_URL}/api/1.0/consultar_gi_ins/1`;   //TODO CAMBIAR PARAMETRO POR DEFECTO AL ID UNICAUCA
  return axios.get(url)
}
export const GetAllGi = () => {
  let url = `${API_URL}/api/investigation_group/`;
  return axios.get(url)
}

export const ConsultLabP_D = (info) => {
  let url = `${API_URL}/api/1.0/consultar_labora/${info.professor}/${info.department}`;
  return axios.get(url)
}

export const EditLabP_D = (info) => {
  let url = `${API_URL}/api/1.0/consultar_labora/${info.professor}/${info.department}`;
  return axios.put(url,info)
}






