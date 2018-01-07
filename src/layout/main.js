import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import { injectGlobal } from 'emotion'
import styled from 'react-emotion'

import NavBar from '../components/navbar'
import HeaderImage from '../components/headerImage'
import ContentWrapper from '../components/contentWrapper'
import Cookie from '../components/cookie'
import Footer from '../components/footer'

import config from '../config'

const windowGlobal = typeof window !== 'undefined' && window

injectGlobal`
  body {
    background-color: #f3f6fb;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro',-apple-system,BlinkMacSystemFont; 
    text-rendering:optimizeLegibility;
    -webkit-font-smoothing:antialiased;
    color: ${config.textColor};
  }
  * {
    box-sizing: border-box
  };
  img {
    display: block;
    max-width: 100%;
  }
  iframe {
    max-width: 100%;
    max-height: 400px !important;
    border: 0;
    width: 800px;
    display: block;
  }
  a {
    text-decoration: underline;
    color: ${config.linkColor};
    &:hover {
      text-decoration: none;
      color: ${config.glossbossBlueLighter}
    }
  }
`
const Main = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  margin-top: 80px;
`

class MainLayout extends React.Component {
  constructor() {
    super()
    this.state = {
      cookie: true
    }
  }
  componentDidMount() {
    this.setState({
      cookie:
        windowGlobal.localStorage.getItem('GLOSSBOSS_COOKIES_ACCEPTED') || false
    })
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {this.props.title || 'GLOSSBOSS'} -{' '}
            {this.props.subTitle || 'Dein Autopflege Blog'}
          </title>
        </Helmet>
        {!this.state.cookie && (
          <Cookie
            handleClick={() => {
              windowGlobal.localStorage.setItem(
                'GLOSSBOSS_COOKIES_ACCEPTED',
                true
              )
              this.setState({ cookie: true })
            }}
          />
        )}
        <Main>
          <NavBar links={config.navbarLinks} />
          <HeaderImage {...this.props} />
          <ContentWrapper>{this.props.children}</ContentWrapper>
          <Footer />
        </Main>
      </React.Fragment>
    )
  }
}
export default MainLayout
