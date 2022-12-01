import styled from 'styled-components';
import ColorSelector from './ColorSelector';

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

const ProductInfo = ({product, setColor}) => {
  return (
    <Container>
      <Name>
        {product.name}
      </Name>
      <Description>
        {product.description}
      </Description>
      <ColorSelector color={product.color} onChangeColor={setColor}></ColorSelector>

    </Container>
  )
}

export default ProductInfo