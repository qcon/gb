import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

// import GlossbossDetailingAd from './glossbossDetailingAd'

const Breadcrumb = styled.ul`
  margin: 15px 0;
  padding: 0;
  font-size: 16px;
  li + li:before {
    content: '»';
    margin: 0 10px;
  }
`
const Item = styled.li`
  display: inline;
` /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ category, title }) => {
  return (
    <>
      <Breadcrumb>
        <Item>
          <Link to="/">Startseite</Link>
        </Item>
        <Item>
          <Link to={'/' + category.toLowerCase()}>{category}</Link>
        </Item>
        <Item
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
          }}
        >
          {title}
        </Item>
      </Breadcrumb>
    </>
  )
}
