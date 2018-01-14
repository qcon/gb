require('dotenv').config()
module.exports = {
  siteMetadata: {
    siteUrl: `https://glossboss.de`
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 600,
              height: 400
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACEID_CONTENTFUL,
        accessToken: process.env.ACCESSTOKEN_CONTENTFUL
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-52307693-1',
        anonymize: true
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `source sans pro\:300,400,700` // you can also specify font weights and styles
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ]
}
