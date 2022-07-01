import React from 'react'
import styled from '@emotion/styled'

import MainLayout from '../components/layout'
import Logo from '../components/logo'
import { CardStyle, CardButton } from '../components/card'

import config from '../config'

const ListWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`
const Item = styled.li`
  ${CardStyle};
  flex: 1 0 300px;
  margin: 25px;
  padding: 25px;
  img {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 10px 0;
    border-radius: 50%;
    max-width: 180px;
  }
  h1 {
    text-align: center;
    margin-bottom: 0;
  }
`
const Contact = styled.p`
  text-align: center;
  margin-top: 0;
  a {
    color: ${config.glossbossBlueLighter};
    margin: 0 7px;
  }
`

const Glossbosse = () => (
  <MainLayout title="Übersicht aller aktiven Glossbosse">
    <ListWrapper>
      {Array.from(config.activeBosse).map((boss) => {
        const value = boss[1]
        const name = boss[0]
        const bossUrl = `/glossbosse/${name.toLowerCase()}`
        return (
          <Item key={name}>
            {value.image ? (
              <img src={value.image} alt={name} />
            ) : (
              <Logo width={180} />
            )}
            <h1>{name}</h1>
            <Contact>
              {' '}
              {value.mail && <a href={'mailto:' + value.mail}>eMail</a>}{' '}
              {value.website && (
                <a
                  href={value.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              )}
            </Contact>
            <p>{value.description}</p>
            <p>
              <CardButton to={bossUrl}>
                Alle Beiträge von {name} ansehen
              </CardButton>
            </p>
          </Item>
        )
      })}
    </ListWrapper>
  </MainLayout>
)
export default Glossbosse
