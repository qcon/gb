import React from 'react'
import RenderCategory from '../components/renderCategory'

class GlossbossTemplate extends React.Component {
  render() {
    return (
      <RenderCategory
        category={this.props.data.glossboss.edges}
        title={
          `GLOSBOSS ` +
          this.props.data.glossboss.edges[0].node.author.toUpperCase()
        }
        description={
          `Alle Beiträge von ` + this.props.data.glossboss.edges[0].node.author
        }
        hideCategoryHeading={true}
      />
    )
  }
}

export default GlossbossTemplate

export const pageQuery = graphql`
  query GlossbossQuery($author: String!) {
    glossboss: allContentfulPost(
      filter: { author: { eq: $author }, category: { ne: "PAGE" } }
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          fields {
            fullUrl
            prettyDate
          }
          category
          title
          postImage
          postImageThumb
          subTitle
          author
        }
      }
    }
  }
`
