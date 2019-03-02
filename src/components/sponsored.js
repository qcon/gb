import React from 'react'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

import config from '../config'

const Container = styled.p`
  background: ${config.lighterGray};
  width: 100%;
  padding: 25px;
  margin-top: 50px;
`

export default ({ sponsor }) => (
  <Container>
    Dieser Beitrag wurde durch {sponsor} gesponsort. Die Produkte wurden uns
    kostenlos zur Verfügung gestellt, was unsere Meinung aber nicht beeinflusst.
    Der Testbericht spiegelt unsere ehrliche Meinung wieder!.
  </Container>
)
