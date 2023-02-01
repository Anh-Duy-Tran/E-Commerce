import * as React from 'react';

import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';

import Navbar from "../../components/Navbar";
import productService from '../../services/products';
import StoreContent from '../../components/StoreContent';
import AddProductForm from '../../components/AddProductForm';
import { UserContext } from '../../context/User/UserProvider';
import AddToCart from '../../components/AddToCart';
import Cookies from 'js-cookie';


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


const AdminStore = () => {
  const { state, dispatch } = React.useContext(UserContext);
  
  const handleAddProduct = async () => {
    const token = Cookies.get('access_token');
    await productService.addNewProduct(token, state.productPreview);
  }

  return (
    <Container>
        <HideOnScroll sx={{padding : '0px !important'}}>
          <AppBar sx={{padding : '0px !important', background: 'transparent', boxShadow: 'none'}} >
          <Toolbar sx={{color : 'black', paddingLeft : '0px !important', paddingRight : '0px !important', paddingTop : '9px'}} >
            <Navbar/>
          </Toolbar>
          </AppBar>
        </HideOnScroll>
        
        <AddProductForm/>
        <Drawer
            anchor={'bottom'}
            open={state.previewOpen}
            onClose={() => dispatch({type : "togle-preview"})}
          >
            <AddToCart product={state.productPreview} adminPreview={true} handleAddProduct={handleAddProduct}></AddToCart>
          </Drawer>
        <StoreContent fetchAll={true}/>
    </Container>
  )
}

export default AdminStore