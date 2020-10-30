import React,{useState} from 'react';
import {CreateInstitutionService} from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';


//Import component search
import {SearchCountry} from 'src/views/teamd/Search/searchCountry'
import {SearchDepartment} from 'src/views/teamd/Search/searchDepartment'
import {SearchCity} from 'src/views/teamd/Search/searchCity'

import {
    Box,
    Button,
    Container,
    TextField,
    
  } from '@material-ui/core';


const CreateInstitutionView =()=>{

    const [name, setname] = useState(" ")
    const [idDepartment,setidDdepartment]= useState(" ")
    const [idCountry,setidCountry]= useState(" ")
    const [idCity, setidCity]=useState(" ")

    const handleOnchangeName = (e) =>{
        setname(e.target.value)
        console.log(e.target.value);       
    }
    
    const getCountry = (id) =>{
        setidCountry(id);
    }

    const getDepartment = (id) =>{
        setidDdepartment(id);
    }

    const getCity = (id) =>{
        setidCity(id);
    }

    const handleCreate = ()=>{
        CreateInstitutionService({
            "name_inst": name,
            "city": idCity,
            "department": idDepartment,
            "country": idCountry            
        }).then(()=>{
            document.getElementById("contenedorInstitution").innerHTML="<div class='alert alert-success' role='alert'>Institucion creada correctamente!</div>";
        }).catch(()=>{
            document.getElementById("contenedorInstitution").innerHTML="<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
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
                    name:'',

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
                        label="Nombre"
                        margin="normal"
                        name="name"
                        onChange = {(e) => {handleOnchangeName(e); handleChange(e)}}
                        onBlur={handleBlur}
                        type="text"
                        value={values.name}
                        variant="outlined"
                        />

                        <SearchCountry callback = {getCountry}/>
                        <SearchDepartment idCountry = {idCountry} callback = {getDepartment}/> 
                        <SearchCity idDepartment = {idDepartment} callback = {getCity}/> 

                        
                    
                        
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
            <div id="contenedorInstitution">

            </div>
            </>
            )}
            </Formik>
            </Container>
        
    )
    
}

export default CreateInstitutionView;
