import * as React from 'react';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import styled from 'styled-components';

const CardStyle = {
  width: '100%', 
  aspectRatio: 0.67,
  boxShadow: 'none',
  paddingBottom: '30px',
  cursor: 'pointer',
}
const TextStyle = {
  fontFamily: 'Futura', 
  paddingTop:'10px',
  fontSize: '15px'
}

const linkStyle = {
  justifyContent: 'flex-start',
  paddingTop:'10px',
  color: "black",
  fontSize : "15px",
}

const NameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`


const StoreItem = ({product, onClick}) => {
  return (
    <Card sx={CardStyle}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={product.idle}
      />
      <CardContent sx={{padding: '0px'}}>
        <NameDiv>
          <Link underline="hover" sx={linkStyle} href={"/products/" + product._id}>{product.name}</Link>
          <Typography sx={{...TextStyle, justifyContent: 'flex-end'}} >{product.price}</Typography>
        </NameDiv>
      </CardContent>
      <CardActions sx={{allignContent: 'center', justifyContent: 'center'}}>
        <IconButton sc={{color:'black'}} aaria-label="add to cart" onClick={onClick}>
          <AddIcon></AddIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StoreItem;