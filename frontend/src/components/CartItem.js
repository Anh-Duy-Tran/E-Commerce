import styled from 'styled-components';
import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';

import cartController from '../controllers/cart';
import { UserContext } from '../context/User/UserProvider';

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
  font-family: 'Futura';
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
  display : flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left : 20px;
  font-family: 'Futura';
`

const RemoveButton = styled.button`
  border: 0;
  font-size: 18px;
  background-color: white;
  font-family: 'Futura';
  margin-top: 100px;
`



const CartItem = ({name, orderId, img, init_amount}) => {
  const { state, dispatch } = useContext(UserContext);
  const [amount, setAmount] = useState(init_amount);
  const [id, color, size] = orderId.split('/');

  console.log(state);

  const onClickAddMinus = (e, id, setAmount, Add) => {
    e.stopPropagation();
    setAmount(
      (prev) => {
        const newVal = Add ? prev+1 : prev-1
        dispatch({type : 'update-count', payload : Add ? state.cartCount+1 : state.cartCount-1})
        if (Number(newVal) === 0) {
          cartController.removeFromCart(id);
          return newVal;
        }
        cartController
          .updateAmount(id, newVal);
        return newVal;
    });
  }
  
  const onClickRemove = (e, productid, setAmount) => {
    e.stopPropagation();
    cartController.removeFromCart(productid);
    setAmount(0);
  }

  return (
    amount !== 0 
    ? 
    <Container>
      <Name>{name}</Name>
      <InfoWrapper>
        <ProductImg src={img}/>
        <ProductInfo>
          <p>{color}</p>
          <p>Size : {size}</p>
          <p>Amount: {amount}</p>
          <Stack direction="row" spacing={2}>
            <IconButton onClick={(e) => onClickAddMinus(e, orderId, setAmount, true)} variant="contained">
              <AddIcon></AddIcon>
            </IconButton>
            <IconButton onClick={(e) => onClickAddMinus(e, orderId, setAmount, false)} variant="contained">
              <RemoveIcon></RemoveIcon>
            </IconButton>
          </Stack>
          <RemoveButton onClick={(e) => onClickRemove(e, orderId, setAmount)}>Remove</RemoveButton>
        </ProductInfo>
      </InfoWrapper>
    </Container>
    : null
  )
} 

export default CartItem;