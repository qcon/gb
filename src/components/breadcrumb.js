import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

// import GlossbossDetailingAd from './glossbossDetailingAd'

const Breadcrumb = styled.ul`
  margin: 15px 0;
  padding: 0;
  font-size: 14px;
  li + li:before {
    content: '»';
    margin: 0 10px;
  }
`
const Item = styled.li`
  display: inline;
`
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
        <Item>{title}</Item>
      </Breadcrumb>
    </>
  )
}
