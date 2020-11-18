import React, { useState, useEffect } from 'react'
import { LinearProgress, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import BreadCrumbs from './BreadCrumbs'
import SearchBar from 'src/components/SearchBar'
import List from 'src/components/List'
import api from 'src/views/teamc/services/Api'
import ListPagination from 'src/components/ListPagination'
import { connect } from 'react-redux'

const handleSearch = event => {
  console.log('Cadena de busqueda: ', event.target.value)
  this.setState({
    inputValue: event.target.value
  })
}

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

const DirectorListStudentsView = ({ period, program, status }) => {
  const [studentsList, setStudentsList] = useState([])
  const [initialStudentsList, setInitialStudentsList] = useState([])
  const [loading, setLoading] = useState(true)
  const periods = getPeriod(initialStudentsList)
  const statuss = getStatus(initialStudentsList)
  const programs = getPrograms(initialStudentsList)
  const classes = useStyles()

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

  /**
   * Obtiene la lista de estudiantes asignados al
   * director, se llama solo una vez.
   */
  useEffect(() => {
    const fetchData = async () => {
      await api.getDirectorStudents(5).then(res => {
        setStudentsList(res.data.students)
        setInitialStudentsList(res.data.students)
        setLoading(false)
      })
    }
    fetchData()
  }, [])

  return (
    <Page className={classes.root} title="Listado de estudiantes">
      <BreadCrumbs />
      <SearchBar
        handleSearch={handleSearch}
        context="students"
        periods={periods}
        status={statuss}
        programs={programs}
      />

      {loading ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <>
          {/* <UploadFile /> */}
          <List list={studentsList} option="Student" />
          <ListPagination />
        </>
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
  status: state.filters.status
})

export default connect(mapStateToProps)(DirectorListStudentsView)
