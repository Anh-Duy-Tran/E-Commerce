import * as React from 'react';

import styled from 'styled-components';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import Snackbar from '@mui/material/Snackbar';

import cart from '../controllers/cart';

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


const ProductInfo = ({product, color, setColor, noDescription}) => {
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
    cart.addToCart(product._id, color, size);
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
        {product.price + " EUR"}
      </Price>

      <ColorSelector colors={product.color} color={color} onChangeColor={setColor}></ColorSelector>
      <SizeSelector size={product.size} selected={size} selector={onChangeSizeClick} ></SizeSelector>
      <button onClick={() => addToCart(product)}>Add to cart</button>
      <Snackbar
        open={snackMessage !== null}
        autoHideDuration={6000}
        onClose={ () => setSnackMessage(null) }
        message={snackMessage}
        // action={action}
      />
    </Container>
  )
}

export default ProductInfo