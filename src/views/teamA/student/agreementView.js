import React, { useEffect, useState } from 'react'
import { Container,Grid, makeStyles,Button,Typography} from '@material-ui/core';
//IMPORTANDO SERIVCIOS
import {GetAgreementsService} from './service'
import {AgreementViewCard} from './agreementViewCard'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link as RouterLink } from 'react-router-dom';

export const AgreementView = () => {
    //Estados
    const [agreement, setAgreement] = useState([]) // Todos las becas registrados

    
    const [studentLoggin, setStudentLoggin] = useState(1)   //ID de estudiante logeado actualmente 
    const [agrementsStudent, setAgreementsStudent] = useState([]) //Convenios del estudiante


    //Effect Obtener listado de convenios registrado
    useEffect(() => {
        GetAgreementsService().then(result => setAgreement(result.data)) //Todo actualizar result
    }, [])

    
    // FUNCIONES
    const link='/student/administer-profile/registerAgreement'
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12} key={1231233}>
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
          
          {agreement && agreement.map(element => (
            <Grid item lg={5} md={6} xs={8} key={element.id}>

              {element.student === parseInt(localStorage.getItem("IDestudiante"))   ? (
                <AgreementViewCard agreement={element}/>
              ):(
                <>
                </>
              )}
              
            </Grid>
          ))}
        </Grid>
      </Container>
    );
}
