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

    
    const [studentLoggin, setstudentLoggin] = useState(1)   //ID de estudiante logeado actualmente 
    const [grantsStudent, setGrantsStudent] = useState([]) //Convenios del estudiante


    //Effect Obtener listado de convenios registrado
    useEffect(() => {
        GetGrantsService().then(result => setGrants(result.data)) //Todo actualizar result
    }, [])
    useEffect(() => {
        getGrants();
    }, [grants])

    
    // FUNCIONES
    //Obtener los convenios del estudiante logeado
    const getGrants = ()=>{
        grants.map( (grant)=>{
            if (grant.student === studentLoggin) {
                setGrantsStudent([...grantsStudent,grant])
            }
        })
    }

    //Agregar Becas
    const addGrant=() =>{

    }
    const link='/student/administer-profile/registerAgreement'
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
          {grantsStudent && grantsStudent.map(element => (
            <Grid item lg={5} md={7} xs={12} key={element.id}>
                <GrantViewCard grant={element}/>

            </Grid>

          ))} 
  
        </Grid>
      </Container>
    );
}
