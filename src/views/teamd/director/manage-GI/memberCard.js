import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import {ConsultUser} from './service'
import {ConsultProfesor} from './service'
import {eliminarMiembroSerivce} from './service'
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
    const eliminarMiembro = () =>{
        
        eliminarMiembroSerivce({
            "member_status": false,
            "professor": professor,
            "inv_group": inv_group
        }).then(result => alert("se eliminó"))
    }
    useEffect(() => {
        ConsultProfesor(professor).then(request => ConsultUser(request.data.user).then(request => {setUsuario(request.data.Users[0])})).catch( console.log("hola"))
    }, [member])


    return (
        // <RouterLink to={link}>
        <Card className="border border-dark rounded mb-0">
            <CardContent>
            <Box alignItems="left" display="flex" flexDirection="column">
                
                <Typography color="textSecondary" gutterBottom>
                    Nombre: {usuario.first_name} {usuario.last_name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Rol: profesor
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Email: {usuario.email}
                </Typography>
                {/* <Typography color="textSecondary" gutterBottom>
                    Institucion: {nameInstitution}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Departamento: {nameDeparment}
                </Typography> */}

                { localStorage.getItem("rol").split(",").find(element => element === "director") ?
                    (
                    <>
                    <CardActions>
                        <Button 
                            variant="outlined" 
                            color="primary" size="small" 
                            className = {classes.button}
                            onClick = {eliminarMiembro}
                            >
                                Eliminar miembro
                        </Button>
                    </CardActions>
                    </>):
                    (
                    <>
                    </>)}

                    {/* <EditProfesorDialog state={dialogState} setState={setDialogState} Member={member}/> */}
            </Box>
            </CardContent>
        </Card>
        
        // </RouterLink>


    )
}
