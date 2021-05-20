import React from 'react'
import styled from '@emotion/styled'

import { CardStyle } from '../components/card'
import ContentWrapper from './contentWrapper'

const Container = styled.div`
  ${CardStyle};
  width: 100%;
  padding: 10px 20px;
  margin-top: 30px;
  margin-bottom: 50px;
`

const InnerWrapper = styled.div`
  text-align: center;
  font-weight: 600;
`

export default () => (
    <ContentWrapper>
    <Container>
      <InnerWrapper>
<span role="img" aria-label="Schwamm">🧽</span> Besuche unseren Detailing Shop auf <a href="https://glossboss-shop.de?ref=gb.de" title="GLOSSBOSS Detailing Shop">https://glossboss-shop.de</a> <span role="img" aria-label="Schwamm">🧼</span>

        </InnerWrapper>
        </Container>
        </ContentWrapper>
)
