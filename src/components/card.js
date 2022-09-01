import Link from 'gatsby-link'
import { css } from '@emotion/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import config from '../config'

const showCard = keyframes`
0% {
  transform: scale(.99);
  opacity: 0;
  top: 25px;
    position: relative;
}
100% {
  transform: scale(1);
  opacity: 1;
  top: 0px;
  position: relative;
}
`

export const CardStyle = css`
  transition: 200ms ease-in-out;
  &:hover {
    transition: 150ms ease-in-out;
    background: #fbfbfb;
  }
  border-radius: 0.35rem;
  background: ${config.lighterGray};
  box-shadow: 5px 5px 14px #d4d4d457;
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
  padding: 1.2rem;
  margin: ${(props) => props.isPost && '0 auto'};
  @media (max-width: ${config.mobileMQ}) {
    padding: 0 1rem;
  }
  @media (min-width: 45rem) {
    width: 50%;
    padding: 0 1rem;
    padding-bottom: 2rem;
  }
  @media (min-width: 80rem) {
    width: ${(props) => !props.isPost && '33.3333%'};
  }
  animation: ${showCard} 400ms ease-in-out 1;
`
export const Card = styled.div`
  ${CardStyle};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  a {
    text-decoration: none;
  }
  @media (max-width: ${config.mobileMQ}) {
    margin-bottom: 1.75rem;
  }
`
export const CardContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 0.5rem 1.2rem;
`
export const CardImage = styled(Link)`
  background-image: url('${(props) => props.image && props.image}');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 1rem;
  border-radius: 0.45rem;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s cubic-bezier(0.43, 0.41, 0.22, 0.91);
  &:hover {
    transform: scale(1.02);
  }
  &::before {
    content: '';
    display: block;
    padding-top: ${(props) => (props.isPost ? '30%' : '56.25%')};
  }
`
export const CardImageExternal = CardImage.withComponent('div')

export const CardTitle = styled(Link)`
  color: ${config.linkColor};
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: 0.025rem;
  text-decoration: none;
`
export const CardTitleExternal = CardTitle.withComponent('div')
export const CardText = styled.p`
  flex: ${(props) => (props.isMeta ? '' : '1 1 0')};
  font-size: 15px;
  line-height: 1.5;
  color: ${(props) =>
    props.isMeta ? `${config.lightGray}` : `${config.darkGray}`};
  margin-top: ${(props) => (props.isMeta ? '0' : '')};
  border-bottom: ${(props) => (props.isMeta ? `${config.lightBorder}` : '')};
  font-weight: 500;
  a {
    color: inherit;
    // color: ${config.darkerGray};
    &:hover {
      color: ${config.glossbossBlue};
    }
  }
`
export const CardSubTitle = styled(CardText)`
  font-size: 16px;
  margin-top: 5px;
`
export const CardButton = styled(Link)`
  text-decoration: none;
  background-color: ${config.glossbossBlue};
  color: #fff;
  padding: 0.75rem 1.5rem;
  text-transform: uppercase;
  text-align: center;
  display: block;
  width: 100%;
  font-weight: 600;
  max-width: 150px;
  margin: ${(props) => (props.isLoadMore ? '50px 0' : '25px 0 15px 0')};
  border-radius: 7px;
  &:hover {
    color: ${config.lightGray};
  }
  // background: #f6f6f6;
  // box-shadow: 1px 1px 5px #dddddd90;
  // transition: 200ms;
  // &:hover {
  //   box-shadow: 5px 5px 5px #dddddd, -5px -5px 5px #ffffff;
  // }
`
export const CardButtonExternal = CardButton.withComponent('div')

export const CardLinkAd = styled.a`
  display: contents;
`
