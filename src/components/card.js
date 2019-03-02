// import React from 'react'
import Link from 'gatsby-link'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import config from '../config'

export const CardStyle = css`
  background-color: white;
  border-radius: 0.25rem;
  border: ${config.cardBorder};
  border-bottom: ${config.borderBottom};
`

export const Cards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`
export const CardItem = styled.li`
  display: flex;
  width: 100%;
  padding: 1rem;
  margin: ${props => props.isPost && '0 auto'};
  @media (min-width: 40rem) {
    width: 50%;
  }
  @media (min-width: 66rem) {
    width: ${props => !props.isPost && '33.3333%'};
  }
`
export const Card = styled.div`
  ${CardStyle};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  &:hover {
    a:first-child {
      filter: contrast(100%);
    }
  }
  a {
    text-decoration: none;
  }
`
export const CardContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
`
export const CardImage = styled(Link)`
  background-image: url("${props => props.image && props.image}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  filter: contrast(70%);
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);
  &::before {
    content: "";
    display: block;
    padding-top: ${props => (props.isPost ? '30%' : '56.25%')};
  }
`
export const CardImageExternal = CardImage.withComponent('div')

export const CardTitle = styled(Link)`
  color: ${config.darkerGray};
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
`
export const CardTitleExternal = CardTitle.withComponent('div')
export const CardText = styled.p`
  flex: ${props => (props.isMeta ? '' : '1 1 0')};
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  color: ${config.darkGray};
  margin-top: ${props => (props.isMeta ? '0' : '')};
  border-bottom: ${props => (props.isMeta ? `${config.lightBorder}` : '')};
  a {
    color: ${config.darkerGray};
    &:hover {
      color: ${config.glossbossBlue};
    }
  }
`
export const CardSubTitle = styled(CardText)`
  font-size: 16px;
`
export const CardButton = styled(Link)`
  text-decoration: none;
  background-color: ${config.lighterGray};
  color: ${config.glossbossBlue};
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  display: block;
  width: 100%;
  margin: ${props => (props.isLoadMore ? '50px 0' : '25px 0 0 0')};
`
export const CardButtonExternal = CardButton.withComponent('div')
