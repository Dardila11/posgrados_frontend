import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    justifyContent: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
}));

const NotFoundView = () => {
  const classes = useStyles();
  let link = "";
  switch (localStorage.getItem("rol")) {
    case "estudiante":
      link="/student"
      break;
  case "profesor":
      link="/director"
      break;
  case "coordinador":
      link="/coordinator"
      break;
    default:
      link="/"
      break;
  }
  return (
    <Page
      className={classes.root}
      title="404"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: La página que estas buscando no se encontró
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Verifica que la ruta especificada pertenezca 
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box>
          <RouterLink to= {link} ><Button variant="contained" color="primary" size='large'> Back </Button></RouterLink>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
