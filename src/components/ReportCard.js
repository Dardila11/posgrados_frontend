import React from 'react'
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  makeStyles,
  Button
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
          <Box boxShadow={3}>
            <Card className={classes.root} >
            <Box alignItems="center" display="flex" flexDirection="column">
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    {report.name}
                  </Typography>
                  <Typography variant="body1">
                    click para descargar reporte
                  </Typography>
                </Box>
              <CardActionArea className={classes.CardAction}>
              <Button variant="outlined" color="primary" href={report.pathEXCEL}>
                Descargar EXCEL
              </Button>
              <Button variant="outlined" color="primary" href={report.pathPDF}>
                Descargar PDF
              </Button>
              </CardActionArea>
            </Card>
          </Box>
    </>
  )
}

export default ReportCard
