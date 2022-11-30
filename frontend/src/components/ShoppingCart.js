import styled from 'styled-components';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const ListHeader = styled.strong`
  font-size: 20px;
  padding-left: 25px;
`


const ShoppingCart = ({onClick}) => (
  <Box
    sx={{ width: 650, paddingTop: '50px' }}
    role="presentation"
    onClick={onClick}
    onKeyDown={onClick}
  >
    <ListHeader>Cart</ListHeader>
    <List>
      {['View All', 'For Woman', 'For Men'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} sx={{paddingLeft: "30px"}}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <ListHeader>Men</ListHeader>
    <List>
      {['Bags', 'Travel', 'Accessories', 'Shoes'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} sx={{paddingLeft: "30px"}}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <ListHeader>Women</ListHeader>
    <List>
      {['Bags', 'Travel', 'Accessories', 'Shoes'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} sx={{paddingLeft: "30px"}}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default ShoppingCart;