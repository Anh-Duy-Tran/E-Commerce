import styled from 'styled-components';

import * as React from 'react';
import ProductImgSlider from './ProductImgSlider';
import ProductInfo from './ProductInfo';

import productsController from '../controllers/products';
import { UserContext } from '../context/User/UserProvider';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 160px);
  padding-top: 160px;
  gap : 100px;
`

const ImgSlider = styled.div`
  padding-right: 40px;
  height: 100%;
  aspect-ratio: 0.67;
`

const SideContainer = styled.div`
  margin-top: 5vh;
  width: 30vw;
  
`

const ShowProduct = ({productId}) => {
  const { state } = React.useContext(UserContext);
  
  if (Object.keys(state.products).length === 0) {
    return null;
  }
  const [ color, setColor ] = React.useState(product.color[0])

  const product = productsController.findProduct(productId, state.products);

  console.log(product);
  return (
    Object.keys(state.products).length !== 0 
    ?
    <Container>
      <ImgSlider>
        <ProductImgSlider slides={product.image[color]} height={"80vh"}></ProductImgSlider>
      </ImgSlider>
      <SideContainer>
        <ProductInfo product={product} color={color} setColor={setColor}></ProductInfo>
      </SideContainer>
    </Container>
    : null
  )
}

export default ShowProduct