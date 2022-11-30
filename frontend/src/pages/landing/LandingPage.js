import * as React from 'react';

import Navbar from "../../components/Navbar";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const LandingPage = () => {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(! state);
  };


  return (
    <Container>
        <Navbar state={state} onClick={toggleDrawer}></Navbar>
    </Container>
  )
}

export default LandingPage;