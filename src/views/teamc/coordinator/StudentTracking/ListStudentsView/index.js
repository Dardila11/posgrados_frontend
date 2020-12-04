import React, { useState, useEffect } from 'react';
import { LinearProgress, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';
import ListPagination from 'src/components/ListPagination';
import BreadCrumbs from './BreadCrumbs';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1)      
    }
  }));


const CoordinatorListStudentsView = ({ period, program, status, search }) => {

  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialStudentsList, setInitialStudentsList] = useState([])
  const periods = getPeriod(initialStudentsList)
  const statuss = getStatus(initialStudentsList)
  const programs = getPrograms(initialStudentsList)
  const pages = getPages(initialStudentsList,2)
  const classes = useStyles();

  console.log(pages)
  /**
   * Busca los estudiante segun su nombre
   * Se supone que este useEffect se corre cada vez que
   * la variabe state.search cambia.
   */
  useEffect(() => {
    // Buscar por nombre
    function nameSearch(search) {
      let studentsListSearch = []
      if(search!=""){
        initialStudentsList.map(
          student => 
            {
              if(student.student.user.first_name.toLowerCase().includes(search.toLowerCase())||
              student.student.user.last_name.toLowerCase().includes(search.toLowerCase())){
                studentsListSearch.push(student)
              }
            }
          )
        setStudentsList(studentsListSearch)
      }else{
        setStudentsList(initialStudentsList)
      }          
    }
    nameSearch(search)
  }, [search])

  /**
   * Filtra los estudiante segun el periodo
   * Se supone que este useEffect se corre cada vez que
   * la variabe state.period cambia.
   */
  useEffect(() => {
    // Filtrar por periodo
    function periodFilter(period) {
      if (period != '-1') {
        // Filter list
        const studentsListFiltered = initialStudentsList.filter(
          student => student.period === period
        )
        setStudentsList(studentsListFiltered)
      } else {
        setStudentsList(initialStudentsList)
      }
    }
    periodFilter(period)
  }, [period])

  /**
   * Filtra los estudiantes segun el programa
   * al que pertenecen
   */
  useEffect(() => {
    function programfilter(program) {
      if (program != '-1') {
        const studentListFilteredByProgram = initialStudentsList.filter(
          student => student.student.program.name === program
        )
        setStudentsList(studentListFilteredByProgram)
      } else {
        setStudentsList(initialStudentsList)
      }
    }
    programfilter(program)
  }, [program])

  /**
   * Filtra los estudiantes segun el estado
   * que tienen. 1. Activo, 2. Inactivo, etc
   */
  useEffect(() => {
    function statusfilter(status) {
      if (status != '-1') {
        const studentListFilteredByStatus = initialStudentsList.filter(
          student => getStatusNameById(student.state) === status
        )
        setStudentsList(studentListFilteredByStatus)
      } else {
        setStudentsList(initialStudentsList)
      }
    }
    statusfilter(status)
  }, [status])

  useEffect(() => {
    const fetchData = async () => {
      await api.getStudents().then(res => {
        setStudentsList(res.data.students)
        setInitialStudentsList(res.data.students)
        setLoading(false)
      });
      
    };
    fetchData();
  }, []);        
    return (
        <Page className={classes.root} title="Listado de estudiantes">      
            <BreadCrumbs />
            <SearchBar 
            context='students'
            periods={periods}
            status={statuss}
            programs={programs}/>
            {loading ? (
              <LinearProgress />
            ):(
              <>
                <List list = {studentsList} option= 'Student'/>
                <ListPagination pages = {pages}/>
              </>
            )}
        </Page>  
      ); 
};

const getPeriod = studentsList => {
  let periodList = []
  studentsList.map(student => {
    if (!periodList.includes(student.period)) {
      periodList.push(student.period)
    }
  })
  return periodList
}

function getStatusNameById(statusId) {
  switch (statusId) {
    case 1:
      return 'Activo'
    case 2:
      return 'Inactivo'
    case 3:
      return 'Graduado'
    case 4:
      return 'Balanceado'
    case 5:
      return 'Retirado'
  }
}

const getPages = (studentsList, npages) => {
  let pages = []
  let indexv = 0
  let br = true
  while (br) {
    let page = []
    for (let index = 1; index <= npages; index++) {
      if(indexv>studentsList.length) {
        index = npages+1
      }else{
        page.push(studentsList[indexv])
        indexv++
      }      
    }
    pages.push(page)
    if(indexv>studentsList.length) br=false
  }
  return pages
}

const getStatus = studentsList => {
  let statusList = []
  studentsList.map(student => {
    let statusName = getStatusNameById(student.state)
    if (!statusList.includes(statusName)) {
      statusList.push(statusName)
    }
  })
  return statusList
}

const getPrograms = studentsList => {
  let programList = []
  studentsList.map(student => {
    if (!programList.includes(student.student.program.name)) {
      programList.push(student.student.program.name)
    }
  })
  return programList
}

/**
 *
 * @param {*} state from reducers
 */
const mapStateToProps = state => ({
  period: state.filters.period,
  program: state.filters.program,
  status: state.filters.status,
  search: state.searches.search,
  page: state.paginations.page
})

export default connect(mapStateToProps)(CoordinatorListStudentsView)