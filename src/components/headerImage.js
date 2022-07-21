import styled from '@emotion/styled'
import React from 'react'

import config from '../config'

const gradient = `linear-gradient(
  ${config.heroGradient}, ${config.heroGradient}
  )`

const Hero = styled.div`
  display: none !important;
  height: 200px;
  display: flex;
  background: ${(props) =>
    props.image
      ? `${gradient},url("${props.image}") center 50% no-repeat`
      : '#130027'};
  margin: 10px 0;
  transition: 200ms;
  background-size: cover;
  padding: 10px;
  box-shadow: -1px 10px 10px -8px rgba(0, 0, 0, 0.6);

  @media (max-width: ${config.mobileMQ}) {
    margin: 0;
    height: 250px;
  }
`
const GLOSSBOSSsvg = styled.img`
  margin: 0 auto;
  position: relative;
  max-width: 90%;
  max-height: 100px;
  top: 30%;
`
const GLOSSBOSSsvgWrapper = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ image, title, subTitle }) => (
  <Hero image={image}>
    <GLOSSBOSSsvgWrapper href="/">
      <GLOSSBOSSsvg src="/GLOSSBOSS-gradient.svg" alt="GLOSSBOSS Logo" />
    </GLOSSBOSSsvgWrapper>
  </Hero>
)
