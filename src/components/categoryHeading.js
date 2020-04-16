import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

import config from '../config'
import { CardStyle } from './card'

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 0.05em;
`

const Item = styled.li`
  display: inline-block;
  margin: 12px;
  a {
    border: ${props =>
      props.active ? `2px solid ${config.glossbossBlue}` : ''};
    padding: 0.4rem 1.1rem;
    ${CardStyle}
    text-decoration: none;
    color: ${props => (props.active ? config.black : config.darkGray)};
    &:hover {
      transition: 200ms;
      color: ${config.black};
    }
  }

  @media (max-width: ${config.mobileMQ}) {
    margin: 8px;
    font-size: 14px;
  }
`
export default ({ category }) => {
  return (
    <Wrapper
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <Item>Filter: </Item>
      {config.categories.map(cat => {
        if (cat === 'Index') {
          return (
            <Item active={category === 'GLOSSBOSS'} key={cat}>
              <Link to={`/`}>Alle</Link>
            </Item>
          )
        } else {
          return (
            <Item itemProp="name" active={cat === category} key={cat}>
              <Link itemProp="url" to={`/${cat.toLowerCase()}`}>
                {config.addEmoji(cat)}
              </Link>
            </Item>
          )
        }
      })}
    </Wrapper>
  )
}
