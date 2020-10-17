import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';

import api from 'src/views/teamc/services/Api';

import ActivityList from './ActivityList';
import BreadCrumbs from './BreadCrumbs';
import StudentInfo from './StudentInfo';

const StudentView = () => {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getStudentActivities();
      setActivityList(res.data);
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
      <ActivityList activityList={activityList} />
    </>
  );
};

export default StudentView;
