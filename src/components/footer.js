import React from 'react'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

import ContentWrapper from './contentWrapper'
import ScrollTop from './scrollTop'
import { CardStyle } from '../components/card'

const Container = styled.div`
  ${CardStyle};
  width: 100%;
  padding: 50px 0;
  margin-top: 100px;
`
const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`
const Item = styled.div`
  list-style: none;
  flex: 1 0 250px;
  margin: 25px 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

export default () => (
  <Container>
    <ScrollTop scrollStepInPx="100" delayInMs="16" />
    <ContentWrapper>
      <InnerWrapper>
        <Item>
          <strong>Social Media / Kontakt</strong>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/groups/glossboss.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GLOSSBOSS Community auf Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/glossboss.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/glossboss.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/glossbossblog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
            </li>
            <li>
              <a
                href="mailto:mail@glossboss.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                eMail
              </a>
            </li>
          </ul>
        </Item>
        <Item>
          <strong>GLOSSBOSS</strong>
          <ul>
            <li>
              <Link to="/impressum">Impressum / Datenschutzhinweise</Link>
            </li>
            <li>
              <Link to="/ueber-uns">Über uns</Link>
            </li>
            <li>
              <Link to="/mischungsrechner">Mischungsrechner</Link>
            </li>
            <li>
              <Link to="/glossbosse">Glossbosse</Link>
            </li>
            <li>
              <a href="https://glossboss-shop.de">GLOSSBOSS SHOP</a>
            </li>
          </ul>
        </Item>
        <Item>
          <strong>Kategorien</strong>
          <ul>
            <li>
              <Link to="/allgemein">Allgemein</Link>
            </li>
            <li>
              <Link to="/pflegeberichte">Pflegeberichte</Link>
            </li>
            <li>
              <Link to="/anleitungen">Anleitungen</Link>
            </li>
            <li>
              <Link to="/videos">Videos</Link>
            </li>
            <li>
              <Link to="/produkttest">Produkttest</Link>
            </li>
          </ul>
        </Item>
      </InnerWrapper>
    </ContentWrapper>
  </Container>
)
