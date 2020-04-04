import React from 'react'
import styled from '@emotion/styled'

const Logo = styled.div`
  text-align: center;
  svg {
    max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    height: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
  }
  img {
    max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    height: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
  }
`

export default ({ width }) => (
  <Logo maxWidth={width}>
    <img src="/G2.svg" alt="GLOSSBOSS Logo" />
  </Logo>
)
