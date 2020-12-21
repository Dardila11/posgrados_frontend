import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//service

import { listFInstitutionService } from './service';

export const SearchInstitution = ({idCity, callback }) => {
  const [listInstitution, setlistInstitution] = useState([]);

  useEffect(() => {
    listFInstitutionService(idCity)
      .then(result => {
        setlistInstitution(result.data.Institutions);
        console.log(listInstitution)
      })
      .catch(setlistInstitution([]));
  }, [idCity]);

  const getIdInstitution = name => {
    console.log('Encontró la institucion ', name);
    let find = listInstitution.find(
      institution => institution.name_inst === name
    );
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="searchInstitutions"
      options={listInstitution}
      getOptionLabel={option => option.name_inst}
      renderInput={params => (
        <TextField
          id="inputOptionInstitution"
          {...params}
          label='Institución'
          variant='outlined'
          required
          style={{ marginBottom: 10, marginTop: 10,widht: 300 }}
        />
      )}
      onInputChange={(e, input) => getIdInstitution(input)}
      onChange={(e, input) => getIdInstitution(input)}
    />
  );
};
