import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {ConsultInstitution,ConsultDeparment,ConsultUser} from '../GI/service'
import Box from '@material-ui/core/Box';
import {EditProfesorDialog} from './editProfesorDialog'
const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      minWidth: '200px',
      

    },
  });


  //TODO
export const MemberCard = ({member}) => {
    const { user, is_director_student , is_director_gi, is_internal,institution,department} = member; //TODO
    const classes = useStyles();
    const [usuario, setUsuario] = useState([])
    const [dialogState, setDialogState] = useState(false)
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
                    <CardActions>
                        <Button 
                            variant="outlined" 
                            color="primary" size="small" 
                            className = {classes.button}
                            onClick = {handleAssign}
                            >
                                Eliminar miembro
                        </Button>
                    </CardActions>
                    {/* <EditProfesorDialog state={dialogState} setState={setDialogState} Member={member}/> */}
            </Box>
            </CardContent>
        </Card>
        
        // </RouterLink>


    )
}
