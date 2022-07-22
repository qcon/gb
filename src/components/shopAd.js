import React from 'react'
import styled from '@emotion/styled'

import { CardStyle } from '../components/card'
import ContentWrapper from './contentWrapper'

const Container = styled.div`
  ${CardStyle};
  margin: 50px 16px 90px 16px;
  @media (max-width: 66rem) {
    margin: 0 16px 0 16px;
  }
  padding: 25px 20px;
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
          href="https://glossboss-shop.de?ref=gb.de"
          title="GLOSSBOSS Detailing Shop"
        >
          glossboss-shop.de
        </a>{' '}
        <span role="img" aria-label="Schwamm">
          🧼
        </span>
      </InnerWrapper>
    </Container>
  </ContentWrapper>
)
