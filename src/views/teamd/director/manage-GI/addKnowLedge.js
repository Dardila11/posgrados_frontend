import React, { useState } from 'react';
import { AddKnowLedgeService } from './service';
import { Box, Button, Container, TextField } from '@material-ui/core';
import {SearchKnowLedge} from '../../Search/searchKnowLedge'
import Autocomplete from '@material-ui/lab/Autocomplete';

import { AlertView } from 'src/components/Alert'
export const AddKnowLedgeView = ({idGi}) => {
  const [IdKnowLedge, setIdKnowLedge] = useState('')
  const [GI, setGI] = useState()

  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const getIdKnowLedge = (id) => {
    setIdKnowLedge(id)
  }
  const getIdGI = (id) => {
    console.log("ID DE GI ",id)
    setGI(id)
  }
  const handleCreate = () => {
    setOpen(false)
    AddKnowLedgeService({
      study_status: true,
      inv_group: GI, //Todo
      know_area: IdKnowLedge

    })
      .then(result => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Area de conocimiento agregada!')
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Ocurrío un error!')
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
                    id="gi"
                    options={JSON.parse(localStorage.getItem("GiDirector"))}
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
                  <SearchKnowLedge callback={getIdKnowLedge}/>
              </Box>
              <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    
                    
              >
                Agregar
              </Button>
              <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
            </form>
          </Box>
    </Container>
  );
};
export default AddKnowLedgeView;
