import * as React from 'react';

import styled from 'styled-components';

import SideDrawer from './SideDrawer';
import ShoppingCart from './ShoppingCart';

import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from '@mui/material/Drawer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Container = styled.div`
  display: flex;
  height: 80px;
  position: absolute;
  width: 100vw;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
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
  z-index: 10;
`

const Logo = styled.p`
  margin: 0px;
  height: 100%;
  font-size: 60px;
  letter-spacing: 13px;
  font-family: Futura;
  user-select: none;
  z-index: 10;
`

const Navbar = ({stateMenu, stateCart, onClickMenu, onClickCart, category}) => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <React.Fragment key='left'>
            <IconButton aria-label="hamburger" onClick={onClickMenu} sx={{ zIndex: 10, color: 'black' }}> 
              <MenuIcon sx={{ fontSize: 40 }}></MenuIcon>
            </IconButton>
            <Drawer
              anchor={'left'}
              open={stateMenu}
              onClose={onClickMenu}
            >
              {<SideDrawer category={category} onClick={onClickMenu}></SideDrawer>}
            </Drawer>
          </React.Fragment>
        </Left>

        <Center>
          <Logo> LAVISH</Logo>
        </Center>

        <Right>
          <React.Fragment key='right'>
              <IconButton aria-label="hamburger" onClick={onClickCart} sx={{ zIndex: 10, color: 'black' }} > 
                <ShoppingCartOutlinedIcon sx={{ fontSize: 40 }}></ShoppingCartOutlinedIcon>
              </IconButton>
              <Drawer
                anchor={'right'}
                open={stateCart}
                onClose={onClickCart}
              >
                {<ShoppingCart onClick={onClickCart}></ShoppingCart>}
              </Drawer>
            </React.Fragment>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;