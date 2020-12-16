import React, { useState, useEffect } from 'react';
import { ConsultProgram, ConsultStudent } from './service';

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
const Teachers = [
  { teacher: 'Miguel Ángel Niño' },
  { teacher: 'Carlos Ardila' },
  { teacher: 'Daniel A Paz' },
  { teacher: 'Ricardo Zambrano' },
  { teacher: 'Pepito Pérez' },
  { teacher: 'Martha Mendoza' },
  { teacher: 'Alejandro López Vargas' },
  { teacher: 'Gabriel Mauricio Vega' },
  { teacher: 'José Alfonso Espada' },
  { teacher: 'Edgad David Ñañez' },
  { teacher: 'Carlos Enrique Perez' },
  { teacher: 'Jhon Eder Masso' },
  { teacher: 'Carolina Gonzales Serrano' },
  { teacher: 'Ruben Dario Molina' },
  { teacher: 'Iván Enrique Paz' },
  { teacher: 'Hugo Hernán Erazo' },
  { teacher: 'Luis Alfrdo Londoño' },
  { teacher: 'Alfredo Valderruten' },
  { teacher: 'Noé López' },
  { teacher: 'José Manuel Tobar' },
  { teacher: 'Fulanito de tal' },
  { teacher: 'Sandra Milena Roa' },
  { teacher: 'Libardo Pandoja' },
  { teacher: 'María Isabel Vidal' },
  { teacher: 'FLor Milena Vela' },
  { teacher: 'Jeiver Tapia' },
  { teacher: 'Helder Mauicio CHacon' },
  { teacher: 'Edwin Rengifo' },
  { teacher: 'Johana Andrea Hurtado' },
  { teacher: 'Wilson Alfredo Ortega' },
  { teacher: 'César Jesús Pardo' },
  { teacher: 'Eduardo Andrés Canola' },
  { teacher: 'Jumena Adriana Timana' }
];

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
        options={Teachers}
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