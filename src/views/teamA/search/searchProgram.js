import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ConsultProgram } from './service';

export const SearchProgram= ({ callback }) => {
  const [programList, setProgramList] = useState([]); // cambiar los nombres de los estados
  //llenando la lista de opciones
  useEffect(() => {
   ConsultProgram()
      .then(request => {
        console.log(request.data);
        setProgramList(request.data); //Nota back
      })
      .catch(() => setProgramList([]));
  }, []);

  const getIdProgram = name => {
    let find = programList.find(program => program.name === name); // NOTA verificar el nombre del programa con el back (Program.name)
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="SerchProgram" // cambiar de user a program
      options={programList}
      getOptionLabel={option => option.name} // option name
      style={{ marginBottom: 15, marginTop: 15 }}
      renderInput={params => (
        <TextField
          id="inputOption"
          {...params}
          label="Programa"
          variant="outlined"
          required
        />
      )}
      onInputChange={(e, input) => getIdProgram(input)}
      onChange={(e, input) => getIdProgram(input)}
    />
  );
};
