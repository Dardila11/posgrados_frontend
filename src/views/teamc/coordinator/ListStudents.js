import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const ListStudentsView = () => {
  return (
    <>
      <h2>Lista de Estudiantes</h2>
      <RouterLink to="student">
        <Button variant="contained" color="primary">
          Información Estudiante
        </Button>
      </RouterLink>
    </>
  );
};

export default ListStudentsView;
