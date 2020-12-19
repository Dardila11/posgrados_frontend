import React, { useState, useEffect } from 'react';
import {ConsultGi} from './service'
import {ConsultDirige_d} from './service'
import {
  Box,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import {ConsultMemberForProfesor} from "src/views/teamd/Search/service"
import {IsMemberGI} from "src/views/teamd/Search/service"
import {GetGIId} from "src/views/teamd/Search/service"
const useStyles = makeStyles({
    root: {
      minWidth: 275,
      height: '350px',
      marginTop: '15px'
    },
    statusActive: {
      color: '#4caf50'
    },
    statusInactive: {
      color: '#757575'
    },
    statusRetired: {
      color: '#f44336'
    },
    statusGraduate: {
      color: '#0277bd'
    }
  });

export const InfoGi = () => {   
    const classes = useStyles();
    const [profesores, setProfesores] = useState(JSON.parse(localStorage.getItem("profesores")))
    const [profesor, setProfesor] = useState(null)
    const [grupoDeInvestigacion, setGrupoDeInvestigacion] = useState()
    const [RangoEnGi, setRangoEnGi] = useState("")


    const buscarProfesorPorUsuario =() =>{
      console.log(localStorage.getItem("id"))
      let profesorEncontrado=profesores.find(element => element.user === parseInt(localStorage.getItem("id")))
      console.log("profesor Encontrado::::",profesorEncontrado)
      if (profesorEncontrado === undefined){
        console.log("no encontró profesor",profesorEncontrado)
        setProfesor(null)
      }else{
        setProfesor(profesorEncontrado)
      }
    }
    useEffect(() => {
      console.log(profesores)
      buscarProfesorPorUsuario()
    }, [])
    useEffect(() => {
      if(profesor===null){
      }else{
        if(localStorage.getItem("rol").split(",").find(element => element ===  "director")){
          ConsultDirige_d(profesor.id).then(result => {ConsultGi(result.data.Manage[0].inv_group).then(result => {
            setGrupoDeInvestigacion(result.data.Group[0])
            localStorage.setItem("GiDirector",JSON.stringify(result.data.Group[0]))
            setRangoEnGi("Director")
          })})
        }
        if(localStorage.getItem("rol").split(",").find(element => element === "profesor")){
          ConsultMemberForProfesor(JSON.parse(localStorage.getItem("profesorInfo")).id).then(result => {
            GetGIId(result.data.Members[0].inv_group).then(result => {
              setGrupoDeInvestigacion(result.data.Group[0])
              localStorage.setItem("GiMiembro",JSON.stringify(result.data.Group[0]))
              setRangoEnGi("Miembro")
            })
          } )

        }

      }
      
    }, [profesor])

    return (
      <Container>
      <Box className={classes.root}>


        {grupoDeInvestigacion ? (
          <>
                  <Typography variant="h3" component="h2" gutterBottom>
                    Información grupo de investigación
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Id: {grupoDeInvestigacion.id}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Nombre: {grupoDeInvestigacion.name}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Email: {grupoDeInvestigacion.email}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Fecha fundacion: {grupoDeInvestigacion.foundation_date}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Categoria: {grupoDeInvestigacion.category}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Rango: {RangoEnGi}
                  </Typography>
                </>
        ) : (
          <>
          </>

        )}
        <Box display="flex" justifyContent="flex-end" p={2}>
          {/* <IconButton aria-label="delete" >
          <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an edit">
          <EditIcon />
          </IconButton> */}
        </Box>
      </Box>
      </Container>
    );
}
