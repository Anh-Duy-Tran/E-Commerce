import * as React from 'react';

import styled from 'styled-components';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';

const Container = styled.div`

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


const ProductInfo = ({product, color, setColor}) => {
  const [ size, setSize ] = React.useState('')

  const onChangeSizeClick = (newSize) => {
    console.log(size, newSize);
    setSize((prvSize) => prvSize === '' ? newSize : '')
  }

  return (
    <Container>
      <Name>
        {product.name}
      </Name>
      <Description>
        {product.description}
      </Description>

      <Price>
        {product.price + " EUR"}
      </Price>

      <ColorSelector colors={product.color} color={color} onChangeColor={setColor}></ColorSelector>
      <SizeSelector size={product.size} selected={size} selector={onChangeSizeClick} ></SizeSelector>
    </Container>
  )
}

export default ProductInfo