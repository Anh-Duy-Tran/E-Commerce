import styled from 'styled-components';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from '@mui/material/Link';
import { useContext } from 'react';
import UserContext from '../context/UserContext';


const ListHeader = styled.strong`
  font-size: 20px;
  padding-left: 25px;
  user-select: none;
  font-family: Futura;
`

const linkStyle = {
  paddingLeft: "30px", 
  paddingTop: "10px", 
  paddingBottom: "10px",
  color: "black",
  fontSize : "16px",
  fontFamily: "Futura"
}

const ListFromJson = () => {
  const { category } = useContext(UserContext);
  const Section = ({sec}) => {
    return (
      <>
        <ListHeader>{sec.tile}</ListHeader>
        <List>
          {Array.from(sec.paths).map(({tile, path}) => (
            <ListItem key={tile} disablePadding>
              <ListItemButton>
                <Link href={"/store" + path} sx={linkStyle} underline="hover">
                  {tile}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    )
  }

  return (
    <>
      {
        Array.from(category).map(sec => (<Section key={sec.tile} sec={sec}></Section>))
      }
    </>
  )
}


const SideDrawer = ({category, onClick}) => {

  return (
    <Box
      sx={{ width: 350, paddingTop: '50px' }}
      role="presentation"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <ListFromJson category={category}></ListFromJson>
    </Box>
  );
}

export default SideDrawer;