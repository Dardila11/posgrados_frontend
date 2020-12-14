import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ConsultProfesorService } from './service';
export const SearchProfessor = ({ callback }) => {
  const [professorList, setProfessorList] = useState([]);
  useEffect(() => {
    ConsultProfesorService()
      .then(request => {
       setProfessorList(request.data.Professors);
      })
      .catch(() => setProfessorList([]));
  }, []);

  const getIdProfessor = user => {
    let find = userList.find(proffesor => proffesor.user === user);
    if (find === undefined) {
    } else {
      callback(find.user);
    }
  };
  return (
    <Autocomplete
      id="searchProffesor"
      options={userList}
      getOptionLabel={option => option.username}
      style={{ marginBottom: 10, marginTop: 10 }}
      renderInput={params => (
        <TextField
          id="inputOption"
          {...params}
          label='Usuario'
          variant='outlined'
          required
        />
      )}
      onInputChange={(e, input) => getIdUser(input)}
      onChange={(e, input) => getIdUser(input)}
    />
  );
};
