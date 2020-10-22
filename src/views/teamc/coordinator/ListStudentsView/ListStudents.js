import React from 'react';

import StudentCard from './StudentCard';

import {Container, Grid} from '@material-ui/core';

const ActivityList = ({ studentsList }) => {
  return (
    <Container maxWidth="lg">
        <Grid container spacing={3}>
            {studentsList.map(student => (
                <Grid item lg={3} md={5} xs={12}>
                    <StudentCard student = {student}/>          
                </Grid>
            ))}
        </Grid>
    </Container>     
  );
};

export default ActivityList;
