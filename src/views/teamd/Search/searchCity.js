import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { listCitiesService } from './service';

export const SearchCity = ({ idDepartment, callback }) => {
  const [listCities, setListCities] = useState([]);

  const getIdCity = name => {
    console.log('Encontró la ciudad ', name);
    const find = listCities.find(city => city.name === name);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-lone-blocks
    {
      listCitiesService(idDepartment)
        .then(result => setListCities(result.data.Cities))
        .catch(setListCities([]));
    }
  }, [idDepartment]);
  return (
    <Autocomplete
      id="searchCities"
      options={listCities}
      getOptionLabel={option => option.name}
      style={{ marginBottom: 10, marginTop: 10, widht: 300 }}
      renderInput={params => (
        <TextField
          id="inputOptionCity"
          {...params}
          label="Ciudad"
          variant="outlined"
          required
        />
      )}
      onInputChange={(e, input) => getIdCity(input)}
      onChange={(e, input) => getIdCity(input)}
    />
  );
};
