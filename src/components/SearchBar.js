import React, { useContext } from 'react';

//import { FilterContext } from 'src/views/teamc/context/FilterContext';
import { FilterContext } from 'src/views/teamc/director/Students/ListStudentsView';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Container,
  makeStyles,
  Select,
  InputLabel,
  MenuItem,
  Grid
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  root: {},
  Container: {
    height: 100
  },
  SearchBar: {
    paddingTop: 0,
    paddingBottom: 2,
    height: 90
  },
  Select: {
    alignItems: 'center'
  }
}));

const SearchBar = ({
  className,
  context,
  periods,
  status,
  programs,
  ...rest
}) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(FilterContext);

  // TODO esto deberia estar en una sola función, es que me dio pereza.
  // función que actualiza el estado de period en el context
  const changePeriod = newPeriod => {
    dispatch({ type: 'UPDATE_PERIOD', data: newPeriod });
  };
  // función que actualiza el estado de studentName en el context
  const changeName = newName => {
    dispatch({ type: 'UPDATE_NAME', data: newName });
  };
  // función que actualiza el estado de period en el context
  const changeType = newType => {
    dispatch({ type: 'UPDATE_TYPE', data: newType });
  };
  // función que actualiza el estado de studentName en el context
  const changeProgram = newProgram => {
    dispatch({ type: 'UPDATE_PROGRAM', data: newProgram });
  };

  return (
    <Container className={classes.Container}>
      <Box mt={2}>
        <Card className={classes.SearchBar}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={5} md={5} xs={12}>
                <Box maxWidth={500}>
                  <TextField
                    value={state.studentName}
                    onChange={e => changeName(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder={
                      context == 'activities'
                        ? 'Buscar actividad ...'
                        : context == 'students'
                        ? 'Buscar estudiante ...'
                        : 'Buscar Evaluación ...'
                    }
                    variant="outlined"
                  />
                </Box>
              </Grid>
              {periods == undefined ? (
                console.log('No period parameter filter')
              ) : (
                <Grid item lg={2} md={2} xs={12}>
                  <Box className={classes.Select}>
                    <InputLabel htmlFor="Select-period">
                      Seleccionar periodo
                    </InputLabel>
                    <Select
                      id="Select-period"
                      value={state.period}
                      onChange={e => changePeriod(e.target.value)}
                    >
                      {periods.map(element => (
                        <MenuItem key={element} value={element}>
                          {' '}
                          {element}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
              )}
              {status == undefined ? (
                console.log('No status parameter filther')
              ) : (
                <Grid item lg={2} md={2} xs={12}>
                  <Box className={classes.Select}>
                    <InputLabel htmlFor="Select-status">
                      Seleccionar tipo
                    </InputLabel>
                    <Select id="Select-status">
                      {status.map(element => (
                        <MenuItem key={element} value={element}>
                          {' '}
                          {element}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
              )}
              {programs == undefined ? (
                console.log('No programs parameter filther')
              ) : (
                <Grid item lg={2} md={2} xs={12}>
                  <Box className={classes.Select}>
                    <InputLabel htmlFor="Select-programs">
                      Seleccionar programa
                    </InputLabel>
                    <Select id="Select-programs">
                      {programs.map(element => (
                        <MenuItem key={element} value={element}>
                          {' '}
                          {element}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SearchBar;
