import React,{useState} from 'react';
import {listCountries,listDeparments,CreateCity} from './service';
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

const CreateCityView = () =>{
    const [name, setname] = useState(" ")
    const [department,setdepartment]= useState(" ")

    const handleOnchangeName = (e) =>{
        setname(e.target.value);
        console.log(name)
    }

    const handleOnchangeDepartment = (e) =>{ 
         setdepartment(e.target.value);
    }

    const options = ()=>{
        listCountries({
            
        }).then(async (result)=>{
            document.getElementById("opcionesCountries").innerHTML=" ";
            result.data.Paises.forEach(elemento => {
                
                let option = document.createElement("option")
                option.setAttribute("value", elemento.id)
                let textOption = document.createTextNode(elemento.nombre)
                option.appendChild(textOption)
                document.getElementById("opcionesCountries").appendChild(option);
                    
            })
            

        }).catch(()=>{
            
        });

        listDeparments("1").then(async (result)=>{
            document.getElementById("opcionesDeparments").innerHTML=" ";
            result.data.Paises.forEach(elemento => {
                
                let option = document.createElement("option")
                option.setAttribute("value", elemento.id)
                let textOption = document.createTextNode(elemento.nombre)
                option.appendChild(textOption)
                document.getElementById("opcionesDeparments").appendChild(option);
                    
            })
            

            
            
        }).catch(()=>{
            
        });


        }
    const handleCreate= () =>{
        let selectCountry = document.getElementById('opcionesCountries').value;
        CreateCity({
            "nombre": name,
            "departamento": department,
            "pais": selectCountry,
            
        }).then((result)=>{

            document.getElementById("contenedorCity").innerHTML="<div class='alert alert-success' role='alert'>Ciudad creada correctamente!</div>";


        }).catch(()=>{
            document.getElementById("contenedorCity").innerHTML="<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
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
                    city:'',
                    departnemt:'',
                    country:''

                    }}
                    validationSchema={
                        Yup.object().shape({
                            city: Yup.string().max(255).required('name is required'),
                            department: Yup.string().max(255).required('department is required'),
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
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="Nombre de la ciudad"
                        margin="normal"
                        name="city"
                        onBlur={handleBlur}
                        onChange = { (e) => {handleOnchangeName(e); handleChange(e)} }
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
                        onChange = {(e) => {handleChange(e);handleOnchangeDepartment (e)}}
                        type="text"
                        value={values.deparment}
                        variant="outlined"
                        />
                        {/* <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    mb={10}
                        >
                                    Seleccionar el departamento
                        </Typography>
                        <select className="browser-default custom-select mt-2" id="opcionesDeparments">
                        

                        </select> */}
                        <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    mb={10}
                        >
                                    Seleccionar el pais
                        </Typography>
                        <select className="browser-default custom-select mt-2" id="opcionesCountries">
                        

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
            <div id="contenedorCity">

            </div>
            </>
            )}
            </Formik>
            </Container>
        
    )
    
}
export default CreateCityView;