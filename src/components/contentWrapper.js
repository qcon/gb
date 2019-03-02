// import React from 'react'
import styled from '@emotion/styled'

import config from '../config'

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
  img {
    margin: 50px 0;
  }
  blockquote {
    background: ${config.lighterGray};
    border-left: 8px solid ${config.glossbossBlue};
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    font-style: italic;
  }

  blockquote:before {
    color: ${config.lightGray};
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  blockquote p {
    display: inline;
  }
  @media (max-width: ${config.mobileMQ}) {
    padding: 10px;
    width: 100%;
  }
`
export default ContentWrapper
