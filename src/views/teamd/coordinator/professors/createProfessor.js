import React,{useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {CreateProfessorApi} from './service'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Box,
    Button,
    TextField,
    Container,
    Typography,
  } from '@material-ui/core';
import { SearchDeparmentI } from '../../Search/searchDepartmentI';

const CreateProfessorView = () => {

    const [Institution, setInstitution] = useState("")
    const [name, setname] = useState("")
    const [identification, setidentification] = useState()
    const [lastName, setlastName] = useState("")
    const [isInternal, setisInternal] = useState("Si")
    const [departmentI, setdepartmentI] = useState("")

    //obtener inputs 
    const handleChangeIdentification = (e) =>{
        setidentification(e.target.value);
        console.log(identification)
    }
    const handleChangeName = (e) =>{
        setname(e.target.value);
    }
    const handleChangeLastName = (e) =>{
        setlastName(e.target.value);
    }
    const handleChangeDepartmentI = (result) =>{
        setdepartmentI(result)
    }
    const handleChangeInstitution = (e) =>{
        setInstitution(e.target.value);
    }  

    const handleChangeIsInternal = (e) =>{
        let selecteds = document.getElementById("selectedIsInternal");
        setisInternal(selecteds.options[selecteds.selectedIndex].text);
        if (selecteds.options[selecteds.selectedIndex].text  === "No"){
            setisInternal(false);

        }
        else{
            setisInternal(true);
        }

    }
    

    const handleCreate = () =>{

        if(isInternal === "Si"){
            setisInternal(1)
            //setInstitution(1)
        }else{
            setisInternal(0)
            //setdepartmentI("")
        }
        CreateProfessorApi({

            "cedula": identification,
            "nombre": name,
            "apellido": lastName,
            "es_interno": isInternal,
            //"institucion" : institucion,
            //"departamentoi": departmentI,


            
        }).then((result)=>{

            document.getElementById("contenedorProfesor").innerHTML="<div class='alert alert-success' role='alert'>Profesor creado correctamente!</div>";


        }).catch(()=>{
            document.getElementById("contenedorProfesor").innerHTML="<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
        });
           
    }
    const handleSubmit = (event) =>{
        handleCreate();
        event.preventDefault();
    }
    return(
        
        <Container maxWidth="sm">
        
        <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Crear Profesor
        </Typography>
                  
        <Formik
        initialValues={{
            identification:'',
            name:'',
            lastName:''
            }}
            validationSchema={
                Yup.object().shape({
                  identification: Yup.string().max(255).required('Identification is required'),
                  name: Yup.string().max(255).required('Name is required'),
                  lastName: Yup.string().max(255).required('LastName is required'),
                  departmentI: Yup.string().max(255).required('Department is required'),
                  institution: Yup.string().max(255).required('Institutio is required')
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
                        error={Boolean(touched.identification && errors.identification)}
                        fullWidth
                        helperText={touched.identification && errors.identification}
                        label="Cedula"
                        margin="normal"
                        name="identification"
                        onBlur={handleBlur}
                        onChange={(e)=> {handleChangeIdentification(e); handleChange(e)}}
                        type="text"
                        value={values.identification}
                        variant="outlined"
                        />
                        <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Nombre"
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={(e)=> {handleChange(e);handleChangeName(e)}}
                        type="text"
                        value={values.name}
                        variant="outlined"
                        />
                        <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Apellidos"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={(e)=> {handleChange(e);handleChangeLastName(e)}}
                        type="text"
                        value={values.lastName}
                        variant="outlined"
                        />
                        <div style={{display:'flex', marginTop: '10px', marginBottom: '10px'}}>
                        <Typography
                                    color="textPrimary"
                                    variant="h6"
                                >
                                    ¿Es interno?
                        </Typography>
                        <select style={{marginTop: '0px' , width: '50px', height: '25px', marginLeft:'15px'}} id="selectedIsInternal" 
                        onChange={handleChangeIsInternal}>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>  
                        </div>

                        <span>
                        {isInternal ? (
                            <div /* Este es el div 1 */  >
                                <SearchDeparmentI callback = {handleChangeDepartmentI}/>
                            </div>
                        ) : (
                            <div /* Este es el div 2 */  >                        <TextField
                                                        error={Boolean(touched.institution && errors.institution)}
                                                        fullWidth
                                                        helperText={touched.institution && errors.institution}
                                                        label="Institucion a la que pertenece"
                                                        margin="normal"
                                                        name="institution"
                                                        onBlur={handleBlur}
                                                        onChange={(e)=> {handleChangeInstitution(e); handleChange(e)}}
                                                        type="text"
                                                        value={values.institution}
                                                        variant="outlined"
                                                        /></div>
                        )}
                        </span>

                        
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
                        {/* ALERT TODO*/ }
                <div id="contenedorProfesor">

                </div>
            </Box>
            </>)}

        
        </Formik>
        
        </Container>
    )
}
export default CreateProfessorView;
