import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import {EditarUser} from 'src/views/teamd/Search/service'
import { useAuth } from "src/views/auth/Context/use-auth.js";
//ESTUDIANTE
import {UpdateStudentService} from "src/views/teamA/student/service"
import {getStudents} from "src/views/teamA/student/service"
import {UpdateUserService} from "src/views/teamA/student/service"
const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {



  const auth = useAuth();
  //ESTUDIANTE GRUPO A
  const [estudiante, setEstudiante] = useState(null)
  const [tituloAcademicoEstudiante, setTituloAcademicoEstudiante] = useState(" ")
  const [ListaEstudiantes, setListaEstudiantes] = useState([])
  //END ESTUDIANTE GRUPO A
  const classes = useStyles();
  //USUARIO CAMPOS
  const [values, setValues] = useState({
    "id": JSON.parse(localStorage.getItem("userInfo")).id,
    "first_name": JSON.parse(localStorage.getItem("userInfo")).first_name,
    "last_name": JSON.parse(localStorage.getItem("userInfo")).last_name,
    "username": JSON.parse(localStorage.getItem("userInfo")).username,
    "email": JSON.parse(localStorage.getItem("userInfo")).email,
    "type_id": JSON.parse(localStorage.getItem("userInfo")).type_id,
    "personal_id": JSON.parse(localStorage.getItem("userInfo")).personal_id,
    "personal_code": JSON.parse(localStorage.getItem("userInfo")).personal_code,
    "photo": JSON.parse(localStorage.getItem("userInfo")).photo,
    "telephone": JSON.parse(localStorage.getItem("userInfo")).telephone,
    "address": JSON.parse(localStorage.getItem("userInfo")).address,
  });

  const [first_name, setfirst_name] = useState(JSON.parse(localStorage.getItem("userInfo")).first_name)
  const [last_name, setlast_name] = useState(JSON.parse(localStorage.getItem("userInfo")).last_name)
  const [username, setusername] = useState(JSON.parse(localStorage.getItem("userInfo")).username)
  const [email, setemail] = useState(JSON.parse(localStorage.getItem("userInfo")).email)
  const [personalId, setPersonalId] = useState(JSON.parse(localStorage.getItem("userInfo")).personal_id)
  const [telephone, settelephone] = useState(JSON.parse(localStorage.getItem("userInfo")).telephone)
  const [address, setaddress] = useState(JSON.parse(localStorage.getItem("userInfo")).address)
  //localStorage.getItem("rol").split(",").find(element => element === "coordinator")
  const handleChangeFirstName = (event) => {
    setfirst_name(event.target.value)
  };
  const handleChangeLastName = (event) => {
    setlast_name(event.target.value)
  };
  const handleChangeEmail = (event) => {
    setemail(event.target.value)
  };
  const handleChangePersonalId = (event) => {
    setPersonalId(event.target.value)
  };
  const handleChangeTelephone = (event) => {
    settelephone(event.target.value)
  };
  const handleChangeUsername = (event) =>{
    setusername(event.target.value)
  }
  const handleChangeAddress = (event) =>{
    setaddress(event.target.value)
  }


  const saveUser = () =>{
    if(localStorage.getItem("rol").split(",").find(element => element === "estudiante")){
      UpdateStudentService({
        "academic_title": tituloAcademicoEstudiante,
        id:estudiante.id
      }).then(result => {
        UpdateUserService({
          id:JSON.parse(localStorage.getItem("userInfo")).id,
          "telephone": telephone,
          "address": address,

        }).then(result => alert("se edito correctamente"))
      })
    }
    EditarUser({
      "id": JSON.parse(localStorage.getItem("userInfo")).id,
      "first_name": first_name,
      "last_name": last_name,
      "username": username,
      "email": email,
      "type_id": JSON.parse(localStorage.getItem("userInfo")).type_id,
      "personal_id": personalId,
      "personal_code": JSON.parse(localStorage.getItem("userInfo")).personal_code,
      // "photo": JSON.parse(localStorage.getItem("userInfo")).photo,
      "telephone": telephone,
      "address": address,
    }).then(alert("editado"))
  }
  
    //ESTUDIANTE

    const handleChangeTituloAcademico = (e)=>{
      setTituloAcademicoEstudiante(e.target.value)
    }
    useEffect(() => {
      if(auth.user===null){
        console.log("es nulo")
        }else{
        getStudents().then(result => setListaEstudiantes(result.data))
        let photo = "http://localhost:8000" + JSON.parse(localStorage.getItem("userInfo")).photo            /////////Todo
        setValues(
          {
          // firstName: JSON.parse(localStorage.getItem("userInfo")).first_name,
          // lastName: JSON.parse(localStorage.getItem("userInfo")).last_name,
          email: JSON.parse(localStorage.getItem("userInfo")).email,
          phone: JSON.parse(localStorage.getItem("userInfo")).telephone,
          state: '',
          country: '',
          })
      }
    }, [])
    useEffect(() => {
      let encontrado = ListaEstudiantes.find ( element=> element.user.id === parseInt(localStorage.getItem("id")))
      if(encontrado === undefined){
  
      }else{
        localStorage.setItem("estudiante",JSON.stringify(encontrado))
        setEstudiante(encontrado)
      }
    }, [ListaEstudiantes])
    useEffect(() => {
      if (estudiante !=null){
        setTituloAcademicoEstudiante(estudiante.academic_title)
      }
      
    }, [estudiante])




  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="La siguiente información se puede editar"
          title="Perfil"
        />
        <Divider />
        <CardContent>
        {localStorage.getItem("rol").split(",").find(element => element === "coordinador") ? (
          <>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              helperText="Please specify the first name"
              label="First name"
              name="firstName"
              onChange={handleChangeFirstName}
              required
              value={first_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              onChange={handleChangeLastName}
              required
              value={last_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Username"
              name="username"
              onChange={handleChangeUsername}
              required
              value={username}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChangeEmail}
              required
              value={email}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Identificación"
              name="identificacion"
              onChange={handleChangePersonalId}
              required
              value={personalId}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Telefono"
              name="phone"
              onChange={handleChangeTelephone}
              type="number"
              value={telephone}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Direccion de residencia"
              name="adress"
              onChange={handleChangeAddress}
              type="text"
              value={address}
              variant="outlined"
            />
          </Grid>
          </Grid>



          </>
        ):(
          <>
          </>
        )}
        
            {localStorage.getItem("rol").split(",").find(element => element === "estudiante") ? (
              <>
              <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChangeFirstName}
                disabled
                value={first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                disabled
                onChange={handleChangeLastName}
                value={last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={handleChangeUsername}
                disabled
                value={username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChangeEmail}
                disabled
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Identificación"
                name="identificacion"
                onChange={handleChangePersonalId}
                disabled
                value={personalId}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Telefono"
                name="phone"
                onChange={handleChangeTelephone}
                type="number"
                value={telephone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Direccion de residencia"
                name="adress"
                onChange={handleChangeAddress}
                type="text"
                value={address}
                variant="outlined"
              />
            </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Titulo Academico"
                      name="TitleAcademic"
                      onChange={handleChangeTituloAcademico}
                      value={tituloAcademicoEstudiante}
                      variant="outlined"
                    />
                </Grid>
                </Grid>
              </>
            ):(
              <>
              </>
            )}


            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={saveUser}
          >
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
