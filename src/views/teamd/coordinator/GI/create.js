import React, { useState,useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { SearchDeparmentI } from 'src/views/teamd/Search/searchDepartmentI';
import { AlertView } from '../../../../components/Alert'
import {ConsultUserService} from 'src/views/teamd/Search/service'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {AssignDirector} from '../GI/service'
import {ConsultProfesorService} from './service'
import {
  Box,
  Button,
  Container,
  FormGroup,
  TextField,
  Typography
} from '@material-ui/core';
import { CreateGIApi } from './service';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import {SearchProfessor} from "src/views/teamd/Search/searchProfessor"
const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 1,
    borderRadius: 3,
    boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
    paddingTop: '30px',

    marginTop: '40px'
  }
});

export const CreateView = () => {
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setName] = useState(' ');
  const [email, setEmail] = useState('');
  const [departmentI, setDepartmentI] = useState('');
  const [dateFoundation, setDateFoundation] = useState('');
  const [category, setCategory] = useState('A');
  const [profesorSelect, setProfesorSelect] = useState("")
  const handleChangeName = event => {
    setName(event.target.value);
  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleChangeDepartmentI = result => {
    setDepartmentI(result);
  };
  const handleChangeCategory = e => {
    setCategory(e.target.value);
  };
  const handleChangeDateFoundation = e => {
    setDateFoundation(e.target.value);
  };
  const getIdProfessor = input =>{
      console.log("profesor seleccionado ",input)
      setProfesorSelect(input)

  }
  const handleCreate = async () => {
    setOpen(false)
    await CreateGIApi({
      name: name,
      category: category,
      email: email,
      foundation_date: dateFoundation,
      department: departmentI,
      "status": true,
    })
      .then((request) => {
        AssignDirector({
          direction_state: true,
          inv_group: request.data.id,
          professor: profesorSelect
          
      }).then( (request)=> {setOpen(true)
        setTypeAlert('success')
        setMessage('Grupo de investigacion creado correctamente')})
      .catch( ()=> {setOpen(true);setTypeAlert('error');setMessage('Error! Verifica los datos')})
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Error, Verifica los datos')
      });
  };

  const handleSubmit = event => {
    handleCreate();
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm" className={clases.root}>
      <Typography color="textPrimary" variant="h1" align="center">
        Grupo de investigación
      </Typography>
      <Formik
        initialValues={{
          name: '',
          email: '',
          department: '',
          foundationDate: '',
          category: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          name: Yup.string()
            .max(255)
            .required('Name is required'),
          department: Yup.string()
            .max(255)
            .required('department name is required'),
          foundationDate: Yup.string()
            .max(255)
            .required('FoundationDate is required')
        })}
        onSubmit={() => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              alignItems="center"
              paddingTop={3}
            >
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <FormGroup>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Nombre"
                      name="name"
                      // margin="normal"
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeName(e);
                      }}
                      type="text"
                      value={values.name}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email"
                      name="email"
                      // margin = "normal"
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeEmail(e);
                      }}
                      type="email"
                      value={values.email}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <SearchDeparmentI callback={handleChangeDepartmentI} />
                  </FormGroup>

                  <TextField
                    id="categoriaId"
                    label="Categoria"
                    style={{ width: '100px' }}
                    variant="outlined"
                    select
                    margin="normal"
                    onChange={e => {
                      handleChange(e);
                      handleChangeCategory(e);
                    }}
                    onBlur={handleBlur}
                    value={category}
                    required
                    fullWidth
                  >
                    <MenuItem key="CategoryOption1" value="A">
                      A
                    </MenuItem>
                    <MenuItem key="CategoryOption2" value="B">
                      B
                    </MenuItem>
                    <MenuItem key="CategoryOption3" value="C">
                      C
                    </MenuItem>
                  </TextField>

                  <FormGroup>
                    <InputLabel id="label-date">Fecha fundación</InputLabel>
                    <TextField
                      id="dateGI"
                      type="date"
                      defaultValue="2020-01-01"
                      required
                      style={{ marginBottom: 10, marginTop: 10, width: 200 }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onInputCapture={handleChangeDateFoundation}
                    />
                  </FormGroup>
                  <FormGroup>
                      {/* <Autocomplete
                        id="searchProffesor"
                        options={listProfessors}
                        getOptionLabel={option => option.username}
                        style={{ marginBottom: 10, marginTop: 10 }}
                        renderInput={params => (
                          <TextField
                            id="inputOption"
                            {...params}
                            label='Director'
                            variant='outlined'
                            required
                          />
                        )}
                        onInputChange={(e, input) => getIdProfessor(input)}
                        onChange={(e, input) => getIdProfessor(input)}
                      /> */}
                      <SearchProfessor callback= {getIdProfessor}/>
                  </FormGroup>
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                    >
                      Crear
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </>
        )}
      </Formik>
      <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
    </Container>
  );
};

export default CreateView;
