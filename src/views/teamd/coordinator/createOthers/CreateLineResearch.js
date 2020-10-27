import React,{Component, useState} from 'react';
//import CreateGI from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    TextField,

    
  } from '@material-ui/core';
//const crearGI = new CreateGI();
const CreateLineResearchView = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [knowLedge, setKnowLedge] = useState("")
    const handleCreate = () => {
        // crearGI.AddLineRearchService({
        //     "nombre": title,
        //     "descripcion": description,
        //     "area_con" : knowLedge,
            
        // }).then((result)=>{
        //     alert ("Linea de investigacion agregada!");
        // }).catch(()=>{
        //     alert("Error");
        // });
           
    }
    const handleChangeTitle = (e)=>{
        setTitle(e.target.value)
    }
    const handleChangeDescription = (e)=>{
        setDescription(e.target.value)
    }
    const handleChangeKnowLedge = (e)=>{
        setKnowLedge(e.target.value)
    }
    const handleSubmit = (event) =>{
        handleCreate();
        event.preventDefault();
    }
        return(
            <Container maxWidth="sm">
            <Formik
                initialValues={{
                    title:'',
                    description:'',

                    }}
                    validationSchema={
                        Yup.object().shape({
                          title: Yup.string().max(255).required('Title is required'),
                          description: Yup.string().max(255).required('Description is required'),
                          KnowLedge: Yup.string().max(255).required('KnowLedge is required'),
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
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <form  onSubmit={handleSubmit}>
                    <Box mb={3}>
                    <TextField
                        error={Boolean(touched.title && errors.title)}
                        fullWidth
                        helperText={touched.title && errors.title}
                        label="Title"
                        margin="normal"
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChangeTitle}
                        type="text"
                        value={values.title}
                        variant="outlined"
                        />
                        <TextField
                        error={Boolean(touched.description && errors.description)}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Descripcion"
                        margin="normal"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChangeDescription}
                        type="text"
                        value={values.description}
                        variant="outlined"
                        />
                        
                        <TextField
                        error={Boolean(touched.KnowLedge && errors.KnowLedge)}
                        fullWidth
                        helperText={touched.KnowLedge && errors.KnowLedge}
                        label="Area conocimiento" //TODO
                        margin="normal"
                        name="KnowLedge"
                        onBlur={handleBlur}
                        onChange={handleChangeKnowLedge}
                        type="text"
                        value={values.KnowLedge}
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
                                Agregar
                            </Button>
                        </Box>
                    </Box>   
                </form>
            </Box>
            )}
            </Formik>
            </Container>
        
    )
    
}
