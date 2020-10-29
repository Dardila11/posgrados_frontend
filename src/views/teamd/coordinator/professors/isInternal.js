import React,{useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {CreateProfessorApi} from './service'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Box,
    Button,
    TextField,
    Container,
    Typography,
  } from '@material-ui/core';

export const isInternal = ([isInternal]) => {

    const [departmentI, setdepartmentI] = useState("")

    
    return(
        
        <Container maxWidth="sm">
        
        <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Trabaja
        </Typography>
                  
        <Formik
        initialValues={{
            departmentI:'',
            }}
            validationSchema={
                Yup.object().shape({
                  departmentI: Yup.string().max(255).required('Department is required'),
                })
              }
              onSubmit={() => {
                
              }}
            
        >
        {({
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              touched,
              values
            }) => (
                <>
                <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <form  onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField
                        error={Boolean(touched.departmentI && errors.departmentI)}
                        fullWidth
                        helperText={touched.departmentI && errors.departmentI}
                        label="Departamento de la institucion en la que trabaja"
                        margin="normal"
                        name="departmentI"
                        onBlur={handleBlur}
                        onChange={handleChangedepartmentI}
                        type="text"
                        value={values.departmentI}
                        variant="outlined"
                        />
                        <Box my={2}>
                            <Button
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                
                            >
                                Crear
                            </Button>
                        </Box>
                    </Box>   
                </form>
            </Box>
            </>)}
        
        </Formik>
        
        </Container>)
}
