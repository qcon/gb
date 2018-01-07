import React from 'react'
import styled from 'react-emotion'

import config from '../config'

const Container = styled.div`
  position: fixed;
  z-index: 4;
  bottom: 0;
  width: 100%;
  height: auto;
  background-color: ${config.lightGray};
  padding: 15px;
  p {
    float: left;
  }
  div {
    float: right;
    display: inline-block;
    cursor: pointer;
  }
`
export default ({ handleClick }) => (
  <Container>
    <p>
      Glossboss.de verwendet Cookies. Mit der weiteren Nutzung dieser Website
      stimmst du der Verwendung von Cookies zu. Erfahre mehr in den{' '}
      <a href="/impressum">Datenschutzhinweisen</a>
    </p>
    <div onClick={() => handleClick()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        color="black"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  </Container>
)
