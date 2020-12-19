import React, { useState, useEffect } from 'react';
import { ConsultProgram, ConsultStudent } from './service';
import 'src/views/teamA/coordinator/styles.css';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

//Profes para llenar la lista


export const SearchTeacherOrAdd = ({ callback }) => {
  const [teacherList, setTeacherList] = useState([]); // cambiar los nombres de los estados
  const [value, setValue] = React.useState(null);
  const [openCod, toggleOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    teacher: ''
  });
  const handleSubmit = event => {
    event.preventDefault();
    setValue({
      teacher: dialogValue.teacher
    });

    handleCloseCod();
  };
  const handleCloseCod = () => {
    setDialogValue({
      teacher: ''
    });

    toggleOpen(false);
  };
  //llenando la lista de opciones
  useEffect(() => {
    ConsultStudent()
      .then(request => {
        console.log(request.data);
        setTeacherList(request.data); //Nota back
      })
      .catch(() => setTeacherList([]));
  }, []);

  const getIdTeacher = name => {
    let find = teacherList.find(teacher => teacher.name === name); // NOTA verificar el nombre del profesor con el back (Program.name)
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <>
      <Autocomplete
        value={value}
        fullWidth
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                teacher: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              teacher: newValue.inputValue
            });
          } else {
            setValue(newValue);
          }
        }}
        style={{ margin: '10px 0 0 0' }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              teacher: `Agregar "${params.inputValue}"`
            });
          }

          return filtered;
        }}
        options={teacherList}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.teacher;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={option => option.teacher}
        freeSolo
        renderInput={params => (
          <TextField
            id="fullwidth"
            fullWidth
            {...params}
            label="Codirector"
            variant="outlined"
          />
        )}
      />
      <Dialog
        open={openCod}
        onClose={handleCloseCod}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <DialogTitle id="form-dialog-title">
            Agregue un nuevo profesor
          </DialogTitle>
          <DialogContent>
            <span>
              En caso de no encontrar el profesor deseado, puede registarlo
            </span>
            <Button
              disableElevation
              color="primary"
              href="/coordinator/administer-Professors"
            >
              Registrar un profesor
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCod} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
