import styled from 'styled-components';


import * as React from 'react';
import ProductImgSlider from './ProductImgSlider';
import ProductInfo from './ProductInfo';


const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding-top: 50px;
  padding-bottom: 50px;
  height: 600px;
  gap : 100px;
`

const ImgSlider = styled.div`
  padding-right: 40px;
  height: 100%;
  aspect-ratio: 0.67;
`

const SideContainer = styled.div`
  padding-top: 20px;
  width: 30vw;
`

const AddToCart = ({product}) => {

  const [ color, setColor ] = React.useState(product.color[0])

  return (
    <Container>
      <ImgSlider>
        <ProductImgSlider slides={product.image[color]} height={"600px"}></ProductImgSlider>
      </ImgSlider>
      <SideContainer>
        <ProductInfo product={product} color={color} setColor={setColor} noDescription={true}></ProductInfo>
      </SideContainer>
    </Container>
  )
}

export default AddToCart