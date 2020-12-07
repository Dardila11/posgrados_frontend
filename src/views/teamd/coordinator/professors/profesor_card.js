import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {ConsultInstitution,ConsultDeparment,ConsultUser} from '../GI/service'
import Box from '@material-ui/core/Box';
import {ConsultarProfesor} from "./service"
import {EditProfesorDialog} from './editProfesorDialog'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      minWidth: '200px',
      

    },
  });
export const Profesor_card = ({profesor}) => {
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

    const handleTrash =()=>{
        console.log(id)
        ConsultarProfesor({
             id: id,
             status: false
        }).then( ()=> alert("se elminio "))

    }
    return (
        // <RouterLink to={link}>
        <Card className="border border-dark rounded mb-0">
            <CardContent>
            <Typography color="textPrimary" variant="h4">Información Profesor</Typography>
            <Box alignItems="start" display="flex" flexDirection="column">
            <Typography color="textPrimary" variant="h5">Nombre <Typography color="textPrimary" variant="caption">{usuario.first_name} {usuario.last_name}</Typography></Typography>
            <Typography color="textPrimary" variant="h5">Institución <Typography color="textPrimary" variant="caption">{nameInstitution}</Typography></Typography>
            <Typography color="textPrimary" variant="h5">Departamento <Typography color="textPrimary" variant="caption">{nameDeparment}</Typography></Typography>
            </Box>
                {/* <Typography color="textSecondary" gutterBottom>
                    Email: {usuario.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Institucion: {nameInstitution}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Departamento: {nameDeparment}
                </Typography> */}
                    <Box display="flex" justifyContent="flex-end">
                    <CardActions>
                            <Button 
                                size="small"
                                onClick={handleAssign}
                                >
                                    <EditIcon />
                            </Button>
                            <Button 
                                size="small"
                                onClick={handleTrash}
                                >
                                    <DeleteIcon />
                            </Button>
                    </CardActions>
                    </Box>
                    <EditProfesorDialog state={dialogState} setState={setDialogState} Professor={profesor}/>
            
            </CardContent>
        </Card>
        
        // </RouterLink>


    )
}
