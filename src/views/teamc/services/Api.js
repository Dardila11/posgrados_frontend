import http from './ApiConfig';
import studentData from './local_data/students-info.json';
import activitiesData from './local_data/student_activities.json';
import directorEvaluations from './local_data/director_evaluations.json';

const getStudents = () => {
  let content = http.get('/api/student');
  console.log('Api get: Students');
  return content;
};

const getDirectorStudents = id => {
  let content = http.get('/api/director/' + id + '/student');
  console.log('Api get: Director students');
  console.log(content);
  return content;
};

const getStudent = id => {
  return http.get('/api/student/' + id);
};

const getDirectorActivities = id => {
  return http.get('/api/director/' + id + '/activity');
};

const getStudentActivities = () => {
  return http.get('/student_activities');
};

const getStudentActivitiesLocal = () => {
  return activitiesData;
};

const getStudentsInfo = () => {
  return http.get('/students-info.json');
};

const getStudentsInfoLocal = () => {
  return studentData;
};

const getStudentsInfoDirectorLocal = directorID => {
  //TODO: GET STUDENTS OF A DIRECTOR
  return studentData;
};

const getStudentLocal = id => {
  return studentData.find(student => student.id == id);
};

const getActivity = id => {
  return activitiesData.find(activity => activity.id == id);
};

const getEvaluationsDirectorLocal = () => {
  return directorEvaluations;
};

const postStudentTracking = data => {
  return http.post('/api/tracking/', data);
};

export default {
  getDirectorActivities,
  getDirectorStudents,
  getEvaluationsDirectorLocal,
  getStudentActivitiesLocal,
  getStudentActivities,
  getStudentsInfoLocal,
  getStudentsInfoDirectorLocal,
  getStudentsInfo,
  getStudents,
  getStudent,
  getActivity
};
