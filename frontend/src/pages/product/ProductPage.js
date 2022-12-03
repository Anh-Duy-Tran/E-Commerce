import * as React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from "../../components/Navbar";
import ShowProduct from "../../components/ShowProduct";
import styled from 'styled-components';


const Container = styled.div`
  display: grid;
  grid-template-rows: 80px calc(100vh - 80px);
`

const ProductsPage = () => {
  return (
    <Container>
        <Navbar/>
        <ShowProduct productId={useParams().id}></ShowProduct>
    </Container>
  )
}

export default ProductsPage;