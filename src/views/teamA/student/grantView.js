import React, { useEffect, useState } from 'react'
import { Container,Grid, makeStyles,Button,Typography } from '@material-ui/core';
//IMPORTANDO SERIVCIOS
import {GetGrantsService} from './service'
import {GrantViewCard} from './grantViewCard'
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link as RouterLink } from 'react-router-dom';
export const GrantView = () => {

    //Estados
    const [grants, setGrants] = useState([]) // Todos los convenios registrados
    const [studentLoggin, setstudentLoggin] = useState(JSON.parse(localStorage.getItem("estudiante")).id)   //ID de estudiante logeado actualmente 
    const [grantsStudent, setGrantsStudent] = useState([]) //Convenios del estudiante


    //Effect Obtener listado de convenios registrado
    useEffect(() => {
      const data = async () => {GetGrantsService().then(result => setGrants(result.data))}
      data()
    }, [])

    const link='/student/administer-profile/registerGrant'
    return (
  
      <Container>
        <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12} key={1231233}>
          <RouterLink to={link}>
                  <Button 
                  size="small"
                  >
                  <Typography color="textSecondary" gutterBottom>
                      Agregar <AddCircleIcon/>
                  </Typography>
                  
            </Button>
          </RouterLink>
          </Grid>
          {grants && grants.map(element => (
            <Grid item lg={6} md={9} xs={11} key={element.id}>
              {
                element.student === parseInt(localStorage.getItem("IDestudiante")) ? (
                  <GrantViewCard grant={element}/>
                ):(
                  <>
                  </>
                  )
              }
                
            </Grid>

          ))} 
  
        </Grid>
      </Container>
    );
}
