import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const CardStyle = {
  width: '100%', 
  aspectRatio: 0.67
}

const StoreItem = ({product}) => {
  return (
    <Card sx={CardStyle}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={product.idle}
      />
      <CardContent>
        
      </CardContent>
      <CardActions sx={{allignContent: 'center'}}>
        <Button sc={{}} size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default StoreItem;