import React, { useState } from 'react';
import { AddKnowLedgeService } from './service';
import { Box, Button, Container, TextField } from '@material-ui/core';
import {SearchKnowLedge} from '../../Search/searchKnowLedge'
import {SearchLineLedge} from '../../Search/searchLineResearch'
export const AddKnowLedgeView = ({idGi}) => {
  const [IdKnowLedge, setIdKnowLedge] = useState('')

  const getIdKnowLedge = (id) => {
    setIdKnowLedge(id)
  }
  const handleCreate = () => {
    AddKnowLedgeService({
      study_status: true,
      inv_group: 1, //Todo
      know_area: IdKnowLedge

    })
      .then(result => {
        alert('Area de conocimiento agregada!');
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
              
            </form>
          </Box>
    </Container>
  );
};
export default AddKnowLedgeView;
