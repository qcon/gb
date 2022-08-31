import styled from '@emotion/styled'
import React from 'react'

import config from '../config'

const gradient = `linear-gradient(
  ${config.heroGradient}, rgb(134 127 145 / 70%)
  )`

const Hero = styled.div`
  height: 250px;
  display: flex;
  background: ${(props) =>
    props.image
      ? `${gradient},url("${props.image}") center 50% no-repeat`
      : '#8c73a7'};
  transition: 200ms;
  // mask-image: linear-gradient(to bottom, black 45%, transparent 95%);
  background-size: cover;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: stretch;
  justify-content: center;
  align-items: center;
  @media (max-width: ${config.mobileMQ}) {
    margin: 0;
    height: 250px;
  }
  padding: 10px;
  text-align: center;
  h1 {
    color: #fff;
    margin: 0;
  }
  h2 {
    color: #f3f3f3;
    margin-top: 5px;
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
  display: none;
  width: 100%;
  height: 100%;
`
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ image, title, subTitle }) => (
  <Hero image={image}>
    <h1>{title}</h1>
    <h2>{subTitle}</h2>
    <GLOSSBOSSsvgWrapper href="/">
      <GLOSSBOSSsvg src="/GLOSSBOSS-gradient.svg" alt="GLOSSBOSS Logo" />
    </GLOSSBOSSsvgWrapper>
  </Hero>
)
