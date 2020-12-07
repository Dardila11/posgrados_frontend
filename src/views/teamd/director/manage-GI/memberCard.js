import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import {ConsultUser} from './service'
import {ConsultProfesor} from './service'
const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      minWidth: '200px',
      

    },
  });


  //TODO
export const MemberCard = ({member}) => {

    const classes = useStyles();
    const [usuario, setUsuario] = useState([])
    const [dialogState, setDialogState] = useState(false)
    const {id, member_status, professor, inv_group}= member
    //const link = 'profesor/'+user
    const setStateVentana = (state) =>{
        setDialogState(state)
    }
    const handleAssign = () =>{
        setDialogState(true)
    }
    useEffect(() => {
        ConsultProfesor(professor).then(request => ConsultUser(request.data.Professor[0].user).then(request => setUsuario(request.data.Users[0]))).catch()

    }, [member])


    return (
        // <RouterLink to={link}>
        <Card className="border border-dark rounded mb-0">
            <CardContent>
            <Box alignItems="center" display="flex" flexDirection="column">
                
                <Typography color="textSecondary" gutterBottom>
                    Nombre: {usuario.first_name} {usuario.last_name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Departamento: {usuario.first_name}
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
