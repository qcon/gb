import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'

import Logo from './logo'
import { CardStyle } from './card'

import config from '../config'

const Bio = styled.div`
  ${CardStyle};
  margin: 50px 0;
  padding: 0 15px;
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
  align-items: center;
  margin: 0;
  padding: 15px;
`
const ImageItem = styled.li`
  flex: 0 0 120px;
  margin: 0 auto;
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
  strong {
    font-size: 22px;
  }
`
export default ({ author, lastPosts }) => {
  const boss = config.activeBosse.get(author)
  return (
    <Bio>
      <BioMeta>
        <ImageItem>
          <Link to={`/glossbosse/${author.toLowerCase()}`}>
            {boss.image ? <img src={boss.image} /> : <Logo width={180} />}
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
      <strong>
        {lastPosts.length} weitere Beiträge von {author}
      </strong>
      <ul>
        {lastPosts.map(post => (
          <li key={post.node.title}>
            <Link to={post.node.fields.fullUrl}>{post.node.title}</Link>
          </li>
        ))}
      </ul>
    </Bio>
  )
}
