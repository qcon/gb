import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'

import config from '../config'

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  letter-spacing: 0.05em;
`

const Item = styled.li`
  display: inline-block;
  margin: 25px;
  border-bottom: ${props =>
    props.active ? `2px solid ${config.glossbossBlue}` : ''};
  text-transform: uppercase;

  a {
    text-decoration: none;
    color: ${props => (props.active ? config.black : config.darkGray)};
    &:hover {
      color: ${config.black};
    }
  }

  @media (max-width: ${config.mobileMQ}) {
    margin: 5px;
  }
`

export default ({ category }) => {
  return (
    <Wrapper
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
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
              <Link itemProp="url" to={`/` + cat.toLowerCase()}>
                {cat}
              </Link>
            </Item>
          )
        }
      })}
    </Wrapper>
  )
}
