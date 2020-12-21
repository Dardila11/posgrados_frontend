import { Container,Grid, makeStyles,Button,Typography} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {ListMembersApi} from './service'
import {MemberCard} from './memberCard'
import {DialogAddMember} from './dialogAddMember'
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const ListMembers = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [ListMembers, setListMembers] = useState([])
    const [ListMembersDirige, setListMembersDirige] = useState([])
    const [listProfessors, setlistProfessors] = useState([])
    useEffect(() => {
      
      if(localStorage.getItem("rol").split(",").find(element => element === "profesor")){
        JSON.parse(localStorage.getItem("GiMiembro")).map( element => {
          ListMembersApi(element.id).then((request)=> {setListMembers(request.data.Members)})
        })
        
      }
      if(localStorage.getItem("rol").split(",").find(element => element === "director")){
        JSON.parse(localStorage.getItem("GiDirector")).map( element => {
          ListMembersApi(element.id).then((request)=> {setListMembersDirige(request.data.Members)})
        })
        
      }
      
      
    }, [])
    const addMember = ()=>{
      setOpenDialog(true);
    }
    return (
      <Container>
        <Grid item lg={12} md={12} xs={12} key={1231233}>
        { localStorage.getItem("rol").split(",").find(element => element === "director_gi") ?
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

            <Grid container spacing={3}>
                {ListMembersDirige && ListMembersDirige.map(element => (
                  <Grid item lg={5} md={7} xs={12} key={element.id}>
                    <MemberCard member={element}/>
                  </Grid>
                ))} 
        
              </Grid>
            </>):
            (
           <>

          <Grid container spacing={3}>
          {ListMembers && ListMembers.map(element => (
            <Grid item lg={5} md={7} xs={12} key={element.id}>
              <MemberCard member={element}/>
            </Grid>
          ))} 
  
          </Grid>
           </>)}

        </Grid>
        <DialogAddMember listProfessors={listProfessors} state={openDialog} setState={setOpenDialog}/>
      </Container>
    );
}
