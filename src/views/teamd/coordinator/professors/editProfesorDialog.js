import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {SearchUser} from '../../../teamd/Search/searchUser'
import {SearchDeparmentI} from '../../../teamd/Search/searchDepartmentI'
import {SearchInstitution} from '../../../teamd/Search/searchInstitution'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {ConsultarProfesor} from './service'
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export const EditProfesorDialog = ({state,setState,Professor}) => {
    const clases=useStyles();
    const { id,user, is_director_student , is_director_gi, is_internal,institution,department} = Professor;
    const [open, setOpen] = useState(true)
    const [idUser, setIdUser] = useState(user)
    const [newInternal, setNewInternal] = useState(is_internal)
    const [newIdDeparmentI, setNewIdDeparmentI] = useState(department)
    const [newIdInstitution, setNewIdInstitution] = useState(institution)
    useEffect(() => {
         setOpen(state)
    }, [state])
    const handleClose = () =>{
        setOpen(false);
        setState(false);
    };
    const handleEdit = (e) => {
        e.preventDefault();
        ConsultarProfesor({
            "id": id,
            "is_director_student": is_director_student,
            "is_director_gi": is_director_gi,
            "is_internal": newInternal,
            "user": idUser,
            "institution": newIdInstitution,
            "department": newIdDeparmentI
        })
        setOpen(false)
        setState(false);
    }
    const getIdUser = (id) =>{
        setIdUser(id)
    }
    const handleChangeInternal =(e) =>{
        setNewInternal(e.target.value)
    }
    const getNewIdDepartmentI=(id)=>{
        setNewIdDeparmentI(id)
    }
    const getNewIdInstitution = (id) =>{
        setNewIdInstitution(id)
    }
    
    return (
        <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Profesor</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Para editar profesor debe elegir los campos que quiera editar y pulsar el boton aceptar

                
            </DialogContentText>
            <SearchUser callback={getIdUser}/>
        </DialogContent>
        <DialogContent>
            <TextField
                        id="internalIs"
                        label="¿Es interno?"
                        style={{ width: '100px'}}
                        variant="outlined"
                        select
                        margin="normal"
                        onChange={e => {
                        handleChangeInternal(e);
                        }}
                        value={newInternal}
                        required
                        fullWidth
                    >
                        <MenuItem key="CategoryOption1" value={true}>
                        Si
                        </MenuItem>
                        <MenuItem key="CategoryOption2" value={false}>
                        No
                        </MenuItem>
            </TextField>
        </DialogContent>
        <DialogContent>
        <span>
            {newInternal ? (
                <div /* Este es el div 1 */>
                    <SearchDeparmentI
                        callback={getNewIdDepartmentI}
                    />
                </div>
                ) : (
                /* Institution*/
                <SearchInstitution callback={getNewIdInstitution} />
                )}
            </span>            
        </DialogContent>


        <DialogActions>

          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEdit} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
