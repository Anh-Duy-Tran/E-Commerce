import * as React from 'react';

import products from '../../controllers/products';
import cart from '../../controllers/cart';

import { useParams } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';
import Box from '@mui/material/Box';

import Navbar from "../../components/Navbar";
import StoreItem from '../../components/StoreItem';
import AddToCart from '../../components/AddToCart';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`

const StoreContainer = styled.div`
  display: grid;
  padding-top: 160px;
  /**
   * User input values.
   */
  --grid-layout-gap: 20px;
  --grid-column-count: 4;
  --grid-item--min-width: 250px;

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  grid-gap: var(--grid-layout-gap);
`

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const StorePage = ({ category, allProducts, allStore}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  const [addToCartOpen, setAddToCart] = React.useState(false);
  const [product, setProduct] = React.useState('');

  const toggleMenu = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuOpen((prvMenu) => !prvMenu);
  };

  const toggleCart = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCartOpen((prvCart) => !prvCart);
  };

  const toggleAddToCart = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAddToCart((prvValue) => !prvValue);
    // cart.addToCart(id);
  }

  const onAddToCartClick = (id) => {
    setProduct(id);
    setAddToCart(true);
  }

  const store = useParams().id;

  return (
    <Container>
        <HideOnScroll {...{}} sx={{padding : '0px !important'}}>
          <AppBar sx={{padding : '0px !important', background: 'transparent', boxShadow: 'none'}} >
          <Toolbar sx={{color : 'black', paddingLeft : '0px !important', paddingRight : '0px !important', paddingTop : '9px'}} >
            <Navbar stateMenu={menuOpen} 
                    stateCart={cartOpen}
                    onClickMenu={toggleMenu} 
                    onClickCart={toggleCart}
                    category={category}
                    allProducts={allProducts}
                    >
            </Navbar>
          </Toolbar>
          </AppBar>
        </HideOnScroll>
        <StoreContainer>
          {
            products.getProductFromShop(allStore[store], allProducts).map(
              product => <StoreItem key={product._id} product={product} onClick={() => onAddToCartClick(product._id)}></StoreItem>
            )
          }
        </StoreContainer>
        <Drawer
          anchor={'bottom'}
          open={addToCartOpen}
          onClose={toggleAddToCart}
        >
          <AddToCart product={products.findProduct(product, allProducts)}></AddToCart>
        </Drawer>
    </Container>
  )
}

export default StorePage