import * as React from 'react';

import Navbar from "../../components/Navbar";
import PageHeroSlider from '../../components/HeroSlider';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const LandingPage = () => {
  const [menu, setMenu] = React.useState(false);
  const [cart, setCart] = React.useState(false);

  const toggleMenu = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenu(! menu);
  };

  const toggleCart = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCart(! cart);
  };


  return (
    <Container>
        <Navbar stateMenu={menu} 
                stateCart={cart}
                onClickMenu={toggleMenu} 
                onClickCart={toggleCart}
                >
        </Navbar>
        <PageHeroSlider></PageHeroSlider>
    </Container>
  )
}

export default LandingPage;