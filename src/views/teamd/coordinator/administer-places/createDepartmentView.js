import React,{Component, useState} from 'react';
import {CreateDeparment , listCountries} from './service';
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

const CreateDepartmentView = () =>{

    const [name, setname] = useState(" ")

    const handleOnchangeName = (e) =>{
        setname(e.target.value);
    }

    const options = ()=>{
        listCountries({
            
        }).then(async (result)=>{
            document.getElementById("opcionesD").innerHTML=" ";
            result.data.Paises.forEach(elemento => {
                
                let option = document.createElement("option")
                option.setAttribute("value", elemento.id)
                let textOption = document.createTextNode(elemento.nombre)
                option.appendChild(textOption)
                document.getElementById("opcionesD").appendChild(option);
            })
   
        }).catch(()=>{
            
        });

    }
    const handleCreate= () =>{
        let select = document.getElementById('opcionesD').value;
        CreateDeparment({
            "nombre": name,
            "pais": select,
            
        }).then((result)=>{

            document.getElementById("contenedorDepartment").innerHTML="<div class='alert alert-success' role='alert'>Departamento creado correctamente!</div>";


        }).catch(()=>{
            document.getElementById("contenedorDepartment").innerHTML="<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
        });
           
    }
    const handleSubmit = (event) =>{
        handleCreate();
        event.preventDefault();
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
                {options()}
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
                        label="Nombre"
                        margin="normal"
                        name="name"
                        onChange = {(e) => {handleChange(e); handleOnchangeName(e)}}                       
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
                        <select className="browser-default custom-select mt-2" id="opcionesD">

                        </select>

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