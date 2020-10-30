import React,{useState} from 'react';
import {CreateLineRearchService} from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {SearchKnowLedge} from 'src/views/teamd/Search/searchKnowLedge'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Box,
    Button,
    Container,
    TextField,

    
  } from '@material-ui/core';
export const CreateLineResearchView = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [knowLedge, setKnowLedge] = useState("")
    const handleCreate = () => {
        CreateLineRearchService({
            "name": title,
            "description": description,
            "know_area" : knowLedge,
            
        }).then(()=>{
            document.getElementById("alertLine").innerHTML="<div class='alert alert-success' role='alert'>Linea de investigación creada correctamente!</div>";
        }).catch(()=>{
            document.getElementById("alertLine").innerHTML="<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
        });
           
    }
    const handleChangeTitle = (e)=>{
        setTitle(e.target.value)
    }
    const handleChangeDescription = (e)=>{
        setDescription(e.target.value)
    }
    const handleChangeKnowLedge = (id)=>{
        setKnowLedge(id)
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
                        onChange={(e)=>{handleChangeTitle(e); handleChange(e)}}
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
                        onChange={ (e)=>{handleChangeDescription(e);handleChange(e)}}
                        type="text"
                        value={values.description}
                        variant="outlined"
                        />
                        
                        <SearchKnowLedge callback = {handleChangeKnowLedge}/>
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
                <div id = "alertLine">console.log(1)</div>
            </Box>
            )}
            
            </Formik>
            </Container>
        
    )
    
}
