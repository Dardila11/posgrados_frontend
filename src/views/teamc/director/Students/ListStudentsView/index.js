import React, { useState, useEffect, useReducer, createContext } from 'react';
import { Divider, LinearProgress, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import BreadCrumbs from './BreadCrumbs';
import SearchBar from 'src/components/SearchBar';
import UploadFile from 'src/components/UploadFile';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';
import ListPagination from 'src/components/ListPagination';

/* import {
  FilterProvider,
  initialState,
  reducer
} from 'src/views/teamc/context/FilterContext'; */

const handleSearch = event => {
  console.log('Cadena de busqueda: ', event.target.value);
  this.setState({
    inputValue: event.target.value
  });
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  progress: {
    marginTop: '30'
  }
}));

/**
 * Creamos el objeto context, se usa para que los datos
 * puedan ser accedidos por lo componentes hijos directamente.
 * Esto evitar pasar props componente por componente
 */
export const FilterContext = createContext();

/**
 * El estado inicial y son los mismos que vamos a necesitar
 * para hacer el filtrado de datos.
 */
export const initialState = {
  studentName: '',
  period: '',
  type: '',
  program: ''
};

/**
 * Esta función actualizará el estado inicial
 * cada vez que  el valor de los select
 * ( Seleccionar Periodo, Selecccionar Tipo, Seleccionar Programa ) cambie
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERIOD':
      return {
        period: action.data
      };
    case 'UPDATE_NAME':
      return {
        studentName: action.data
      };
    case 'UPDATE_TYPE':
      return {
        type: action.data
      };
    case 'UPDATE_PROGRAM':
      return {
        program: action.data
      };
    default:
      return initialState;
  }
};

const DirectorListStudentsView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Se supone que este useEffect se corre cada vez que
   * la variabe state.period cambia.
   */
  useEffect(() => {
    // Filtrar por periodo
    function periodFilter(period) {
      if (period != '') {
        // Filter list
        const studentsListFiltered = studentsList.filter(
          student => student.period === period
        );
        setStudentsList(studentsListFiltered);
      }
    }
    periodFilter(state.period);
  }, [state.period]);

  useEffect(() => {
    const fetchData = async () => {
      await api.getDirectorStudents(5).then(res => {
        setStudentsList(res.data.students);
        setLoading(false);
      });
    };
    fetchData();
  }, []);
  const periods = get_period(studentsList);
  const status = get_status(studentsList);
  const programs = get_programs(studentsList);
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de estudiantes">
      {/* El provider es el componente padre que va a proveer el estado a sus
          componenten hijos.      
      */}
      <FilterContext.Provider value={{ state, dispatch }}>
        <BreadCrumbs />
        <SearchBar
          handleSearch={handleSearch}
          context="students"
          periods={periods}
          status={status}
          programs={programs}
        />

        {loading ? (
          <LinearProgress className={classes.progress} />
        ) : (
          <>
            {/* <UploadFile /> */}
            <List list={studentsList} option="Student" />
            <ListPagination />
            <h2>{state.studentName}</h2>
            <h2>{state.period}</h2>
            <h2>{state.type}</h2>
          </>
        )}
      </FilterContext.Provider>
    </Page>
  );
};

function get_period(list) {
  let res = [];
  console.log(list);
  list.map(element =>
    !res.includes(element.period) ? res.push(element.period) : console.log('')
  );
  return res;
}

function get_status(list) {
  let res = [];
  console.log(list);
  list.map(element =>
    !res.includes(element.state) ? res.push(element.state) : console.log('')
  );
  return res;
}

function get_programs(list) {
  let res = [];
  console.log(list);
  list.map(element =>
    !res.includes(element.student.program.name)
      ? res.push(element.student.program.name)
      : console.log('')
  );
  return res;
}
export default DirectorListStudentsView;
