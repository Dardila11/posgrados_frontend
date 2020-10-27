import React,{useState} from 'react';
import {CreateInstitution} from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Box,
    Button,
    Container,
    TextField,

    
  } from '@material-ui/core';

const CreateInstitutionView =()=>{
    const [name, setname] = useState(" ")
    const [city,setcity]= useState(" ")
    const [department,setdepartment]= useState(" ")
    const [country,setcountry]= useState(" ")

    const handleOnchangeName = (e) =>{
        setname(e.target.value);       
    }

    const handleOnchangeCity =(e) =>{
        setcity(e.target.value);
    }

    const handleOnchangeDepartment =(e)=>{
        setdepartment(e.target.value);
    }

    const handleOnchangeCountry = (e) =>{
        setcountry(e.target.value);
    }

    const handleCreate = ()=>{
        CreateInstitution({
            "nombre_ins": name,
            "ciudad": city,
            "departamento": department,
            "pais": country            
        }).then((result)=>{

            document.getElementById("contenedorCountry").innerHTML="<div class='alert alert-success' role='alert'>Institucion creada correctamente!</div>";


        }).catch(()=>{
            document.getElementById("contenedorCountry").innerHTML="<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
        });
           
    }
    const handleSubmit =(event)=>{ 
        handleCreate();
        event.preventDefault();
    }

    
    return(
            <Container maxWidth="sm">
            <Formik
                initialValues={{
                    nombre:'',

                    }}
                    validationSchema={
                        Yup.object().shape({
                          name: Yup.string().max(255).required('name is required'),
                          
                          city: Yup.string().max(255).required('city is required'),
                          department: Yup.string().max(255).required('deparment is required'),
                          country: Yup.string().max(255).required('country is required'),

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
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Nombre institucion"
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleOnchangeName}
                        type="text"
                        value={values.name}
                        variant="outlined"
                        />
                    <TextField
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="Ciudad a la que pertenece"
                        margin="normal"
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleOnchangeCity}
                        type="text"
                        value={values.city}
                        variant="outlined"
                        />
                        <TextField
                        error={Boolean(touched.department && errors.department)}
                        fullWidth
                        helperText={touched.department  && errors.department }
                        label="Departamento a la que pertenece"
                        margin="normal"
                        name="department"
                        onBlur={handleBlur}
                        onChange={handleOnchangeDepartment}
                        type="text"
                        value={values.deparment}
                        variant="outlined"
                        />
                        <TextField
                        error={Boolean(touched.country && errors.country)}
                        fullWidth
                        helperText={touched.country && errors.country}
                        label="Pais al que pertenece"
                        margin="normal"
                        name="country"
                        onBlur={handleBlur}
                        onChange={handleOnchangeCountry}
                        type="text"
                        value={values.country}
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
            <div id="contenedorCountry">

            </div>
            </>
            )}
            </Formik>
            </Container>
        
    )
    
}

export default CreateInstitutionView;
