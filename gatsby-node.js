const dateFormat = require('dateformat')
const path = require('path')
const config = require('./src/config')

const generateDate = date => dateFormat(date, 'dd.mm.yyyy')

const generateSlug = (category, slug) => `/${category.toLowerCase()}/${slug}/`

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allContentfulPost(limit: 1000) {
            edges {
              node {
                slug
                category
                id
                date
                author
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) reject(result.errors)

      // Create Category Pages
      config.categoryPages.map(cat => {
        createPage({
          path: cat.url,
          component: path.resolve('./src/templates/categories.js'),
          context: {
            title: cat.title,
            description: cat.description,
            subTitle: cat.subTitle,
            category: cat.title
          }
        })
      })

      // Create Glossboss Pages
      config.activeBosse.forEach((value, key) => {
        createPage({
          path: generateSlug('glossbosse', key.toLowerCase()),
          component: path.resolve('./src/templates/glossboss.js'),
          context: {
            author: key
          }
        })
      })

      result.data.allContentfulPost.edges.map(edge => {
        if (edge.node.category === 'PAGE') {
          // Create Pages like Impressum
          createPage({
            path: edge.node.slug,
            component: path.resolve(`./src/templates/page.js`),
            context: {
              id: edge.node.id
            }
          })
        } else {
          // Create the Posts
          createPage({
            path: generateSlug(edge.node.category, edge.node.slug),
            component: path.resolve(`./src/templates/post.js`),
            context: {
              id: edge.node.id,
              author: edge.node.author,
              prettyDate: generateDate(edge.node.date)
            }
          })
        }
      })
      resolve()
    })
  })
}
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'ContentfulPost') {
    createNodeField({
      node,
      name: 'prettyDate',
      value: generateDate(node.date)
    })
    createNodeField({
      node,
      name: 'fullUrl',
      value: generateSlug(node.category, node.slug)
    })
  }
}