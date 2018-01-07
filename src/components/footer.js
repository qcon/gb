import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import ContentWrapper from './contentWrapper'
import ScrollTop from './scrollTop'
import { CardStyle } from '../components/card'

import config from '../config'

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
              <a href="https://www.facebook.com/glossbossblog/" target="_blank">
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/glossbossblog/"
                target="_blank"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="https://youtube.com/glossbossblog" target="_blank">
                Youtube
              </a>
            </li>
            <li>
              <a href="mailto:mmieth+glossboss@gmail.com" target="_blank">
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
