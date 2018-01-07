import React from 'react'
import { Helmet } from 'react-helmet'

import MainLayout from '../layout/main'

import config from '../config'

class PageTemplate extends React.Component {
  render() {
    const postData = this.props.data.contentfulPost
    const { title, author, slug, body } = postData
    return (
      <MainLayout title={title}>
        <Helmet>
          <title>{'GLOSSBOSS.de - ' + title}</title>
          <link rel="canonical" href={config.siteUrl + slug} />
          <meta name="author" content="Marvin" />
        </Helmet>
        <div
          dangerouslySetInnerHTML={{
            __html: body.childMarkdownRemark.html
          }}
        />
      </MainLayout>
    )
  }
}
export default PageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    contentfulPost: contentfulPost(id: { eq: $id }) {
      author
      title
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
