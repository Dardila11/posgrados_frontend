import https from './ApiConfig';

/* Coordinator services*/
const getStudents = () => {
  return https.get('/api/student');
};

const getCoordinatorActivities = id =>{
  return https.get('/api/coordinator/' + id + '/activity');
}

const getCoordinatorEvaluations = id =>{
  return https.get('api/coordinator/' + id + '/test');  
}
/* End Coordinator */

/* Director services */

const getDirectorStudents = id => {
  return https.get('/api/director/' + id + '/student');
};

const getDirectorActivities = id => {
  return https.get('/api/director/' + id + '/activity');
};

const getDirectorEvaluations = id =>{  
  return https.get('/api/director/'+ id +'/test');
}

/* End Director services */

/* Get services */
const getActivity = id => {
  return https.get('/api/activity/'+id);
};

const getStudent = id => {
  return https.get('/api/student/' + id);
};

const getStudentActivities = id => {
  return https.get('/api/student/' + id + '/activity');
};

/*End get Services*/

/*Post Services*/
const postStudentTracking = data => {
  return https.post('/api/tracking/', data);
};

const postDirectorEvaluations =  (directorId, data) => {
  return https.post(`/api/test_director/`, data);
}

const postCoordinatorEvaluations = data => {
  return https.post(`/api/test_coordinator/`, data);
}
/*End post Services*/

/* Put Services */
const putDirectorEvaluations = (directorId, data) => {
  return https.put(`/api/test_director/${directorId}/`,data)
}

const putCoordinatorEvaluations = (coordinatorId, data) => {
  return https.put(`/api/test_coordinator/${coordinatorId}/`,data)
}

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
  postStudentTracking,
  postDirectorEvaluations,
  postCoordinatorEvaluations,
  putDirectorEvaluations,
  putCoordinatorEvaluations,

};
