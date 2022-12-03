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
      sx={{ width: 650, paddingTop: '50px' }}
      role="presentation"
      onClick={() => dispatch({ type : "toggle-cart"})}
      onKeyDown={() => dispatch({ type : "toggle-cart"})}
    >
      <ListHeader>CART ({cartController.getCartCount()})</ListHeader>
      {
        allProductFromCart.map(
          productInfo => {
            const product = productsController.findProduct(productInfo._id, state.products);
            return (<CartItem key={productInfo.uniqueKey} orderId={productInfo.uniqueKey} product={product}></CartItem>)
          }
        )
      }
    </Box>
  );
}

export default ShoppingCart;