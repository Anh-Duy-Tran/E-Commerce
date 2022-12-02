import * as React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from "../../components/Navbar";
import ShowProduct from "../../components/ShowProduct";
import styled from 'styled-components';

import productsController from '../../controllers/products'
import UserContext from '../../context/UserContext';

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px calc(100vh - 80px);
`

const ProductsPage = () => {
  const { products } = React.useContext(UserContext);
  
  const id = useParams().id;

  const product = productsController.findProduct(id, products);

  return (
    <Container>
        <Navbar/>
        <ShowProduct product={product}></ShowProduct>
    </Container>
  )
}

export default ProductsPage;