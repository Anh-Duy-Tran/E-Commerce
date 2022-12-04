import styled from 'styled-components';

import Box from '@mui/material/Box';

import CartItem from './CartItem';
import { useContext } from 'react';
import cartController from '../controllers/cart';
import productsController from '../controllers/products';


import { UserContext } from '../context/User/UserProvider';

const ListHeader = styled.strong`
  font-size: 40px;
  font-family: Futura;
  padding-left: 35px;
`




const ShoppingCart = () => {
  const { state, dispatch } = useContext(UserContext);

  const allProductFromCart = cartController.getAllProductFromCart();
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
          productInfo => {
            return (
              <CartItem key={productInfo.uniqueKey} 
                        name={productInfo.name}
                        orderId={productInfo.uniqueKey}
                        init_amount={productInfo.amount}
                        img={productInfo.img}
              ></CartItem>)
          }
        )
      }
    </Box>
  );
}

export default ShoppingCart;