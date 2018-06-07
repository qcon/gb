import React from 'react'
import RenderCategory from '../components/renderCategory'

class CategoryTemplate extends React.Component {
  render() {
    return (
      <RenderCategory
        category={this.props.data.category.edges}
        title={this.props.pageContext.title}
        subTitle={this.props.pageContext.subTitle || ''}
        description={this.props.pageContext.description}
      />
    )
  }
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryQuery($category: String!) {
    category: allContentfulPost(
      filter: { category: { eq: $category } }
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
