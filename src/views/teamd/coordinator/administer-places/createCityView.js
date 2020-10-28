import React,{useState} from 'react';
import {CreateCityService} from './service';
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

const CreateCityView = () =>{
    const [name, setname] = useState(" ")
    const [department,setdepartment]= useState(" ")
    const [country,setcountry]= useState(" ")
    const [bandera, setbandera]=useState(" ")

    const handleOnchangeCountry =(e) =>{
        let  selectCountry= document.getElementById('opcionesCountries').value;
        setcountry(selectCountry);
        //Aqui se debe consumir la api de departamentos by idPais
        console.log(selectCountry);
    }


    
    const handleOnchangeName = (e) =>{
        setname(e.target.value);
    }

    const handleOnchangeDepartment =(e)=>{
        let  selectDepartment= document.getElementById('opcionesDepartments').value;
        setcountry(selectDepartment);
    }

    

    
    const handleCreate= () =>{
        //let selectCountry = document.getElementById('opcionesCountries').value;
        //let selectDepartment = document.getElementById('opcionesDepartments').value;
        CreateCityService({
            "nombre": name,
            "departamento": department,
            "pais": country,
            
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
                        onChange = {handleOnchangeName}
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
                        

                        
                        {/* <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    mb={10}
                        >
                                    Seleccionar el departamento
                        </Typography>
                        <select className="browser-default custom-select mt-2" id="opcionesDeparments">
                        

                        </select> */}
                        
                        
                        
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