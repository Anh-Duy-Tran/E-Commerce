import styled from 'styled-components';

import * as React from 'react';
import ProductImgSlider from './ProductImgSlider';
import ProductInfo from './ProductInfo';

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
  padding-top: 200px;
  width: 30vw;
  
`

const ShowProduct = ({product}) => {

  const [ color, setColor ] = React.useState(product.color[0])

  return (
    <Container>
      <ImgSlider>
        <ProductImgSlider slides={product.image[color]}></ProductImgSlider>
      </ImgSlider>
      <SideContainer>
        <ProductInfo product={product} setColor={setColor}></ProductInfo>
      </SideContainer>
    </Container>
  )
}

export default ShowProduct