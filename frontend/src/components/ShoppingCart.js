import styled from 'styled-components';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CartItem from './CartItem';
import { useContext } from 'react';
import cartController from '../controllers/cart';
import productsController from '../controllers/products';
import UserContext from '../context/UserContext';

const ListHeader = styled.strong`
  font-size: 40px;
  font-family: Futura;
  padding-left: 35px;
`




const ShoppingCart = () => {
  const { products, cart } = useContext(UserContext);
  const [ cartOpen, onClick ] = cart;

  const allProductFromCart = cartController.getAllProductFromCart();
  return (
    <Box
      sx={{ width: 650, paddingTop: '50px' }}
      role="presentation"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <ListHeader>CART ({cartController.getCartCount()})</ListHeader>
      {
        allProductFromCart.map(
          productInfo => {
            const product = productsController.findProduct(productInfo._id, products);
            return (<CartItem key={productInfo.uniqueKey} orderId={productInfo.uniqueKey} product={product}></CartItem>)
          }
        )
      }
    </Box>
  );
}

export default ShoppingCart;