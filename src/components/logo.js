import React from 'react'
import styled from '@emotion/styled'
import config from '../config'

const Logo = styled.div`
  text-align: center;
  @media (max-width: ${config.mobileMQ}) {
    position: relative;
    top: 6px;
  }
  img {
    @media (max-width: ${config.mobileMQ}) {
      height: 50px;
    }
  }

  // svg {
  //   max-width: ${(props) =>
    props.maxWidth ? `${props.maxWidth}px` : '60px'};
  //   width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '60px')};
  //   height: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '60px')};
  // }
  // img {
  //   max-width: ${(props) =>
    props.maxWidth ? `${props.maxWidth}px` : '60px'};
  //   width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '60px')};
  //   height: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '60px')};
  // }
`
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ width }) => (
  <Logo maxWidth={width}>
    <img src="/glossboss-logo.svg" alt="GLOSSBOSS Logo" />
  </Logo>
)
