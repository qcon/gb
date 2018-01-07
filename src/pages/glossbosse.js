import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import MainLayout from '../layout/main'
import Logo from '../components/logo'

import config from '../config'

const ListWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`
const Item = styled.li`
  flex: 1 0 300px;
  margin: 25px;
  background-color: white;
  padding: 25px;
  border: ${config.cardBorder};
  border-bottom: ${config.borderBottom};
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

class GlossbossePage extends React.Component {
  constructor() {
    super()
    this.state = {
      bosse: []
    }
  }

  componentWillMount() {
    let bosse = []
    config.activeBosse.forEach((value, key) => {
      const bossUrl = `/glossbosse/${key.toLowerCase()}`
      bosse.push(
        <Item key={key}>
          {value.image ? <img src={value.image} /> : <Logo width={180} />}
          <h1>{key}</h1>
          <Contact>
            {' '}
            {value.mail && <a href={'mailto:' + value.mail}>eMail</a>}
            {` `}
            {value.website && (
              <a href={value.website} target="_blank">
                Website
              </a>
            )}
          </Contact>
          <p>{value.description}</p>
          <p>
            <Link to={bossUrl}>Alle Beiträge von {key} ansehen</Link>
          </p>
        </Item>
      )
    }, config.activeBosse)
    this.setState(prevState => {
      return {
        bosse: bosse
      }
    })
  }
  render() {
    return (
      <MainLayout title="Übersicht aller aktiven Glossbosse">
        <ListWrapper>{this.state.bosse}</ListWrapper>
      </MainLayout>
    )
  }
}

export default GlossbossePage
