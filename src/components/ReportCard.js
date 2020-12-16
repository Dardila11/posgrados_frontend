import React from 'react'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import {
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
  Typography: {
    textAlign: 'center'
  }
}))

const ReportCard = () => {

  const classes = useStyles()
  
  return (
    <>
        <RouterLink to={"/coordinator"}>
          <Box boxShadow={3}>
            <Card className={classes.root} >
              <CardActionArea className={classes.CardAction}>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Nombre del reporte
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        </RouterLink>
    </>
  )
}

export default ReportCard
