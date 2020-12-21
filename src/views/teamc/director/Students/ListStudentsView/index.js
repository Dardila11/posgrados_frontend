import React, { useState, useEffect } from 'react'
import { LinearProgress, Typography, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import BreadCrumbs from './BreadCrumbs'
import SearchBar from 'src/components/SearchBar'
import List from 'src/components/List'
import api from 'src/views/teamc/services/Api'
import ListPagination from 'src/components/ListPagination'
import { connect } from 'react-redux'

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
}))

const DirectorListStudentsView = ({ period, status, search,page }) => {
  const [studentsList, setStudentsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [initialStudentsList, setInitialStudentsList] = useState([])
  const [serviceState, setServiceState] = useState(true)
  const itemsByPage = 8
  const periods = getPeriod(initialStudentsList)
  const statuss = getStatus(initialStudentsList)
  const pages = getPages(initialStudentsList,itemsByPage)
  const classes = useStyles()

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
        if(page == '')setStudentsList(pages[0])
        else setStudentsList(pages[page-1])
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
        if(page == '')setStudentsList(pages[0])
        else setStudentsList(pages[page-1])
      }
    }
    periodFilter(period)
  }, [period])

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
        if(page == '')setStudentsList(pages[0])
        else setStudentsList(pages[page-1])
      }
    }
    statusfilter(status)
  }, [status])

  /**
   * Pagination event
   */
  useEffect(()=>{
    function pageSelect(page){
      setStudentsList(pages[page-1])
    }
    pageSelect(page)
  },[page]);

  /**
   * Obtiene la lista de estudiantes asignados al
   * director, se llama solo una vez.
   */
  useEffect(() => {
    const fetchData = async () => {
      let directorId = localStorage.getItem("id")
      await api.getDirectorStudents(directorId).then(res => {
        setStudentsList(getPages(res.data.students,itemsByPage)[0])
        setInitialStudentsList(res.data.students)
        setServiceState(false)
        setLoading(false)
      })
    }
    fetchData()
  }, [])

  return (
    <Page className={classes.root} title="Listado de estudiantes">
      <BreadCrumbs />
      <SearchBar
        context="students"
        periods={periods}
        status={statuss}/>
      {loading ? (
        <LinearProgress className={classes.progress} />
      ) : ( initialStudentsList.length > 0 ? (
        <>
        <List list={studentsList} option="Student" />
        <ListPagination pages = {pages}/>
      </>
      ) : (
        <Typography variant='h3'>No se obtuvieron resultados</Typography>
      ) 
      )}
    </Page>
  )
}

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
      if(indexv>=studentsList.length) {
        index = npages+1
      }else{
        page.push(studentsList[indexv])
        indexv++
      }      
    }
    pages.push(page)
    if(indexv>=studentsList.length) br=false
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


/**
 *
 * @param {*} state from reducers
 */
const mapStateToProps = state => ({
  period: state.filters.period,
  status: state.filters.status,
  search: state.searches.search,
  page: state.paginations.page
})

export default connect(mapStateToProps)(DirectorListStudentsView)
