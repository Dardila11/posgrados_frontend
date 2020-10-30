import React from 'react';
import {
    Box,
    Container,
    Card,

  } from '@material-ui/core';
import CreateProfessorView from './createProfessor'
import Page from 'src/components/Page';
const AdministerProfessorsView = () => {
  return (
    <Page
      title="Professors"
    >
      
      <Container maxWidth={false}>
        <Card>
        <Box m={10}>
          <CreateProfessorView/>
        </Box>
        </Card>
      </Container>
    </Page>
  );
};

export default AdministerProfessorsView;
