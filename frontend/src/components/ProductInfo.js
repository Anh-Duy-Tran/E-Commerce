import * as React from 'react';

import styled from 'styled-components';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import Snackbar from '@mui/material/Snackbar';

import cart from '../controllers/cart';
import { Button } from '@mui/material';
import { UserContext } from '../context/User/UserProvider';

const Container = styled.div`
  margin-bottom: auto;
`

const Name = styled.h1`
  font-family: Futura
`

const Description = styled.p`
  padding-left: 5px;
  padding-right: 25%;

  font-family: Futura
`

const Price = styled.p`
  padding-left: 5px;
  padding-right: 25%;

  font-family: Futura
`

const buttonStyle = {
  marginTop : "50px",
  color : "white",
  fontFamily : "Futura",
  fontSize : "20px",
  width : "75%",
  marginLeft : "12px",
  marginRight : "50px",
  backgroundColor : "black",
  "&:hover": {
    backgroundColor : "black",
    textDecoration: "underline #FFFFFF"
  }
}


const ProductInfo = ({product, color, setColor, noDescription}) => {
  const { state, dispatch } = React.useContext(UserContext)
  const [ size, setSize ] = React.useState(null);
  const [ snackMessage, setSnackMessage] = React.useState(null);

  const onChangeSizeClick = (newSize) => {
    setSize((prvSize) => prvSize === null ? newSize : null)
  }

  const addToCart = (product) => {
    if (size === null) {
      setSnackMessage("Please choose a size!")
      return;
    }
    cart.addToCart(product._id, product.name, color, size, product.image[color][0]);
    dispatch({ type : "update-count", payload : state.cartCount + 1})
    setSnackMessage("Item added!")
  }

  return (
    <Container>
      <Name>
        {product.name}
      </Name>

      {
        noDescription
          ? null
          : <Description>
              {product.description}
            </Description>
      }

      <Price>
        {`${product.price} EUR`}
      </Price>

      <ColorSelector colors={product.color} 
                     color={color} 
                     onChangeColor={setColor}/>
      <SizeSelector size={product.size} 
                    selected={size} 
                    selector={onChangeSizeClick}/>

      <Button sx={buttonStyle} 
              onClick={() => addToCart(product)}> 
        Add to cart 
      </Button>
      <Snackbar
        open={snackMessage !== null}
        autoHideDuration={4000}
        onClose={ () => setSnackMessage(null) }
        message={snackMessage}
      />
    </Container>
  )
}

export default ProductInfo