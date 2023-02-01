import * as React from 'react';

import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from 'styled-components';

import Navbar from "../../components/Navbar";
import { UserContext } from '../../context/User/UserProvider';
import UserCards from '../../components/UserCards';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AdminUser = () => {
  return (
    <Container>
        <HideOnScroll sx={{padding : '0px !important'}}>
          <AppBar sx={{padding : '0px !important', background: 'transparent', boxShadow: 'none'}} >
          <Toolbar sx={{color : 'black', paddingLeft : '0px !important', paddingRight : '0px !important', paddingTop : '9px'}} >
            <Navbar/>
          </Toolbar>
          </AppBar>
        </HideOnScroll>

        <UserCards/>
    </Container>
  )
}

export default AdminUser