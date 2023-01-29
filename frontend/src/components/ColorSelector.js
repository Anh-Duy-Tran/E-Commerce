import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';

const Container = styled.div`

`

const Color = styled.p`
  padding-left: 5px;
  font-family: Futura
`

const ColorSelector = ({colors, color, onChangeColor}) => {
  return (
    <Container>
      <Container>
        {
          colors.map(
            c => 
            <IconButton key={c.name} onClick={() => onChangeColor(c.name)}>
              <CircleIcon sx={{color : c.code}}></CircleIcon>  
            </IconButton>
          )
        }
      </Container>
      <Color>
        {color}
      </Color>
    </Container>
  )
}

export default ColorSelector