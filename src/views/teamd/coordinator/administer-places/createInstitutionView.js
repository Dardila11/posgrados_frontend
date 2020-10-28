import React,{useState} from 'react';
import {CreateInstitutionService} from './service';
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

  const listCountries = [ 
    {
        id: 1,
        nombre: "Colombia"           
    },
    {
        id: 2,
        nombre: "Italia"           
    },
    {
        id: 3,
        nombre: "USA"           
    }
]
const CreateInstitutionView =()=>{
    const [name, setname] = useState(" ")
    const [city,setcity]= useState(" ")
    const [department,setdepartment]= useState(" ")
    const [country,setcountry]= useState(" ")

    const handleOnchangeName = (e) =>{
        setname(e.target.value);       
    }

    const handleOnchangeCity =(e) =>{
        let  selectCity= document.getElementById('opcionesCities').value;
        setcity(selectCity);
    }

    const handleOnchangeDepartment =(e)=>{
        let  selectDepartment= document.getElementById('opcionesDepartments').value;
        setcountry(selectDepartment);
        //Aqui se debe consumir la API ciudades by idDepartment
    }

    const handleOnchangeCountry = (e) =>{
        let  selectCountry= document.getElementById('opcionesCountries').value;
        setcountry(selectCountry);
        //Aqui se debe consumir la api de departamentos by idPais
        console.log(selectCountry);
    }

    const handleCreate = ()=>{
        CreateInstitutionService({
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

                        <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    mb={10}
                        >
                                    Seleccionar el pais
                        </Typography>

                        <select  onChange={handleOnchangeCountry} className="browser-default custom-select mt-2" id="opcionesCountries">                       
                        {
                            listCountries.map(country=> 
                            <option value={country.id} key={country.id}>{country.nombre}</option>)
                        }
                        </select>

                        <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    mb={10}
                        >
                                    Seleccionar el departamento
                        </Typography>
                        <select   onChange={handleOnchangeDepartment} className="browser-default custom-select mt-2" id="opcionesDepartments">                       
                        {
                            //listCountries.map(department=> 
                            //<option value={department.id} key={department.id}>{department.nombre}</option>)
                        }
                        </select>


                        <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    mb={10}
                        >
                                    Seleccionar la Ciudad
                        </Typography>
                        <select  onChange={handleOnchangeCity} className="browser-default custom-select mt-2" id="opcionesCities">                       
                        {
                            //listCountries.map(city=> 
                            //<option value={city.id} key={city.id}>{city.nombre}</option>)
                        }
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
            <div id="contenedorCountry">

            </div>
            </>
            )}
            </Formik>
            </Container>
        
    )
    
}

export default CreateInstitutionView;
