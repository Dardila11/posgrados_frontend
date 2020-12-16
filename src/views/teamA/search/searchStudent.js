import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ConsultProgram , ConsultStudent} from './service';
import { User } from 'react-feather';
import { id } from 'date-fns/locale';

export const SearchStudent= ({ callback }) => {
  const [studentList, setStudentList] = useState([]); // cambiar los nombres de los estados
  //llenando la lista de opciones
  useEffect(() => {
   ConsultStudent()
      .then(request => {
        console.log(request.data[0].user.first_name);
        setStudentList(request.data); //Nota back
      })
      .catch(() => setStudentList([]));
  }, []);

  const getIdStudent = name => {
    let find = studentList.find(student => student.user.first_name === name); // NOTA verificar el nombre del programa con el back (Program.name)
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="SerchStudent" // cambiar de user a program
      options={studentList}
      getOptionLabel={option => option.user.first_name} // option name
      style={{ marginBottom: 15, marginTop: 15 }}
      renderInput={params => (
        <TextField
          id="inputOption"
          {...params}
          label="Estudiante"
          variant="outlined"
          required
        />
      )}
      onInputChange={(e, input) => getIdStudent(input)}
      onChange={(e, input) => getIdStudent(input)}
    />
  );
};
