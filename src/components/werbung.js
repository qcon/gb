import React from 'react'
import styled from 'react-emotion'

import MainLayout from '../layout/main'
import {
  Cards,
  CardItem,
  Card,
  CardImageExternal,
  CardContent,
  CardText,
  CardSubTitle,
  CardTitleExternal,
  CardButtonExternal
} from './card'

const ads = [
  {
    title: 'Der beste Innenraumreiniger',
    subTitle: 'Egal ob Leder, Kunststoff oder Textilien',
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/marvin/jeep_gc/DSC01026.jpg',
    link: 'http://amzn.to/2oJuM67'
  },
  {
    title: 'Bei jeder Aufbereitung mit dabei',
    subTitle: 'ein Staubwedel um den Polierstaub zu entfernen',
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/marvin/964schwarzmetfussocoat/P1020431.JPG',
    link: 'http://amzn.to/2yJpdba'
  },
  {
    title: 'Ideal für Detailverliebte',
    subTitle: 'Mini Akku Poliermaschine für schwer erreichbare Stellen',
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/chiller/993-112017/993_037.jpg',
    link: 'http://amzn.to/2z2RbP1'
  },
  {
    title: 'Maximale Abtragsleistung mit der Exzentermaschine',
    subTitle: 'Diese Politur macht eine Rotationsmaschine überflüssig',
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/marvin/guide_mf_pads/DSC01919.jpg',
    link: 'http://amzn.to/2kHKkSx'
  },
  {
    title: 'Achtung, Nur für Perfektionisten!',
    subTitle: 'Die beste Lampe zur Lackbegutachtung',
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/marvin/porsche993_schwarz_csl_exo/DSC01757.jpg',
    link: 'http://amzn.to/2ArV8el'
  },
  {
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/mark/Ferrari458/036.JPG',
    title: 'Sprühflasche mit einzigartiger Funktion',
    subTitle: 'Jeder Profi schwört darauf',
    link: 'http://amzn.to/2BMd8Rb'
  },
  {
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/alexbrose/E30_Pflegebericht/001.jpg',
    title: 'Die ultimative Allzweckwaffe für eingebrannten Dreck',
    subTitle: 'Hoch konzentrierter und günstiger Allzweckreiniger',
    link: 'http://amzn.to/2CeOhc0'
  },
  {
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/jones/berichte/bmw_m6_coupe/0020.jpg',
    title: 'Garantiert Kratzfrei Waschen',
    subTitle: 'Dazu brauchst du nur dieses Hilfsmittel',
    link: 'http://amzn.to/2CkMiTJ'
  }
]
export default class Werbung extends React.Component {
  constructor() {
    super()
    this.state = {
      ad: {}
    }
  }
  componentDidMount() {
    this.setState({
      ad: ads[Math.floor(Math.random() * ads.length)]
    })
  }
  render() {
    const { link, image, title, subTitle } = this.state.ad
    return (
      <CardItem key="WERBUNG" isPost={this.props.isPost}>
        <Card>
          <a href={link} target="_blank">
            <CardImageExternal image={image} {...this.props} />
            <CardContent>
              <CardText isMeta>von Marvin &middot; Werbung</CardText>
              <CardTitleExternal {...this.props}>{title}</CardTitleExternal>
              <CardSubTitle>{subTitle}</CardSubTitle>
              <CardButtonExternal>ansehen</CardButtonExternal>
            </CardContent>
          </a>
        </Card>
      </CardItem>
    )
  }
}
