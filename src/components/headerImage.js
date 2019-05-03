import styled from '@emotion/styled'
import React from 'react'

import config from '../config'

const gradient = `linear-gradient(
  ${config.heroGradient}, ${config.heroGradient}
  )`

const Hero = styled.div`
  height: 300px;
  display: flex;
  margin: 10px 0;
  transition: 200ms;
  filter: sepia(20%) brightness(80%);
  background: ${gradient}, url("${props =>
  props.image
    ? props.image
    : 'https://glossbossimages.s3.eu-central-1.amazonaws.com/marvin/amg-gts-grau/DSC01437.jpg'}") center 50% no-repeat;
  background-size: cover;
  padding: 10px;
  box-shadow: 0px 4px 6px -3px rgba(0, 0, 0, 0.3);

  @media (max-width: ${config.mobileMQ}) {
    margin: 0;
    height: 250px;
  }
`
const GLOSSBOSSsvg = styled.img`
  margin: 0 auto;
  position: relative;
  max-width: 400px;
  max-width: 90%;
  height: 100%;
  opacity: 0.7;
`
const GLOSSBOSSsvgWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export default ({ image, title, subTitle }) => (
  <Hero image={image}>
    <GLOSSBOSSsvgWrapper>
      <GLOSSBOSSsvg src="/glossbossv3.svg" alt="GLOSSBOSS Logo" />
    </GLOSSBOSSsvgWrapper>
  </Hero>
)
