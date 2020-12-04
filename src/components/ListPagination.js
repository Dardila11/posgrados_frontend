import { Container, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import {changePage} from 'src/redux/actions/pagination'

/*
 * nos permite conectar el componente para que pueda tener acceso
 * al estado de los reducers
 */
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({

        root: {
          paddingTop: 40,
          margin: '20px',
        },
        Container:{
            textAlign: 'rigth'
        }
      }));


const ListPagination = ({pages, ...rest}) => {   
  const nPages = pages.length
  console.log(pages)
  const classes = useStyles()

  const handlePage = e => {
    var page = e.target.value
    rest.changuePage(page)
  }

  return(
      <Container className = {classes.Container} >
          <Pagination count={nPages} color='primary' onChange={handlePage}/>          
      </Container>            
  );
    

}

const mapDispatchToProps = dispatch => {
  return {
    changuePage: page => dispatch(changePage(page))
  }
}

export default connect(null, mapDispatchToProps)(ListPagination)
