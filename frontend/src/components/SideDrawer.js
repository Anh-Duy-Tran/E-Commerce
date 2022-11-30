import styled from 'styled-components';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';


const ListHeader = styled.strong`
  font-size: 20px;
  padding-left: 25px;
  user-select: none;
`

const linkStyle = {
  paddingLeft: "30px", 
  paddingTop: "10px", 
  paddingBottom: "10px",
  color: "black",
  fontSize : "16px",
}

const ListFromJson = ({category}) => {
  
  
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