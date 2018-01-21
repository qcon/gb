import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import Logo from '../components/logo'
import ArrowDown from './arrowdown'

import config from '../config'

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 15px;
  font-size: 15px;
  z-index: 3;
  box-shadow: 0px 4px 6px -3px rgba(0, 0, 0, 0.3);
`

const NavbarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  height: 50px;
  @media (max-width: ${config.mobileMQ}) {
    height: 100%;
  }
`

const NavbarListItem = styled.li`
  display: inline-block;
  margin-right: 25px;
  padding: 0;
  transform: ${props => (props.isLogo ? '' : 'translateY(-25px)')};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  a {
    color: ${props => (props.active ? 'black !important' : config.textColor)};
    text-decoration: none;
    margin: ${props => (props.hasIcons ? '0 10px' : '0')};
  }
  a:hover {
    color: black;
  }
  .feather {
    transform: translate(0, 6px);
    ${'' /* margin: 0 10px; */};
  }
  @media (max-width: ${config.mobileMQ}) {
    display: ${props =>
      props.isLogo ? 'block' : props.toggle ? 'block' : 'none'};
    margin: ${props => (props.isLogo ? '0' : '10px auto')};
    transform: ${props => (props.isLogo ? '' : 'translateY(30px)')};
    text-align: center;
    height: 50px;
    width: 100%;
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
      transform: rotate(${props => (props.toggle ? '180deg' : '0deg')});
    }
  }
  @media (max-width: ${config.mobileMQ}) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 30px;
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
      nav: false
    }
  }
  toggleNav() {
    const windowGlobal = typeof window !== 'undefined' && window
    if (typeof windowGlobal.ga === 'function') {
      windowGlobal.ga('send', 'event', 'Click', 'ToggleNav')
    }
    this.setState((prevState, props) => {
      return {
        nav: !prevState.nav
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
          {this.props.links.map(link => (
            <NavbarListItem key={link.href} toggle={this.state.nav}>
              <Link to={link.href} title={link.title}>
                {link.title}
              </Link>
            </NavbarListItem>
          ))}
          <NavbarListItem toggle={this.state.nav} hasIcons>
            <a href="mailto:mmieth+glossboss@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="https://www.instagram.com/glossbossblog/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.facebook.com/glossbossblog/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://youtube.com/glossbossblog" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-tv"
              >
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
            </a>
          </NavbarListItem>
        </NavbarList>
      </Navbar>
    )
  }
}
