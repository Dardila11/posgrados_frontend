import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetKnowLedgeListService } from './service';

export const SearchKnowLedge = ({ callback }) => {
  const [knowLedgeList, setknowLedgeList] = useState([]);
  //llenando la lista de opciones
  useEffect(() => {
    GetKnowLedgeListService()
      .then(request => {
        setknowLedgeList(request.data.Knowledges);
      })
      .catch(() => setknowLedgeList([]));
  }, []);

  const getIdKnowLedge = name => {
    console.log(knowLedgeList);
    let find = knowLedgeList.find(knowl => knowl.name === name);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
  id="searchKnowLedge"
  options={knowLedgeList}
  getOptionLabel={option => option.name}
  style={{ marginBottom: 10, marginTop: 10}}
  renderInput={params => (
    <TextField
  id="inputOption"
      {...params}
  label="Area de conocimiento"
  variant="outlined"
  required
  />
  )}
  onInputChange={(e, input) => getIdKnowLedge(input)}
  onChange={(e, input) => getIdKnowLedge(input)}
  />
  );
};
