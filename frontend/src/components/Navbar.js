import * as React from 'react';

import styled from 'styled-components';

import SideDrawer from './SideDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from '@mui/material/Drawer';


const Container = styled.div`
  display: flex;
  height: 80px;
  position: absolute;
  width: 100vw;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Right = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
`

const Center = styled.div`
  flex: 1;
  justify-content: flex-center;
  align-items: center;
  text-align: center;
`

const Logo = styled.p`
  margin: 0px;
  height: 100%;
  font-size: 60px;
  letter-spacing: 13px;
  font-family: Futura;
  user-select: none;
`

const Navbar = ({state, onClick}) => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <React.Fragment key='left'>
            <IconButton aria-label="hamburger" onClick={onClick} sx={{ zIndex: 10 }} > 
              <MenuIcon sx={{ fontSize: 40 }}></MenuIcon>
            </IconButton>
            <Drawer
              anchor={'left'}
              open={state}
              onClose={onClick}
            >
              {<SideDrawer onClick={onClick}></SideDrawer>}
            </Drawer>
          </React.Fragment>
          
          
        </Left>

        <Center>
          <Logo>LAVISH</Logo>
        </Center>

        <Right>

        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;