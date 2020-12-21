import React, { useState, useEffect } from 'react';
import {ConsultGi} from './service'
import {ConsultDirige_d} from './service'
import {
  Box,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import {ConsultLabP_D, ConsultMemberForProfesor} from "src/views/teamd/Search/service"
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
    const [Members, setMembers] = useState([])
    const [grupoDeInvestigacionMiembro, setGrupoDeInvestigacionMiembro] = useState([])

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
        if(localStorage.getItem("rol").split(",").find(element => element ===  "profesor")){
          ConsultMemberForProfesor(profesor.id).then(result => {
            console.log("MEMBERS   ",result.data)
            setMembers(result.data.Members)
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
      Members.map( element => {

        GetGIId(element.inv_group).then( result => {
            setGrupoDeInvestigacionMiembro( elemento => [...elemento,result.data])
        })
      })
      
    }, [Members])


    useEffect(() => {
      console.log("INVESTIGACION GRUPO ",grupoDeInvestigacion )
      localStorage.setItem("GiDirector",JSON.stringify(grupoDeInvestigacion))
    }, [grupoDeInvestigacion])

    useEffect(() => {
      console.log("INVESTIGACION GRUPO ",grupoDeInvestigacionMiembro )
      localStorage.setItem("GiMiembro",JSON.stringify(grupoDeInvestigacionMiembro))
    }, [grupoDeInvestigacionMiembro])
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
              Nombre: {element.name}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Email: {element.email}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Fecha fundacion: {element.foundation_date}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Categoria: {element.category}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Rango: {"Director"}
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

<Box className={classes.root}>
        
        {grupoDeInvestigacionMiembro ? (
          <>
          {grupoDeInvestigacionMiembro.map( element => 
            <>
            <Typography variant="h3" component="h2" gutterBottom>
              Información grupo de investigación
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Id: {element.id}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Nombre: {element.name}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Email: {element.email}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Fecha fundacion: {element.foundation_date}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Categoria: {element.category}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Rango: {"Miembro"}
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
        </Box>
      </Box>
      </Container>
    );
}
