import React from 'react'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

import Logo from '../components/logo'
import ArrowDown from './arrowdown'

import config from '../config'

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(5px);
  padding: 15px;
  font-size: 1.55em;
  z-index: 3;
  //box-shadow: 0px 4px 6px -3px rgba(0, 0, 0, 0.3);
`

const NavbarList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  height: 60px;
  max-width: 1400px;
  @media (max-width: ${config.mobileMQ}) {
    height: 100%;
  }
`

const NavbarListItem = styled.li`
  display: inline-block;
  margin-right: 25px;
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  top: ${(props) => (props.isLogo ? '0' : '10px')};
  float: ${(props) => (props.isLogo ? 'left' : 'right')};
  margin-left: ${(props) => (props.isLogo ? '10px' : '0')};
  a {
    color: ${(props) =>
      props.active ? `${config.glossbossBlue} !important` : config.textColor};
    color: ${config.glossbossBlue};
    font-weight: 900;
    text-decoration: none;
    font-size: 1rem;
    margin: ${(props) => (props.hasIcons ? '0 10px' : '0')};
  }
  a:hover {
    color: ${config.glossbossBlueLighter};
  }
  .feather {
    transform: translate(0, 6px);
    ${'' /* margin: 0 10px; */};
  }
  @media (max-width: ${config.mobileMQ}) {
    display: ${(props) =>
      props.isLogo ? 'block' : props.toggle ? 'block' : 'none'};
    margin: ${(props) => (props.isLogo ? '0' : '10px auto')};
    // transform: ${(props) => (props.isLogo ? '' : 'translateY(60px)')};
    text-align: center;
    height: 60px;
    width: 100%;
    margin-left: ${(props) => (props.isLogo ? '19px' : '0')};
  }
`

const NavbarListItemToggle = styled.div`
  display: none;
  transition: 200ms ease;
  div {
    z-index: 2;
    svg {
      height: 30px;
      fill: #4e4e4e;
      transition: 200ms ease;
      transform: rotate(${(props) => (props.toggle ? '180deg' : '0deg')});
    }
  }
  @media (max-width: ${config.mobileMQ}) {
    top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 25px;
  }
`

const NavbarListItemLogoWrapper = styled.div`
  float: left;
`

export default class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {
      nav: false,
    }
  }
  toggleNav() {
    this.setState((prevState, props) => {
      return {
        nav: !prevState.nav,
      }
    })
  }
  render() {
    return (
      <Navbar>
        <NavbarListItemToggle
          onClick={() => this.toggleNav()}
          toggle={this.state.nav}
        >
          <ArrowDown />
        </NavbarListItemToggle>
        <NavbarList>
          <NavbarListItem isLogo={true}>
            <NavbarListItemLogoWrapper>
              <Link to="/" title="GLOSSBOSS.de Startseite">
                <Logo />
              </Link>
            </NavbarListItemLogoWrapper>
          </NavbarListItem>
          {this.props.links.map((link) => (
            <NavbarListItem key={link.href} toggle={this.state.nav}>
              <Link to={link.href} title={link.title}>
                {link.title}
              </Link>
            </NavbarListItem>
          ))}
          <NavbarListItem toggle={this.state.nav}>
            <a title="GLOSSBOSS SHOP" href="https://glossboss-shop.de">
              Shop
            </a>
          </NavbarListItem>
          <NavbarListItem toggle={this.state.nav}>
            <a
              title="GLOSSBOSS Detailing"
              href="https://detailing.glossboss.de"
            >
              Detailing
            </a>
          </NavbarListItem>
        </NavbarList>
      </Navbar>
    )
  }
}
