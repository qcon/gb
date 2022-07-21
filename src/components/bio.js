import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

import Logo from './logo'
import { CardStyle } from './card'

import config from '../config'

const Bio = styled.div`
  ${CardStyle};
  margin: 50px 0;
  padding: 15px;
  ul {
    list-style: none;
    li {
    }
  }
`
const BioMeta = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-items: flex-start;
  margin: 0;
  padding: 15px;
`
const ImageItem = styled.li`
  flex: 0 0 120px;
  margin: 9px;
  img {
    border-radius: 50%;
    margin: 0;
  }
`
const TextItem = styled.li`
  flex: 1 0 300px;
  padding: 0 25px;
  line-height: 1.7;
  a {
    text-decoration: none;
    color: ${config.darkerGray};
  }
  p {
    margin-top: 0px;
  }
` /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ author, lastPosts }) => {
  const boss = config.activeBosse.get(author)
  return (
    <Bio>
      <BioMeta>
        <ImageItem>
          <Link to={`/glossbosse/${author.toLowerCase()}`}>
            {boss.image ? (
              <img src={boss.image} alt={author} />
            ) : (
              <Logo width={180} />
            )}
          </Link>
        </ImageItem>
        <TextItem>
          <p>
            <Link to={`/glossbosse/${author.toLowerCase()}`}>
              <strong>{author}</strong>
            </Link>
          </p>
          <p>{boss.description}</p>
        </TextItem>
      </BioMeta>
    </Bio>
  )
}
