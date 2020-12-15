import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Typography,
  makeStyles
} from '@material-ui/core'


const useStyles = makeStyles(() => ({
  root: {},
  CardAction: {
    paddingTop: 5,
    paddingBottom: 5
  },
  avatar: {
    height: 100,
    width: 100
  },
  Typography: {
    textAlign: 'center'
  },
  statusActive: {
    color: '#4caf50'
  },
  statusInactive: {
    color: '#757575'
  },
  statusRetired: {
    color: '#f44336'
  },
  statusGraduate: {
    color: '#0277bd'
  },
  statusBalanced: {
    color: '#ff9100'
  }
}))

const StudentCard = ({ className, element, ...rest }) => {
  const classes = useStyles()
  const student = element.student.user
  const program = element.student.program
  const period = element.period
  const status = element.state
  const data = student == null ? 'noexiste' : student.id
  const link = 'student/' + data

  let statusclass = null
  let state = ''
  switch (status) {
    case 1:
      statusclass = classes.statusActive
      state = 'ACTIVO'
      break
    case 2:
      statusclass = classes.statusInactive
      state = 'INACTIVO'
      break
    case 3:
      statusclass = classes.statusGraduate
      state = 'GRADUADO'
      break
    case 4:
      statusclass = classes.statusBalanced
      state = 'BALANCEADO'
      break
    case 5:
      statusclass = classes.statusRetired
      state = 'RETIRADO'
      break
    default:
      break
  }
  return (
    <>
      {student == null ? (
        <Typography variant="h3">Estudiante no existe</Typography>
      ) : (
        <RouterLink to={link}>
          <Box boxShadow={3}>
            <Card className={clsx(classes.root, className)} {...rest}>
              <CardActionArea className={classes.CardAction}>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Avatar className={classes.avatar} src={student.image} />
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    {student.first_name} {student.last_name}
                  </Typography>
                  <Typography
                    className={classes.Typography}
                    fontWeight="fontWeightMedium"
                    variant="body1"
                  >
                    {program.name}
                  </Typography>
                  <Typography fontWeight="fontWeightBold" variant="body1">
                    <b>
                      {' '}
                      <span className={statusclass}>{state}</span>{' '}
                    </b>
                  </Typography>
                  <Typography color="textSecondary" variant="body1">
                    {period}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        </RouterLink>
      )}
    </>
  )
}

StudentCard.propTypes = {
  className: PropTypes.string
}

export default StudentCard
