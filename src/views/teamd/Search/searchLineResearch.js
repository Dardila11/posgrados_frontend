import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetLineResearch } from './service';

// TODO aun no esta probado
export const SearchLineLedge = ({ callback, idKnowLedge }) => {
  const [lineResearchList, setLineResearchList] = useState([]);
  //llenando la lista de opciones
  useEffect(() => {
    GetLineResearch(idKnowLedge).then(request => {
      setLineResearchList(request.data.Lines)
    }).catch( () => console.log("no encontró nada con id ", idKnowLedge)); //TODO
  }, []);

  const getIdLineResearch = name => {
    let find = lineResearchList.find(line => line.name === name);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="searchKnowLedge"
      options={lineResearchList}
      getOptionLabel={option => option.name}
      style={{ marginBottom: 10, marginTop: 10 }}
      renderInput={params => (
        <TextField
          id="inputOptionLine"
          {...params}
          label="Linea de investigación"
          variant="outlined"
          required
        />
      )}
      onInputChange={(e, input) => getIdLineResearch(input)}
      onChange={(e, input) => getIdLineResearch(input)}
    />
  );
};
