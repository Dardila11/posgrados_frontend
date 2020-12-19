import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetDeparmentIListService } from './service';

export const SearchDeparmentI = ({ callback }) => {
  const [listDepartmentI, setListDepartmentI] = useState([]);

  useEffect(() => {
    GetDeparmentIListService()
      .then(result => {
        setListDepartmentI(result.data.Departments);
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
          label="Departamento de la universidad"
          variant="outlined"
          required
          style={{width: 300, marginLeft:10,marginBottom: 10 }}
        />
      )}
      onInputChange={(e, input) => getIdDepartmentI(input)}
    />
  );
};
