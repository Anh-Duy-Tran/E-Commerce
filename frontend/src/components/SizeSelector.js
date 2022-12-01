import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  padding-left: 7px;
`

const ButtonGroupStyle = {
  marginTop : '11px',
  width: '70%'
}

const ButtonStyle = {
  paddingLeft: '10px', 
  justifyContent: "flex-start",
  border: '0',
  fontFamily: 'Futura',
  color: 'black',
  ':hover' : {
    border: '0',
    bgcolor : "#F2F2F2"
  }
}

const Size = styled.p`
  font-family: Futura
`

const SizeSelector = ({size, selected, selector}) => {
  return (
    <Container>
      <Size>Size:</Size>
      <ButtonGroup sx={ButtonGroupStyle} orientation='vertical'>
        {
          selected === '' 
          ? size.map(
              option => <Button key={option}
                                sx={ButtonStyle} 
                                onClick={() => selector(option)}
                        >{option}</Button>
            )
          : <Button sx={ButtonStyle} onClick={() => selector(selected)}>{selected}</Button>
        }
      </ButtonGroup>
    </Container>
  )
}

export default SizeSelector;
