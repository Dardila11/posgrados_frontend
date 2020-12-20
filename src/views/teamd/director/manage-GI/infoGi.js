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
    const [profesores] = useState(JSON.parse(localStorage.getItem("profesores")))
    const [profesor, setProfesor] = useState(null)
    const [grupoDeInvestigacion, setGrupoDeInvestigacion] = useState([])
    const [RangoEnGi, setRangoEnGi] = useState("")
    const [Manage, setManage] = useState([])

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
      if(profesor===null){
      }else{
        if(localStorage.getItem("rol").split(",").find(element => element ===  "director_gi")){
          ConsultDirige_d(profesor.id).then(result => {
            setManage(result.data.Manage)
          })
        }
      }
      
    }, [profesor])



    useEffect(() => {
      console.log(profesores)
      buscarProfesorPorUsuario()
    }, [])


    useEffect(() => {
      Manage.map( element => {

        GetGIId(element.inv_group).then( result => {
            setGrupoDeInvestigacion( elemento => [...elemento,result.data])
        })
      })
      
    }, [Manage])


    useEffect(() => {
      console.log("INVESTIGACION GRUPO ",grupoDeInvestigacion )
      localStorage.setItem("GiGGG",JSON.stringify(grupoDeInvestigacion))
    }, [grupoDeInvestigacion])
    return (
      <Container>
      <Box className={classes.root}>
        {grupoDeInvestigacion ? (
          <>
          {grupoDeInvestigacion.map( element => 
            <>
            <Typography variant="h3" component="h2" gutterBottom>
              Información grupo de investigación
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Id: {element.id}
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
            <Typography variant="h5" component="p" gutterBottom>
              Areas de conocimiento que trabaja:
            </Typography>
            </>
          )}
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
