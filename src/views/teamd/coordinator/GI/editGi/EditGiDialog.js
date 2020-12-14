import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {ConsultGi} from '../service'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {AlertView} from '../../../../../components/Alert'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import {ConsultUserService} from 'src/views/teamd/Search/service'
import {ConsultProfesorService} from '../service'
import {AssignDirector} from '../../GI/service'
import {EditDirector} from '../../GI/service'
import {GetDirige} from '../../GI/service' 
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export const EditGiDialog = ({state,setState,gi}) => {

    //alerta
    const [openAlert, setOpenAlert] = useState(false)
    const [typeAlert, setTypeAlert] = useState('success')
    const [message, setMessage] = useState('')
    const [listProfessors, setlistProfessors] = useState([])
    // end alerta
    const [profesorSelect, setProfesorSelect] = useState("")
    const [userList, setuserList] = useState([])
    const clases=useStyles();
    const { id,name,email,foundation_date,category,deparment} = gi;
    const [nameGi, setNameGi] = useState(name)
    const [emailGi, setEmailGi] = useState(email)
    const [open, setOpen] = useState(true)
    const [categoryGi, setCategoryGi] = useState(category)
    const [foundationDateGi, setFoundationDateGi] = useState(foundation_date)
    const [profesorViejo, setProfesorViejo] = useState()
    useEffect(() => {
         setOpen(state)
    }, [state])
    const handleClose = () =>{
        setOpen(false);
        setState(false);
    };

    useEffect(() => {
      ConsultUserService()
        .then(request => {
          let lista = listProfessors
          request.data.Users.map( (usuario)=>{
            if (usuario.is_proffessor === true){ // Todo arreglar setListProfessor
              lista.push(usuario)
            }
          })
          setlistProfessors(lista)
          
        })
        .catch();
        ConsultProfesorService().then( request => {setuserList(request.data.Professors)})
        
    }, []);
    const handleEdit = (e) => {
      setOpenAlert(false)
        e.preventDefault();
        ConsultGi({
          id: gi.id,
          name: nameGi,
          email: emailGi,
          foundation_date: foundationDateGi,
          category: categoryGi,
          department: deparment
        }).then( (request) => {
          GetDirige(id).then(result => {

            EditDirector({
              id:result.data.Manage[0].professor,
              professor: profesorSelect,
              gi:gi.id
          })
          }
            ).catch()
        }).catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos')
        })
        setOpen(false)
        setState(false);
    }
    const handleChangeName= (e)=>{
      setNameGi(e.target.value);
    }
    const handleChangeEmail=(e)=>{
      setEmailGi(e.target.value)
    }
    const handleChangeCategory =(e)=>{
      setCategoryGi(e.target.value)
    }
    const handleChangeDateFoundation = e => {
      setFoundationDateGi(e.target.value);
    };
    const getIdProfessor = input =>{
      let find = listProfessors.find(profesor => profesor.username === input);
      console.log("Profesor seleccionado",find)
      if (find === undefined) {
      } else {
        let find2 = userList.find (professor => professor.user === find.id)
        setProfesorSelect(find2.id);
      }
  
    }



    return (
        <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Grupo de investigacion</DialogTitle>
        <DialogContent>
            <DialogContentText>
               Para editar grupo de investigacion debe elegir los campos que quiera editar y pulsar el boton aceptar
            </DialogContentText>
        </DialogContent>
        <DialogContent>
        <TextField
                      fullWidth
                      label="Nombre"
                      name="name"           
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                      onChange={e => {
                        handleChangeName(e);
                      }}
                      type="text"
                      value={nameGi}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                    />
        </DialogContent>

        <DialogContent>
        <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                      onChange={e => {
                        handleChangeEmail(e);
                      }}
                      type="email"
                      value={emailGi}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
        </DialogContent>
        <DialogContent>
        <TextField
                    id="categoriaId"
                    label="Categoria"
                    style={{ width: '100px' }}
                    variant="outlined"
                    select
                    margin="normal"
                    onChange={e => {
                      handleChangeCategory(e);
                    }}
                    value={categoryGi}
                    required
                    fullWidth
                  >
                    <MenuItem key="CategoryOption1" value="A">
                      A
                    </MenuItem>
                    <MenuItem key="CategoryOption2" value="B">
                      B
                    </MenuItem>
                    <MenuItem key="CategoryOption3" value="C">
                      C
                    </MenuItem>
                  </TextField>
        </DialogContent>
        <DialogContent>
        <InputLabel id="label-date">Fecha fundación</InputLabel>
                    <TextField
                      id="dateGI"
                      type="date"
                      defaultValue={foundationDateGi}
                      required
                      style={{ marginBottom: 10, marginTop: 10, width: 200 }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onInputCapture={handleChangeDateFoundation}
                    />
        </DialogContent>

        <DialogContent>
        <Autocomplete
                        id="searchProffesor"
                        options={listProfessors}
                        getOptionLabel={option => option.username}
                        style={{ marginBottom: 10, marginTop: 10 }}
                        renderInput={params => (
                          <TextField
                            id="inputOption"
                            {...params}
                            label='Director'
                            variant='outlined'
                            required
                          />
                        )}
                        onInputChange={(e, input) => getIdProfessor(input)}
                        onChange={(e, input) => getIdProfessor(input)}
                      />
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
