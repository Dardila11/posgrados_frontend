import http from './ApiConfig';
import studentData from './local_data/students-info.json';
import activitiesData from './local_data/student_activities.json';

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

const getStudent = (id) =>{
  studentData.forEach(student => {
    if(student.id===id){
      return student;
    }
  });
}

export default {
  getStudentActivitiesLocal,
  getStudentActivities,
  getStudentsInfoLocal,
  getStudentsInfo,
  getStudent
};
