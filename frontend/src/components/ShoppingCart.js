import styled from 'styled-components';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CartItem from './CartItem';

import cart from '../controllers/cart';
import products from '../controllers/products';

const ListHeader = styled.strong`
  font-size: 40px;
  font-family: Futura;
  padding-left: 35px;
`




const ShoppingCart = ({onClick, allProducts}) => {
  const allProductFromCart = cart.getAllProductFromCart();
  return (
    <Box
      sx={{ width: 650, paddingTop: '50px' }}
      role="presentation"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <ListHeader>CART ({cart.getCartCount()})</ListHeader>
      {
        allProductFromCart.map(
          productInfo => {
            const product = products.findProduct(productInfo._id, allProducts);
            return (<CartItem key={productInfo.uniqueKey} orderId={productInfo.uniqueKey} product={product}></CartItem>)
          }
        )
      }
    </Box>
  );
}

export default ShoppingCart;