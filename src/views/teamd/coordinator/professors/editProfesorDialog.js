import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {SearchUser} from '../../../teamd/Search/searchUser'
import {SearchDeparmentI} from '../../../teamd/Search/searchDepartmentI'
import {SearchInstitution} from '../../../teamd/Search/searchInstitution'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {ConsultarProfesor} from './service'
import {AlertView} from 'src/components/Alert'
import { Autocomplete } from '@material-ui/lab'
import {ConsultLabP_D} from "src/views/teamd/Search/service"
import {EditLabP_D} from "src/views/teamd/Search/service"


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
    //alert
    const [openAlert, setOpenAlert] = useState(false)
    const [typeAlert, setTypeAlert] = useState('success')
    const [message, setMessage] = useState('')
    //end
    const clases=useStyles();
    const { id,user, is_internal,institution,department} = Professor;
    const [open, setOpen] = useState(true)
    const [idUser, setIdUser] = useState(user)
    const [newInternal, setNewInternal] = useState(is_internal)
    const [newIdDeparmentI, setNewIdDeparmentI] = useState(department)
    const [newIdInstitution, setNewIdInstitution] = useState(institution)
    const [CategoriaLaboral, setCategoriaLaboral] = useState(0)
    const [tiempoLaboral, settiempoLaboral] = useState(0)
    const [laboraState, setLaboraState] = useState()
    useEffect(() => {
         setOpen(state)
    }, [state])
    useEffect(() => {
      ConsultLabP_D({
        professor: id,
        department: department
      }).then( result => {
        console.log("resultado consultar labora ",result.data)
        setCategoriaLaboral(result.data[0].laboral_category)
        settiempoLaboral(result.data[0].time_category)
        setLaboraState(result.data[0].laboral_state)
      })
    }, [state])

    
    const handleClose = () =>{
        setOpen(false);
        setState(false);
    };
    const handleEdit = (e) => {
        e.preventDefault();
        ConsultarProfesor({
            "id": id,
            "is_internal": newInternal,
            "user": idUser,
            "institution": newIdInstitution,
            "department": newIdDeparmentI
        })
        .then(() => {
          console.log("estado a enviar ,",laboraState)
          let estadoLaboral = 0
          if(laboraState){
            estadoLaboral = 1
          }
          EditLabP_D({
            "laboral_category": tiempoLaboral,
            "time_category": CategoriaLaboral,
            "laboral_state": estadoLaboral,
            "professor": id,
            "department": newIdDeparmentI
          })

          setOpenAlert(true)
          setTypeAlert('success')
          setMessage('Profesor editado correctamente')
        })
        .catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos')
        });
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
    const handleChangeLaboralState = (e) =>{
      setLaboraState(e.target.value)
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
                  <Autocomplete
                      id = "TiempoTrabajo"
                      options = {["A tiempo completo","Medio tiempo"]}
                      getOptionLabel = { option => option}
                      value = { tiempoLaboral }
                      renderInput = {
                          params => (
                              <TextField
                              id="inputCategoriaLab"
                              {...params}
                              label = "Tiempo laboral"
                              variant = 'outlined'
                              inputValue={tiempoLaboral}
                              required
                              style={{width:300,marginBottom:20, marginLeft:10 }}
                              >
                              </TextField>
                          )
                      }
                      onInputCapture = { (e,input) => {settiempoLaboral(input)}}
                      onChange = { (e,input) => {settiempoLaboral(input)}}
                  />

                  <Autocomplete
                      id = "CategoriaLab"
                      options = {["catedra","planta","ocasional"]}
                      getOptionLabel = { option => option}
                      value = { CategoriaLaboral }
                      renderInput = {
                          params => (
                              <TextField
                              id="inputCategoriaLab"
                              {...params}
                              label = "Categorial laboral"
                              variant = 'outlined'
                              inputValue={CategoriaLaboral}
                              required
                              style={{ marginBottom: 10, width: 300,marginLeft:10 }}
                              >
                              </TextField>
                          )
                      }
                      onInputCapture = { (e,input) => {setCategoriaLaboral(input)}}
                      onChange = { (e,input) => {setCategoriaLaboral(input)}}
                  />

                <TextField
                  id="Estado Laboral"
                  label="Estado laboral"
                  variant="outlined"
                  select
                  style={{ width: '200px'}}
                  margin="normal"
                  defaultValue = {laboraState}
                  onChange={e => {
                    handleChangeLaboralState(e);
                  }}
                  required
                >
                  <MenuItem key="laboralOption1" value="false">
                    Inactivo
                  </MenuItem>
                  <MenuItem key="LaboralOption2" value="true">
                    Activo
                  </MenuItem>
                </TextField>
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
      <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
        </>
    )
}
