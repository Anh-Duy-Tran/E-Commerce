import * as React from 'react';

import productsController from '../controllers/products';
import productService from '../services/products'
import { useParams } from 'react-router-dom'
import StoreItem from './StoreItem';
import AddToCart from './AddToCart';

import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';
import { UserContext } from '../context/User/UserProvider';
import Loading from './Loading';

const StoreContainer = styled.div`
  display: grid;
  padding-top: 160px;
  /**
   * User input values.
   */
  --grid-layout-gap: 20px;
  --grid-column-count: 4;
  --grid-item--min-width: 250px;

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  grid-gap: var(--grid-layout-gap);
`

const StoreContent = ({fetchAll}) => {
  const { state, dispatch } = React.useContext(UserContext);
  let store = useParams();
  const [ addToCartOpen, setAddToCart ] = React.useState(false);
  const [ product, setProduct ] = React.useState(null);

  React.useEffect(() => {
    dispatch({ type : "fetching" });
    productService
      .fetchProductFromStore(fetchAll ? {id1 : "all"} : store)
      .then(products => {
        dispatch({ type : "update-products", payload : products });
        dispatch({ type : "fetch-success" });
      });
  }, [store])


  const toggleAddToCart = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAddToCart((prvValue) => !prvValue);
  }

  const onAddToCartClick = (id) => {
    const product = productsController.findProduct(id, state.products);
    setProduct(product);
    setAddToCart(true);
  }

  return (
    <>
      {
        state.fetchStatus === 'success'
        ? <>
          <StoreContainer>
            {
              Array
              .from(state.products)
              .sort((a, b) => 0.5 - Math.random())
              .map(
                product => <StoreItem key={product._id} product={product} onClick={() => onAddToCartClick(product._id)}></StoreItem>
              )
            }
          </StoreContainer>
          <Drawer
            anchor={'bottom'}
            open={addToCartOpen}
            onClose={toggleAddToCart}
          >
            <AddToCart product={product}></AddToCart>
          </Drawer>
        </>
        : <Loading/>
        }
    </>
  )
}

export default StoreContent;