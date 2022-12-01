import * as React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from "../../components/Navbar";
import ShowProduct from "../../components/ShowProduct";
import styled from 'styled-components';

import products from '../../controllers/products'

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px calc(100vh - 80px);
`

const ProductsPage = ({ category, allProducts, allStore }) => {
  const id = useParams().id;

  const [menu, setMenu] = React.useState(false);
  const [cart, setCart] = React.useState(false);

  const toggleMenu = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenu(! menu);
  };

  const toggleCart = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCart(! cart);
  };

  const product = products.findProduct(id, allProducts);

  return (
    <Container>
        <Navbar stateMenu={menu} 
                stateCart={cart}
                onClickMenu={toggleMenu} 
                onClickCart={toggleCart}
                category={category}
                >
        </Navbar>
        <ShowProduct product={product}></ShowProduct>
    </Container>
  )
}

export default ProductsPage;