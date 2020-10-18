import React, { useState, useEffect } from 'react';

import api from 'src/views/teamc/services/Api';

import ActivityList from './ActivityList';
import BreadCrumbs from './BreadCrumbs';
import StudentInfo from './StudentInfo';

const StudentView = () => {
  const [activityList, setActivityList] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getStudentActivitiesLocal();
      /*if (res.status === 200) {
        setResult('ok');
        setActivityList(res.data);
      } else if (res.status === 500) {
        setResult('error');
      }*/
      setResult('ok');
      setActivityList(res);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs />
      {/* Student Basic Info
          - Nombre, programa, cohorte*/}
      <StudentInfo />
      {/* Button Track Student */}
      {/* Activity Card List */}
      {result === 'ok' ? (
        <ActivityList activityList={activityList} />
      ) : (
        <h1> Free accounts are limited to 200 requests per day. </h1>
      )}
    </>
  );
};

export default StudentView;
