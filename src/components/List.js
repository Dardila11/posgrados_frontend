import { Container, Grid } from '@material-ui/core';
import React from 'react';
import StudentCard from 'src/components/StudentCard';
import ActivityCard from 'src/components/ActivityCard';

const List = ({ list, option, context }) => {
  console.log(option + context);
  return (
    <Container>
      <Grid container spacing={3}>
        {list.map(element => (
          <Grid item lg={3} md={6} xs={12} key={element.id}>
            {option === 'Student' ? (
              <StudentCard element={element} />
            ) : (
              <ActivityCard key={element.id} activity={element} context={context}/>
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default List;
