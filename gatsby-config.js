require('now-env')
module.exports = {
  siteMetadata: {
    siteUrl: `https://blog.glossboss.de`,
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-youtubevideo',
            options: {
              width: 600,
              height: 400,
              disableEmbed: true,
            },
          },
          {
            resolve: 'gatsby-remark-embed-soundcloud',
            options: {
              width: '90%', // default is "100%"
              height: 300, // default is 300
              color: '#1775fc', // default is #ff5500
              autoplay: true, // default is false
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACEID_CONTENTFUL,
        accessToken: process.env.ACCESSTOKEN_CONTENTFUL,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
  ],
}
