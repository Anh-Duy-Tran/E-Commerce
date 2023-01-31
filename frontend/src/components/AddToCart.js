import styled from 'styled-components';


import * as React from 'react';
import ProductImgSlider from './ProductImgSlider';
import ProductInfo from './ProductInfo';
import { UserContext } from '../context/User/UserProvider';
import productsController from '../controllers/products';
import { Button } from '@mui/material';

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

const AddToCart = ({product, adminPreview , handleAddProduct}) => {
  const [ color, setColor ] = React.useState(product.color[0].name);

  return (
    <Container>
      <ImgSlider>
        <ProductImgSlider slides={product.image[color]} height={"600px"}></ProductImgSlider>
      </ImgSlider>
      <SideContainer>
        <ProductInfo product={product} color={color} setColor={setColor} noDescription={!adminPreview}></ProductInfo>
        {
          adminPreview
          ? <Button sx ={buttonStyle} onClick={handleAddProduct}>
            Add product to shop
          </Button>
          : null
        }
      </SideContainer>
    </Container>
  )
}

export default AddToCart