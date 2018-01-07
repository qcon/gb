import styled from 'react-emotion'
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
const Title = styled.h1`
  align-self: center;
  margin: 0 auto;
  text-align: center;
  color: white;
  font-size: 46px;
  mix-blend-mode: lighten;
  text-shadow: 1px 1px 4px rgb(150, 150, 150);
  letter-spacing: 0.2em;
  small {
    display: block;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    font-size: 24px;
    @media (max-width: ${config.mobileMQ}) {
      font-size: 20px;
    }
  }
  @media (max-width: ${config.mobileMQ}) {
    top: 30%;
    font-size: 24px;
  }
`
export default class Item extends React.Component {
  render() {
    return (
      <Hero image={this.props.image}>
        <Title>
          {this.props.title || 'GLOSSBOSS'}
          <small>{this.props.subTitle || ''}</small>
        </Title>
      </Hero>
    )
  }
}
