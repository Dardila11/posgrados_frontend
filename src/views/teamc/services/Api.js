import http from './ApiConfig';
import http2 from './ApiConfigStudents';

const getStudentActivities = () => {
  return http.get('/student_activities');
};

const getStudentsInfo = () => {
  return http2.get('/students-info.json');
};


export default { getStudentActivities, getStudentsInfo };
