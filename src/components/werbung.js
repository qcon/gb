import React from 'react'

import {
  CardItem,
  Card,
  CardImageExternal,
  CardContent,
  CardText,
  CardSubTitle,
  CardTitleExternal,
  CardButtonExternal,
  CardLinkAd
} from './card'

const ads = [
  {
    title: 'Bei jeder Aufbereitung mit dabei',
    subTitle: 'ein Staubwedel um den Polierstaub zu entfernen',
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/marvin/964schwarzmetfussocoat/P1020431.JPG',
    link: 'https://glossboss-shop.de/Staubwedel?ref=gb.de'
  },
  {
    title: 'Maximale Abtragsleistung mit der Exzentermaschine',
    subTitle: 'Diese Politur macht eine Rotationsmaschine überflüssig',
    image:
      'https://glossbossimages.s3.eu-central-1.amazonaws.com/thumbnails/marvin/guide_mf_pads/DSC01919.jpg',
    link: 'http://amzn.to/2kHKkSx'
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
  },
  {
    image:
      'https://glossbossuploader.s3.eu-central-1.amazonaws.com/thumbnails/Bu0ACzB6aeqL_xIl4hqwZ-pinsel/pinsel.jpg',
    title: 'Die schonenste Reinigung für den Innenraum',
    subTitle: 'Super-Soft Pinsel für Klavierlack und co',
    link: 'https://glossboss-shop.de/Super-Soft-Pinsel-SET?ref=gb.de'
  },
  {
    image:
      'https://glossbossuploader.s3.eu-central-1.amazonaws.com/thumbnails/SQ3ddjOC6dJ4dc65T0V8S-rag/IMG_0878.jpg',
    title: 'NEUENTWICKLUNG: Trockentuch von The Rag Company',
    subTitle: 'Mit einzigartiger funktion (The Gauntlet)',
    link:
      'https://glossboss-shop.de/The-Rag-Company-The-GAUNTLET-Trockentuch-50x75cm?ref=gb.de'
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
          <CardLinkAd href={link} target="_blank" rel="noopener noreferrer">
            <CardImageExternal image={image} {...this.props} />
            <CardContent>
              <CardText isMeta>von Marvin &middot; Werbung</CardText>
              <CardTitleExternal {...this.props}>{title}</CardTitleExternal>
              <CardSubTitle>{subTitle}</CardSubTitle>
              <CardButtonExternal>ansehen</CardButtonExternal>
            </CardContent>
          </CardLinkAd>
        </Card>
      </CardItem>
    )
  }
}
