import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import {EditGiDialog} from './EditGiDialog'

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
    return (
        // <RouterLink to={link}>
        <Card className="border border-dark rounded mb-0">
            <CardContent>
            <Box alignItems="center" display="flex" flexDirection="column">
                
                <Typography color="textSecondary" gutterBottom>
                    Nombre: {name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Email: {email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Fecha fundacion: {foundation_date}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Categoria: {category}
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
                                Editar Grupo de investigacion
                        </Button>
                    </CardActions>
                    <EditGiDialog state={dialogState} setState={setDialogState} gi={gi}/>
            </Box>
            </CardContent>
        </Card>
        
        // </RouterLink>


    )
}
