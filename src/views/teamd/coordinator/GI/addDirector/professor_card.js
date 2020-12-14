import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {AssignDirectorView} from './AssignDirector'
import {ConsultUser} from '../service'
import {ConsultInstitution,ConsultDeparment} from '../service'
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      minWidth: '200px',
      

    },
  });

export const Professor_card = ({profesor}) => {
    
    const { id,user, is_director_student , is_director_gi, is_internal,institution,department} = profesor;
    const classes = useStyles();
    const [usuario, setUsuario] = useState([])
    const [dialogState, setDialogState] = useState(false)
    const [nameDeparment, setNameDeparment] = useState('')
    const [nameInstitution, setNameInstitution] = useState('')
    //const link = 'profesor/'+user
    const setStateVentana = (state) =>{
        setDialogState(state)
    }
    const handleAssign = () =>{
        setDialogState(true)
    }
    useEffect(() => {
        ConsultUser(user).then( request => setUsuario(request.data.Users[0])).catch() 
    }, [profesor])
    useEffect(() => {
        ConsultInstitution(institution).then( request => setNameInstitution(request.data.Institution[0].name_inst))
    }, [usuario])
    useEffect(() => {
        ConsultDeparment(department).then( request => setNameDeparment(request.data.Department[0].name))
    }, [usuario])
    return (
        // <RouterLink to={link}>
        <Card className="border border-dark rounded mb-0">
            <CardContent>
            <Box alignItems="center" display="flex" flexDirection="column">
                
                <Typography color="textSecondary" gutterBottom>
                    Nombre: {usuario.first_name} {usuario.last_name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Departamento: {nameDeparment}
                </Typography>
                {/* <Typography color="textSecondary" gutterBottom>
                    Email: {usuario.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Institucion: {nameInstitution}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Departamento: {nameDeparment}
                </Typography> */}
                {is_director_gi === true ?(
                    <>
                    <CardActions>
                        <Button variant="outlined" size="small" disabled>Eliminar Director</Button>
                    </CardActions>
                    </>  
                    ) : is_director_gi == false ? (
                    <>
                    <CardActions>
                        <Button 
                            variant="outlined" 
                            color="primary" size="small" 
                            className = {classes.button}
                            onClick = {handleAssign}
                            >
                                Asignar Director
                        </Button>
                    </CardActions>
                    </>    
                    ) : (
                    <Typography color="textSecondary" gutterBottom>
                        Not Found
                    </Typography>
                    )}
                    <AssignDirectorView state={dialogState} setState={setStateVentana}idProfessor={id}/>
            </Box>
            </CardContent>
        </Card>
        
        // </RouterLink>


    )
}
