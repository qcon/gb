import React from 'react'
import styled from '@emotion/styled'

import { CardStyle } from '../components/card'
import ContentWrapper from './contentWrapper'
import config from '../config'

const Container = styled.div`
  ${CardStyle};
  margin: 60px 16px 45px 16px;
  @media (max-width: 66rem) {
    margin: 20px 16px 25px 16px;
  }
  padding: 25px 20px;
  @media (max-width: ${config.mobileMQ}) {
    font-size: 14px;
  }
`

const InnerWrapper = styled.div`
  text-align: center;
  font-weight: 600;
`
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => (
  <ContentWrapper>
    <Container>
      <InnerWrapper>
        <span role="img" aria-label="Schwamm">
          🧽
        </span>{' '}
        Besuche unseren Detailing Shop auf{' '}
        <a
          href="https://glossboss.de?ref=gb.de"
          title="GLOSSBOSS Detailing Shop"
        >
          glossboss.de
        </a>{' '}
        <span role="img" aria-label="Schwamm">
          🧼
        </span>
      </InnerWrapper>
    </Container>
  </ContentWrapper>
)
