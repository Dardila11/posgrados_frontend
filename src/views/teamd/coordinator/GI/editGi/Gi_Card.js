import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import {EditGiDialog} from './EditGiDialog'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {ConsultGi} from '../service'
const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      minWidth: '200px',
      

    },
  });

export const Gi_Card = ({gi}) => {
    const { id,name,email,foundation_date,category,deparment} = gi;
    const classes = useStyles();
    const [dialogState, setDialogState] = useState(false)
    //const link = 'profesor/'+user
    const setStateVentana = (state) =>{
        setDialogState(state)
    }
    const handleAssign = () =>{
        setDialogState(true)
    }
    const handleTrash =()=>{
        ConsultGi({
            id: id,
            status: false
        }).then(alert("se elminio "))

    }
    return (
        // <RouterLink to={link}>
        <Box className="border rounded mb-0">
            
            <CardContent>
            <Typography color="textPrimary" variant="h4">INFO. Grupo de investegación</Typography>
            <Box alignItems="start" display="flex" flexDirection="column">
                <Typography color="textPrimary" variant="h5">Nombre <Typography color="textPrimary" variant="caption">{name}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Email <Typography color="textPrimary" variant="caption">{email}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Fecha de fundacion <Typography color="textPrimary" variant="caption">{foundation_date}</Typography></Typography>
                <Typography color="textPrimary" variant="h5"> Categoria <Typography color="textPrimary" variant="caption">{category}</Typography></Typography>
                {/* <Typography color="textSecondary" gutterBottom>
                    Email: {usuario.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Institucion: {nameInstitution}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Departamento: {nameDeparment}
                </Typography> */}
                </Box>
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
                    <EditGiDialog state={dialogState} setState={setDialogState} gi={gi}/>
            
            </CardContent>
        </Box>
        
        // </RouterLink>


    )
}
