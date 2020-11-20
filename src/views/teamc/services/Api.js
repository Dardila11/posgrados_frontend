import http from './ApiConfig';

/* Coordinator services*/
const getStudents = () => {
  return http.get('/api/student');
};

const getCoordinatorActivities = id =>{
  return http.get('/api/coordinator/' + id + '/activity');
}

const getCoordinatorEvaluations = id =>{
  return http.get('api/coordinator/' + id + '/evaluation');  
}
/* End Coordinator */

/* Director services */

const getDirectorStudents = id => {
  return http.get('/api/director/' + id + '/student');
};

const getDirectorActivities = id => {
  return http.get('/api/director/' + id + '/activity');
};

const getDirectorEvaluations = id =>{  
  return http.get('/api/test_director');
}

/* End Director services */

/* Get services */
const getActivity = id => {
  return http.get('/api/activity/'+id);
};

const getStudent = id => {
  return http.get('/api/student/' + id);
};

const getStudentActivities = id => {
  return http.get('/api/student/' + id + '/activity');
};

/*End get Services*/

/*Post Services*/
const postStudentTracking = data => {
  return http.post('/api/tracking/', data);
};

/*End post Services*/

export default {
  getDirectorActivities,
  getDirectorStudents,
  getDirectorEvaluations,
  getCoordinatorActivities,
  getCoordinatorEvaluations,
  getStudentActivities,
  getStudents,
  getStudent,
  getActivity,
  postStudentTracking
};
