import React from 'react';

import ActivityList from './ActivityList';
import BreadCrumbs from './BreadCrumbs';
import { Box, Container, makeStyles } from '@material-ui/core';

let activityList = [1, 2, 3, 4, 5];

const StudentView = () => {
  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs />
      {/* Student Basic Info
          - Nombre, programa, cohorte*/}
      {/* Button Track Student */}
      {/* Activity Card List */}
      <ActivityList activityList={activityList} />
    </>
  );
};

export default StudentView;
