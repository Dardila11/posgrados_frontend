import React, { useState,useEffect } from 'react';
import { AddLineRearchService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Container, TextField } from '@material-ui/core';
import {AddManage} from "../manage-GI/service"
import {SearchLIGIView} from "src/views/teamd/Search/searchLIGI"
import {GetLineGIService} from 'src/views/teamd/Search/service';
import Autocomplete from '@material-ui/lab/Autocomplete';
export const AddLineResearchView = () => {
  const [lineList, setLineList] = useState([]);
  const [line, setLine] = useState('');
  const [listaGIS, setlistaGIS] = useState(JSON.parse(localStorage.getItem("GiMiembro")))
  const [GI, setGI] = useState()
  useEffect(() => {
    GetLineGIService(GI)
      .then(request => {
        console.log("LINESSSSSSSSS",request.data)
        setLineList(request.data.Lines)
      })
      .catch(() => setLineList([]));
  }, [GI]);
  const getIdLine = name => {
    let find = lineList.find(knowl => knowl.name === name);
    if (find === undefined) {
    } else {
      setLine(find.id);
    }
  };
  const getIdGI = (id) => {
    console.log("ID DE GI ",id)
    setGI(id)
  }
  const handleCreate = () => {
    AddManage({
      "analysis_state": true,
      "inv_line": line,
      "professor": JSON.parse(localStorage.getItem("profesorInfo")).id
    })
      .then(result => {
        alert('Linea de investigacion agregada!');
      })
      .catch(() => {
        alert('Error');
      });
  };
  const handleSubmit = event => {
    handleCreate();
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <form onSubmit={handleSubmit}>
            <Autocomplete
                    id="gia"
                    options={listaGIS}
                    getOptionLabel={option => option.name}
                    style={{ marginBottom: 10, marginTop: 10 }}
                    renderInput={params => (
                      <TextField
                        id="inputOptionDepartment"
                        {...params}
                        label="Grupo de investigacion"
                        variant="outlined"
                        required
                      />
                    )}
                    onInputChange={(e, input) => getIdGI(input.id)}
                    onChange={(e, input) => getIdGI(input.id)}
                  />
              
              <Box mb={3}>
                <Autocomplete
                    id="lineADD"
                    options={lineList}
                    getOptionLabel={option => option.name}
                    style={{ marginBottom: 10, marginTop: 10 }}
                    renderInput={params => (
                      <TextField
                        id="inputOption"
                        {...params}
                        label="Linea de investigacion"
                        variant="outlined"
                        required
                      />
                    )}
                    onInputChange={(e, input) => getIdLine(input)}
                    onChange={(e, input) => getIdLine(input)}
                  />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Agregar
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
    </Container>
  );
};
