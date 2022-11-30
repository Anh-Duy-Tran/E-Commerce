import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const StoreItem = ({}) => {
  return (
    <Card sx={{maxHeight: 600}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
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