import React from 'react'
import styled from '@emotion/styled'

const Container = styled.p`
  background: white;
  width: 100%;
  padding: 25px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 800;
`
const RabattCode = styled.strong`
  color: red;
`

export default () => (
  <Container>
    Besucht uns auf der Detailing Convention am 14.9.19 ihr Einbeck (bei
    Göttingen). Weitere Infos findest du auf{' '}
    <a href="https://detailingcon.de" target="_blank" rel="noopener noreferrer">
      detailingcon.de
    </a>
    . Mit dem Rabattcode <RabattCode>boss</RabattCode> sparst du 5€ beim
    Ticketkauf!
  </Container>
)
