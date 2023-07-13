import React from 'react'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

import ContentWrapper from './contentWrapper'
import ScrollTop from './scrollTop'
import { CardStyle } from '../components/card'

import config from '../config'

const Container = styled.div`
  ${CardStyle};
  width: 100%;
  padding: 50px 20px;
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
  strong {
    opacity: 0.8;
    font-weight: 500;
  }
  ul {
    list-style: none;
    padding: 0;
    margin-top: 15px;
    li {
      margin-top: 5px;
    }
    a {
      font-weight: 700;
      text-decoration: none;
    }
    img {
      margin: 0;
    }
  }
`
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
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
            <li>
              <a
                href="https://open.spotify.com/show/2oBmEugxOA7YS9fFa3EJjX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/spotify-podcast-badge-blk-grn-165x40.png"
                  alt="GLOSSBOSS Podcast auf Spotify"
                />
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
              <a href="https://glossboss.de">GLOSSBOSS SHOP</a>
            </li>
          </ul>
        </Item>
        <Item>
          <strong>Kategorien</strong>
          <ul>
            {config.categories.map((cat) => {
              if (cat === 'Index') return null
              return (
                <li key={cat}>
                  <Link to={`/${cat.toLowerCase()}`}>
                    {config.addEmoji(cat)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Item>
      </InnerWrapper>
    </ContentWrapper>
  </Container>
)
