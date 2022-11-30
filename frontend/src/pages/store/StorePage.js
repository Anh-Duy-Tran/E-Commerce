import * as React from 'react';

import product from '../../controllers/products';

import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from "../../components/Navbar";
import StoreItem from '../../components/StoreItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`

const StoreContainer = styled.div`
  display: grid;
  padding-top: 160px;
  /**
   * User input values.
   */
  --grid-layout-gap: 20px;
  --grid-column-count: 4;
  --grid-item--min-width: 100px;

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  grid-gap: var(--grid-layout-gap);
`

const StorePage = ({ category, allProducts, allStore}) => {
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

  const store = useParams().id;
  console.log(product.getProductFromShop(allStore[store], allProducts));

  return (
    <Container>
        <Navbar stateMenu={menu} 
                stateCart={cart}
                onClickMenu={toggleMenu} 
                onClickCart={toggleCart}
                category={category}
                >
        </Navbar>
        <StoreContainer>
          {
            product.getProductFromShop(allStore[store], allProducts).map(
              product => <StoreItem></StoreItem>
            )
          }
        </StoreContainer>
    </Container>
  )
}

export default StorePage