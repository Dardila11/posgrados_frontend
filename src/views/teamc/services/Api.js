import http from './ApiConfig';

const getStudentActivities = () => {
  return http.get('/student_activities');
};

export default { getStudentActivities };
