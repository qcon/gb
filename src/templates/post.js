import React from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import 'moment/locale/de'
import styled from 'react-emotion'

import MainLayout from '../layout/main'
import Breadcrumb from '../components/breadcrumb'
import Bio from '../components/bio'
import Werbung from '../components/werbung'
import Comments from '../components/comments'
import { CardStyle } from '../components/card'

import config from '../config'

moment.locale('de')

const PostMeta = styled.p`
  font-size: 14px;
  color: ${config.darkGray};
  margin-top: -5px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`
const WerbungWrapper = styled.ul`
  margin: 50px 0;
  padding: 0;
`
const WerbungNotification = styled.div`
  margin-top: 15px;
  text-align: center;
  color: ${config.lightGray};
`
const PostMetaWrapper = styled.div`
  ${CardStyle};
  padding: 15px;
`

class PostTemplate extends React.Component {
  render() {
    const postData = this.props.data.contentfulPost
    const {
      postImage,
      title,
      category,
      subTitle,
      author,
      date,
      fields,
      body
    } = postData
    const fullUrl =
      config.siteUrl + fields.fullUrl.slice(1, fields.fullUrl.length)
    return (
      <MainLayout
        image={postImage} // title={title}
        // subTitle={subTitle}
        isPostPage
      >
        <Helmet>
          <title>
            {category} / {title} - {subTitle}
          </title>
          <link rel="canonical" href={fullUrl} />
          <meta name="author" content={author} />
          <meta property="og:title" content={title} />
          <meta property="og:url" content={fullUrl} />
          <meta property="og:image" content={postImage} />
        </Helmet>
        <Breadcrumb title={title} category={category} />
        <PostMeta>
          von {author} {moment(date).fromNow()} am {fields.prettyDate}
        </PostMeta>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
        />
        <WerbungWrapper>
          <WerbungNotification>Werbung</WerbungNotification>
          <Werbung isPost />
        </WerbungWrapper>
        {config.activeBosse.has(author) ? (
          <Bio
            author={author}
            lastPosts={this.props.data.morePostsFromAuthor.edges}
          />
        ) : (
          ''
        )}
        <Comments />
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <script type="application/ld+json">
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "headline": "${title}",
            "name": "${title}",
            "creator": "${author}",
            "image": {
              "@type": "ImageObject",
              "url": "${postImage}",
              "width": "800",
              "height": "600"
            },
            "datePublished": "${date}",
            "dateModified": "${date}",
            "keywords": "${category}",
            "author": {
              "@type": "Person",
              "name": "${author}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Glossboss",
              "logo": {
                "@type": "ImageObject",
                "url": "https://glossbossimages.s3.eu-central-1.amazonaws.com/AMP_Logo_Glossboss.jpg",
                "width": "600",
                "height": "60"
              }
            },
            "mainEntityOfPage":{
                "@type":"WebPage",
                "@id":"${fullUrl}"
            }
          }
          </script>
          <script type="application/ld+json">
          {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@id": "${config.siteUrl}${category}",
                "name": "${category}"
              }
            }, {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": "${fullUrl}",
                "name": "${title}"
              }
            }]
          }
          </script>
        `
          }}
        />
      </MainLayout>
    )
  }
}
export default PostTemplate

export const pageQuery = graphql`
  query postQuery($id: String!, $author: String!) {
    morePostsFromAuthor: allContentfulPost(
      filter: { author: { eq: $author }, category: { ne: "PAGE" } }
      sort: { fields: [date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          fields {
            fullUrl
          }
          title
          author
        }
      }
    }
    contentfulPost: contentfulPost(id: { eq: $id }) {
      author
      title
      category
      subTitle
      date
      postImage
      fields {
        fullUrl
        prettyDate
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
