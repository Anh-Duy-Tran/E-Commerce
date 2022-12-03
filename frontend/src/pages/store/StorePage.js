import * as React from 'react';

import productsController from '../../controllers/products';

import { useParams } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';

import Navbar from "../../components/Navbar";
import StoreItem from '../../components/StoreItem';
import AddToCart from '../../components/AddToCart';

import { UserContext } from '../../context/User/UserProvider';

import productService from '../../services/products'


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
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const StorePage = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const store = useParams();
  const [ addToCartOpen, setAddToCart ] = React.useState(false);
  const [ product, setProduct ] = React.useState(null);

  React.useEffect(() => {
    dispatch({ type : "fetching" });
    productService
      .fetchProductFromStore(store)
      .then(products => {
        dispatch({ type : "update-products", payload : products });
        dispatch({ type : "fetch-success" });
      });
  }, [store])


  const toggleAddToCart = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAddToCart((prvValue) => !prvValue);
  }

  const onAddToCartClick = (id) => {
    const product = productsController.findProduct(id, state.products);
    setProduct(product);
    setAddToCart(true);
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
        {
        state.fetchStatus === 'success'
        ? <>
          <StoreContainer>
            {
              Array
              .from(state.products)
              .map(
                product => <StoreItem key={product._id} product={product} onClick={() => onAddToCartClick(product._id)}></StoreItem>
              )
            }
          </StoreContainer>
          <Drawer
            anchor={'bottom'}
            open={addToCartOpen}
            onClose={toggleAddToCart}
          >
            <AddToCart product={product}></AddToCart>
          </Drawer>
        </>
        : null
        }
    </Container>
  )
}

export default StorePage