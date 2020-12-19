import { Container,Grid, makeStyles,Button,Typography} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {ListMembersApi} from './service'
import {MemberCard} from './memberCard'
import {addMemberService} from './service'
import {DialogAddMember} from './dialogAddMember'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {ConsultUserService} from 'src/views/teamd/Search/service'
import {ConsultProfesorService} from '../../coordinator/GI/service'
import { element } from 'prop-types';
const useStyles = makeStyles({
    root: {
      marginTop: "30px",
      background: 'white',
      border: 1,
      borderRadius: 3,
      boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
      padding: '50px'
    },
    inputs: {
      margin: '10px'
    }
  });

export const ListMembers = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const classes = useStyles();
    const [ListMembers, setListMembers] = useState([])
    const [listProfessors, setlistProfessors] = useState([])
    const [userList, setuserList] = useState([])
    useEffect(() => {
      if(localStorage.getItem("rol").split(",").find(element => element === "profesor")){
        console.log("EFECTO LISTAR MIEMBROS",JSON.parse(localStorage.getItem("GiMiembro")).id)
        console.log("listar miembros",JSON.parse(localStorage.getItem("GiMiembro")).id)
        ListMembersApi(JSON.parse(localStorage.getItem("GiMiembro")).id).then((request)=> {setListMembers(request.data.Members)})
      }else if (localStorage.getItem("rol").split(",").find(element => element === "director")){
        console.log("EFECTO LISTAR MIEMBROS",JSON.parse(localStorage.getItem("GiDirector")).id)
        console.log("listar miembros",JSON.parse(localStorage.getItem("GiDirector")).id)
        ListMembersApi(JSON.parse(localStorage.getItem("GiDirector")).id).then((request)=> {setListMembers(request.data.Members)})
      }
      
      
    }, [])
    const addMember = ()=>{
      setOpenDialog(true);
    }
    return (
      <Container>
        <Grid item lg={12} md={12} xs={12} key={1231233}>
        { localStorage.getItem("rol").split(",").find(element => element === "director") ?
                    (
                    <>
              <Button 
                  size="small"
                  onClick={addMember}
                  >
                  <Typography color="textSecondary" gutterBottom>
                      Agregar <AddCircleIcon/>
                  </Typography>
                  
            </Button>
            </>):
            (
           <>
           </>)}

          </Grid>
        <Grid container spacing={3}>
          {ListMembers && ListMembers.map(element => (
            <Grid item lg={5} md={7} xs={12} key={element.id}>
              <MemberCard member={element}/>
            </Grid>
          ))} 
  
        </Grid>
        <DialogAddMember listProfessors={listProfessors} state={openDialog} setState={setOpenDialog}/>
      </Container>
    );
}
