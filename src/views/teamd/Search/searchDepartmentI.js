import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetDeparmentIListService } from './service';

export const SearchDeparmentI = ({ callback }) => {
  const [listDepartmentI, setListDepartmentI] = useState([]);

  useEffect(() => {
    GetDeparmentIListService()
      .then(result => {
        setListDepartmentI(result.data.Department);
      })
      .catch(()=>setListDepartmentI([]));
  }, []);
  const getIdDepartmentI = async name => {
    let find = listDepartmentI.find(department => department.name === name);
    console.log(find);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="searchDepartmentI"
      options={listDepartmentI}
      getOptionLabel={option => option.name}
      renderInput={params => (
        <TextField
          id="inputOptionDepartmentI"
          {...params}
          label="Departamento al que pertenece"
          variant="outlined"
          required
          style={{ marginBottom: 10, marginTop: 10, width: 300 }}
        />
      )}
      onInputChange={(e, input) => getIdDepartmentI(input)}
    />
  );
};
