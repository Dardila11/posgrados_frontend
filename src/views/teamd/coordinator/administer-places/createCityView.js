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

    const getCountry = (name,id) =>{
        setidCountry(id);
    }

    const getDepartment = (name,id) =>{
        setidDdepartment(id);
    }


    
    const handleOnchangeName = (e) =>{
        setname(e.target.value);
    }


    

    
    const handleCreate= () =>{
        CreateCityService({
            "name": name,
            "department_id": idDepartment,
            "country_id": idCountry,            
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
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="Nombre de la ciudad"
                        margin="normal"
                        name="city"
                        onBlur={handleBlur}
                        onChange = { (e) =>{handleOnchangeName(e);handleChange(e)} } 
                        type="text"
                        value={values.name}
                        variant="outlined"
                        />

                        <SearchCountry callback = {getCountry}/>
                        <SearchDepartment callback = {idCountry, getDepartment}/>                     
                                              
                        
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