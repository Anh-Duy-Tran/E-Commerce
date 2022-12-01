import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 50px 33vh;
  padding-top: 50px;
`

const Name = styled.h1`
  padding-left: 35px;
  font-family: Futura;
  font-size: 15px;
  display: flex;

  align-items: center;
  text-align: center;
`

const InfoWrapper = styled.div`
  display: flex;
`

const ProductImg = styled.img`
  padding-left: 35px;
  aspect-ratio: 0.67;
  height:100%;
`


const ProductInfo = styled.div`

`

const CartItem = ({orderId, product}) => {
  orderId = orderId.split('/');
  
  const color = orderId[1];
  const size = orderId[2];

  return (
    <Container>
      <Name>{product.name}</Name>
      <InfoWrapper>
        <ProductImg src={product.active}/>
        <ProductInfo>
          {color}
        </ProductInfo>
      </InfoWrapper>
    </Container>
  )
} 

export default CartItem;