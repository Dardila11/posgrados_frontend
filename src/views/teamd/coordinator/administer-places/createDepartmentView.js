import React,{ useState} from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,    
  } from '@material-ui/core';


//Import component search

import {SearchCountry} from 'src/views/teamd/Search/searchCountry'
 // service

 import {CreateDeparmentService} from './service'

const CreateDepartmentView = () =>{

    const [name, setname] = useState(" ")
    const [idCountry, setidCountry] = useState("")
    const handleOnchangeName = (e) =>{
        setname(e.target.value);
    }
    const handleCreate= () =>{
        let select = document.getElementById('opcionesD').value;
        CreateDeparmentService({
            "nombre": name,
            "pais": idCountry,
            
        }).then((result)=>{
            document.getElementById("contenedorDepartment").
            innerHTML="<div class='alert alert-success' role='alert'>Departamento creado correctamente!</div>";
        }).catch(()=>{
            document.getElementById("contenedorDepartment").
            innerHTML="<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
        });
           
    }
    const handleSubmit = (event) =>{
        handleCreate();
        event.preventDefault();
    }


    const getCountry = (name,id) =>{
        setidCountry(id);
    }




 
    return(
            
            <Container maxWidth="sm">
            <Formik
                initialValues={{
                    name:'',
                    country:''

                    }}
                    validationSchema={
                        Yup.object().shape({
                          name: Yup.string().max(255).required('name is required'),
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
                    <Box mb={3} id="box3">
                        <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Nombre"
                        margin="normal"
                        name="name"
                        onChange = {handleOnchangeName}                       
                        onBlur={handleBlur}
                        type="text"
                        value={values.name}
                        variant="outlined"
                        />

                        {/* <TextField
                        error={Boolean(touched.country && errors.country)}
                        fullWidth
                        helperText={touched.country && errors.country}
                        label="Pais al que pertenece"
                        margin="normal"
                        name="country"
                        inputRef={this.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.country}
                        variant="outlined"
                        /> */}
                        {/* <Autocomplete
                        id="combo-box-demo"
                        options={opciones}
                        getOptionLabel={(option) => option.nombre}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Pais al que pertenece" variant="outlined" />}
                        /> */}
                        <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    mb={10}
                                >
                                    Seleccionar el pais
                        </Typography>
                        
                        <SearchCountry callback = {getCountry}/>

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
            <div id="contenedorDepartment">

            </div>
            </>
            )}
            </Formik>
            
            </Container>

            
            
        
    )

    
    
}

export default CreateDepartmentView;