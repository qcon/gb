import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'

import MainLayout from '../components/layout'

import config from '../config'

const PostWrapper = styled.div`
  background: ${config.lighterGray};
  margin: 16px;
  padding: 2rem;
  padding-top: 1rem;
  border-radius: ${config.borderRadius};
  @media (max-width: 66rem) {
    margin: 16px;
    padding: 0.75rem;
    padding-top: 0.5rem;
  }
`

class PageTemplate extends React.Component {
  render() {
    const postData = this.props.data.contentfulPost
    const { title, slug, body } = postData
    return (
      <MainLayout title={title}>
        <Helmet>
          <title>{'GLOSSBOSS.de - ' + title}</title>
          <link rel="canonical" href={config.siteUrl + slug} />
          <meta name="author" content="Marvin" />
        </Helmet>
        <PostWrapper>
          <div
            dangerouslySetInnerHTML={{
              __html: body.childMarkdownRemark.html,
            }}
          />
        </PostWrapper>
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
