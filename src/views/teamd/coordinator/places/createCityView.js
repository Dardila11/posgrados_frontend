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

//Import component search
import {SearchCountry} from 'src/views/teamd/Search/searchCountry'
import {SearchDepartment} from 'src/views/teamd/Search/searchDepartment'

const CreateCityView = () =>{
    const [name, setname] = useState(" ")
    const [idDepartment,setidDdepartment]= useState(" ")
    const [idCountry,setidCountry]= useState(" ")

    const setCountry = (id) =>{
        setidCountry(id);
    }

    const getDepartment = (id) =>{
        console.log("el departamento es " , id)
        setidDdepartment(id);
    }


    
    const handleOnchangeName = (e) =>{
        setname(e.target.value);
    }

    const handleCreate= () =>{
        CreateCityService({
            "name": name,
            "department": idDepartment,    
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
                    name:'',
                    department:'',
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

                        <SearchCountry callback = {setCountry}/>

                        <SearchDepartment idCountry = {idCountry} callback = {getDepartment}/>                     
                                              
                        
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