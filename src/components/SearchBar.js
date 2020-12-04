import React from 'react'

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
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import {changePeriod, changeProgram, changeStatus} from 'src/redux/actions/filters'
import {changeSearch} from 'src/redux/actions/search'

/*
 * nos permite conectar el componente para que pueda tener acceso
 * al estado de los reducers
 */
import { connect } from 'react-redux'

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
}))

const SearchBar = ({ className, context, periods, status, programs, ...rest }) => {
  const classes = useStyles()

  const handleChange = e => {
    var period = e.target.value
    rest.changePeriod(period)
  }

  const handleChangeProgram = e => {
    var program = e.target.value
    rest.changeProgram(program)
  }

  const handleChangeStatus = e => {
    var status = e.target.value
    rest.changeStatus(status)
  }

  const handleChangeSearch = e =>{
    var search = e.target.value
    rest.changeSearch(search)
  }
  return (
    <Container className={classes.Container}>
      <Box mt={2}>
        <Card className={classes.SearchBar}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={5} md={5} xs={12}>
                <Box maxWidth={500}>
                  <TextField
                    fullWidth
                    onChange={handleChangeSearch}
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
                console.log('No period parameter filther')
              ) : (
                <Grid item lg={2} md={2} xs={12}>
                  <Box className={classes.Select}>
                    <InputLabel htmlFor="Select-cohorte">
                      Seleccionar periodo
                    </InputLabel>
                    <Select 
                    id="Select-cohorte"
                    onChange={handleChange}>
                      <MenuItem value={"-1"} >---</MenuItem>  
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
                    <InputLabel htmlFor="Select-cohorte">
                      Seleccionar Estado
                    </InputLabel>
                    <Select 
                    id="Select-cohorte"
                    onChange={handleChangeStatus}>
                      <MenuItem value={"-1"} >---</MenuItem> 
                      {status.map(element => (
                        <MenuItem key={element} value={element}>
                          {console.log(element)}
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
                    <InputLabel htmlFor="Select-cohorte">
                      Seleccionar programa
                    </InputLabel>
                    <Select 
                    id="Select-cohorte"
                    onChange={handleChangeProgram}
                    >
                    <MenuItem value={"-1"} >---</MenuItem> 
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
  )

}

const mapDispatchToProps = dispatch => {
  return {
    changePeriod: period => dispatch(changePeriod(period)),
    changeProgram: program => dispatch(changeProgram(program)),
    changeStatus: status => dispatch(changeStatus(status)),
    changeSearch: search => dispatch(changeSearch(search))
  }
}

export default connect(null, mapDispatchToProps)(SearchBar)
