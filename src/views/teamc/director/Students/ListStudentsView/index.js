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

const DirectorListStudentsView = ({ period, program }) => {
  const [studentsList, setStudentsList] = useState([])
  const [initialStudentsList, setInitialStudentsList] = useState([])

  const [loading, setLoading] = useState(true)

  /**
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

  const periods = get_period(initialStudentsList)
  const status = get_status(initialStudentsList)
  const programs = get_programs(initialStudentsList)
  const classes = useStyles()
  return (
    <Page className={classes.root} title="Listado de estudiantes">
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
          {/* <h2> {period} </h2>
          <h2> {program} </h2> */}
          <List list={studentsList} option="Student" />
          <ListPagination />
        </>
      )}
    </Page>
  )
}

const getPeriod = (list) => {
  
}

function get_period(list) {
  let res = []
  //console.log(list)
  list.map(element =>
    !res.includes(element.period) ? res.push(element.period) : console.log('')
  )
  return res
}

function get_status(list) {
  let res = []
  //console.log(list)
  list.map(element =>
    !res.includes(element.state) ? res.push(element.state) : console.log('')
  )
  return res
}

function get_programs(list) {
  let res = []
  //console.log(list)
  list.map(element =>
    !res.includes(element.student.program.name)
      ? res.push(element.student.program.name)
      : console.log('')
  )
  return res
}

/**
 *
 * @param {*} state from reducers
 */
const mapStateToProps = state => ({
  period: state.filters.period,
  program: state.filters.program
})

export default connect(mapStateToProps)(DirectorListStudentsView)
