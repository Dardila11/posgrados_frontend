import React from 'react'
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
    paddingTop: 20,
    paddingBottom: 20
  },
  Typography: {
    textAlign: 'center'
  }
}))

const ReportCard = ({report}) => {

  const classes = useStyles()
  
  return (
    <>
        <a href={report.path}>
          <Box boxShadow={3}>
            <Card className={classes.root} >
              <CardActionArea className={classes.CardAction}>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    {report.name}
                  </Typography>
                  <Typography variant="body1">
                    click para descargar reporte
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        </a>
    </>
  )
}

export default ReportCard
