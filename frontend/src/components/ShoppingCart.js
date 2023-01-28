import styled from 'styled-components';

import Box from '@mui/material/Box';

import CartItem from './CartItem';
import { useContext, useEffect } from 'react';
import cartController from '../controllers/cart';

import { UserContext } from '../context/User/UserProvider';

const ListHeader = styled.h1`
  font-size: 40px;
  font-family: Futura;
  padding-left: 35px;
`

const Total = styled.h2`
  padding-top : 50px;
  font-size: 30px;
  font-family: Futura;
  padding-left: 35px;
`




const ShoppingCart = () => {
  const { state, dispatch } = useContext(UserContext);
  const allProductFromCart = cartController.getAllProductFromCart();

  useEffect(() => {
    dispatch({ type : "update-total-price", payload : cartController.getTotalCartPrice()})
  }, [state.cartCount, dispatch])
  return (
    <Box
      sx={{ width: 650, paddingTop: '50px', paddingBottom: '150px' }}
      role="presentation"
      onClick={(event) => dispatch({type : 'toggle-cart', event : event})}
      onKeyDown={(event) => dispatch({type : 'toggle-cart', event : event})}
    >
      <ListHeader>CART ({state.cartCount})</ListHeader>
      {
        allProductFromCart.map(
          productInfo => 
              <CartItem key={productInfo.uniqueKey} productInfo={productInfo}/>
        )
      }
      {
      state.cartCount !== 0
      ? <Total>Total: {`${state.totalPrice} EURO`}</Total>
      : null
      }
    </Box>
  );
}

export default ShoppingCart;