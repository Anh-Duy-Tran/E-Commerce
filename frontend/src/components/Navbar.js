import * as React from 'react';

import styled from 'styled-components';

import SideDrawer from './SideDrawer';
import ShoppingCart from './ShoppingCart';
import LoginModal from './LoginModal';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from '@mui/material/Drawer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { UserContext } from '../context/User/UserProvider';
import RegisterModal from './RegisterModal';

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

const LogoStye = {
  margin: '0px',
  height: '100%',
  fontSize: '60px',
  letterSpacing: '13px',
  fontFamily: 'Futura',
  userSelect: 'none',
  zIndex: '10',
  color: 'black',
  textDecoration: 'none',
}

const LoginButtonStyle = {
  color : "white",
  fontFamily : "Futura",
  marginLeft : "12px",
  marginRight : "50px",
  backgroundColor : "black",
  "&:hover": {
    backgroundColor : "black",
    textDecoration: "underline #FFFFFF"
  }
}


const Navbar = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const toggleMenu = (event) => dispatch({type : 'toggle-menu', event : event});
  const toggleCart = (event) => dispatch({type : 'toggle-cart', event : event});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch({type : 'logout'});
  }


  return (
    <Container>
      <Wrapper>
        <Left>
          <React.Fragment key='left'>
            <IconButton aria-label="Store" onClick={toggleMenu} sx={{ zIndex: 10, color: 'black' }}> 
              <MenuIcon sx={{ fontSize: 40 }}></MenuIcon>
            </IconButton>
            <Drawer
              anchor={'left'}
              open={state.menuOpen}
              onClose={toggleMenu}
            >
              <SideDrawer/>
            </Drawer>
          </React.Fragment>
        </Left>

        <Center>
          <Link sx={LogoStye} href='/'> LAVISH</Link>
        </Center>

        <Right>
          
          <LoginModal/>
          <RegisterModal/>
          {
            state.user === null || state.user === undefined
            ? <Button sx={LoginButtonStyle} onClick={() => dispatch({type : 'open-login'})}>Login</Button>
            
            : <>
                <Button
                  id="basic-button"
                  onClick={handleClick}
                  sx={LoginButtonStyle}
                >
                  {`Hi, ${state.user.username}`}
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
          }

          <React.Fragment key='right'>
              <IconButton aria-label="Shopping cart" onClick={toggleCart} sx={{ zIndex: 10, color: 'black' }} > 
                <Badge color="error" badgeContent={state.cartCount}>
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 40 }}></ShoppingCartOutlinedIcon>
                </Badge>
              </IconButton>
              <Drawer
                anchor={'right'}
                open={state.cartOpen}
                onClose={toggleCart}
              >
                <ShoppingCart/>
              </Drawer>
            </React.Fragment>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;