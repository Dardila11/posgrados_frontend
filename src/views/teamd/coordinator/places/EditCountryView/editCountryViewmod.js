import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import {SearchCountry} from '../../../Search/searchCountry';
import {SearchDepartment} from '../../../Search/searchDepartment';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
      background: 'white',
      border: 1,
      borderRadius: 3,
      boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
      paddingTop: '30px',
      paddingLeft: '50px',
      paddingRight: '50px',
      paddingBottom: '40px'
    },
    container: {
      marginTop: '30px'
    }
  });

const EditCountryViewBody = () => {
    const clases = useStyles();
    const [name, setname] = useState(' ');
    const [idCountry, setIdCountry] = useState('');
    const [idDepartment,setIdDeparment]=useState('');
    const handleSubmit = event => {
        event.preventDefault()
      
      };
      const handleOnchangeName = e => {
        setname(e.target.value);
      };
      const getCountry =(id)=>{
        setIdCountry(id);
      };
      const getDepartment =(id) =>{
        setIdDeparment(id);
      };
    return (
        <Container maxWidth="sm" className={clases.container}>
            <Formik
            initialValues={{
          name: ''
        }}
        
      >
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <form className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Editar Pais
                </Typography>
                <Box mb={3}>
                  
                <SearchCountry callback={getCountry}/>
                <SearchDepartment idCountry={idCountry} callback={getDepartment}/>
                  <Box my={2}>
                    <Button
                      color="primary"
                      /*disabled={isSubmitting}*/
                      fullWidth
                      size=""
                      type="submit"
                      variant="contained"
                    >
                      Editar
                    </Button>
                  </Box>
                </Box>
              </form>
              
            </Box>
     
            </Formik>
    </Container>
    
    );
};

export default EditCountryViewBody;