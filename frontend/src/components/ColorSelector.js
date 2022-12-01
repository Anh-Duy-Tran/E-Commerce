import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';

import colorPalette from '../static/colorPalette.json'

const Container = styled.div`

`

const ColorSelector = ({color, onChangeColor}) => {
  return (
    <Container>
      {
        color.map(
          c => 
          <IconButton onClick={() => onChangeColor(c)}>
            <CircleIcon sx={{color : colorPalette[c]}}></CircleIcon>  
          </IconButton>
        )
      }
    </Container>
  )
}

export default ColorSelector