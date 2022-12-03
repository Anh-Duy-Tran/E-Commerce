import * as React from 'react';


import { UserContext } from '../../context/User/UserProvider';

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

const StoreContent = () => {
  const { state, dispatch } = React.useContext(UserContext);
  React.useEffect(() => {
    dispatch({ type : "fetching" });
    productService
      .fetchProductFromStore(store)
      .then(products => {
        dispatch({ type : "update-products", payload : products });
        dispatch({ type : "fetch-success" });
      });
  }, [store])

  return (
    <>
      {
        state.fetchStatus === 'success'
        ? <>
          <StoreContainer>
            {
              Array
              .from(state.products)
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
        : null
        }
    </>
  )
}