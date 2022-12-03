import * as React from 'react';

import Navbar from "../../components/Navbar";
import PageHeroSlider from '../../components/HeroSlider';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 80px;
  padding-bottom: 25px;
  display: flex;
  justify-content: center;
  z-index: 10;
`


const LandingPage = () => {
  return (
    <Container>
        <Navbar></Navbar>
        <PageHeroSlider></PageHeroSlider>
        <Footer>
        </Footer>
    </Container>
  )
}

export default LandingPage;