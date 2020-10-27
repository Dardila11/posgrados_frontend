import React,{useState} from 'react';
//import CreateGI from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    TextField,

    
  } from '@material-ui/core';

//const createGI = new CreateGI();
const CreateKnowLedgeView = () =>{


    const [title, setTitle] = useState("")
    const [description, setdescription] = useState("")
    const handleChangeTitle  = (e)=>{
        setTitle(e.target.value)
    }
    const handleChangeDescription = (e) =>{
        setdescription(e.target.value);
    }
    const handleCreate = () =>{
        // createGI.AddKnowLedgeService({
        //     "nombre": title,
        //     "descripcion": description
        //     //"fechainicio": this.startDate.current.value,
        //     //"fechafin": this.endDate.current.value,
        //     //"estado": this.state.current.value,
            
        // }).then((result)=>{
        //     alert ("Area de conocimiento agregada creado!");
        // }).catch(()=>{
        //     alert("Error");
        // });
           
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
                    startDate:'',
                    endDate:'',
                    state:''
                    }}
                    validationSchema={
                        Yup.object().shape({
                          title: Yup.string().max(255).required('Title is required'),
                          description: Yup.string().max(255).required('Description is required'),
                          startDate: Yup.string().max(255).required('startDate is required'),
                          endDate: Yup.string().max(255).required('endDate is required'),
                          state: Yup.string().max(255).required('State is required')
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
                        {/* <TextField
                        label="Fecha inicio"
                        type="date"
                        inputRef = {this.startDate}
                        defaultValue="2020-01-01"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        />
                        <TextField
                        label="Fecha fin"
                        type="date"
                        inputRef = {this.endDate}
                        defaultValue="2020-01-01"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        /> */}
                        {/* <TextField
                        error={Boolean(touched.state && errors.state)}
                        fullWidth
                        helperText={touched.state && errors.state}
                        label="Estado"
                        margin="normal"
                        name="state"
                        inputRef={this.state}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.state}
                        variant="outlined"
                        /> */}
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
export default AddKnowLedgeView;
