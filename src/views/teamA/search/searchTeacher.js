import React, { useState, useEffect } from 'react';
import { ConsultProgram, ConsultStudent } from './service';

import CreateProgramDialog from 'src/views/teamA/coordinator/CreateProgramDialog';
import { ConsultProfesorService } from './service';
import { ConsultUserService } from './service';
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

export const SearchTeacher = ({ callback }) => {
  const [teacherList, setTeacherList] = useState([]); // cambiar los nombres de los estados
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    teacher: ''
  });
  const handleSubmit = event => {
    event.preventDefault();
    setValue({
      teacher: dialogValue.teacher
    });

    handleClose();
  };
  const handleClose = () => {
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
        style={{ margin: '10px 0 0 0' }}
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
        id="SerchTeacher" // cambiar de user a program
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

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
          <TextField {...params} label="Director" variant="outlined" />
        )}
      />
    </>
  );
};
