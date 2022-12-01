import styled from 'styled-components';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import cart from '../controllers/cart';

const ListHeader = styled.strong`
  font-size: 40px;
  font-family: Futura;
  padding-left: 35px;
`


const allProductFromCart = cart.getAllProductFromCart();


const ShoppingCart = ({onClick}) => {
  console.log(allProductFromCart);
  return (
    <Box
      sx={{ width: 650, paddingTop: '50px' }}
      role="presentation"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <ListHeader>CART ({cart.getCartCount()})</ListHeader>

    </Box>
  );
}

export default ShoppingCart;