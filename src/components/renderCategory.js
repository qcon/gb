import React from 'react'
import styled from 'react-emotion'

import MainLayout from '../components/layout'
import CategoryHeading from './categoryHeading'
import Werbung from './werbung'
import {
  Cards,
  CardItem,
  Card,
  CardImage,
  CardContent,
  CardText,
  CardTitle,
  CardSubTitle,
  CardButton
} from './card'

import config from '../config'

const LoadMore = styled.div`
  color: ${config.darkGray};
  padding: 0.5rem;
  text-transform: lowercase;
  text-align: center;
  display: block;
  width: 100%;
  font-size: 18px;
  cursor: pointer;
  margin: ${props => (props.isLoadMore ? '50px 0' : '25px 0 0 0')};
  margin-bottom: 200px;
  svg {
    color: ${config.glossbossBlue};
    transform: scale(2);
    margin: 25px;
    transition: 150ms ease-in;
  }
  &:hover {
    color: black;
    svg {
      transform: scale(2.1);
    }
  }
`

class RenderCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.category,
      postsToShow: config.reloadPosts - 7
    }
  }
  loadMorePosts(userAction) {
    this.setState((prevState, props) => {
      return {
        postsToShow: prevState.postsToShow + config.reloadPosts
      }
    })
    if (userAction) {
      const windowGlobal = typeof window !== 'undefined' && window
      if (typeof windowGlobal.ga === 'function') {
        windowGlobal.ga(
          'send',
          'event',
          'Click',
          'LoadMore',
          windowGlobal.location.pathname
        )
      }
    }
  }
  render() {
    return (
      <MainLayout {...this.props}>
        {!this.props.hideCategoryHeading && (
          <CategoryHeading category={this.props.title} />
        )}
        <p>{this.props.description}</p>
        <Cards style={this.props.transition && this.props.transition.style}>
          <Werbung />
          {this.state.posts.slice(0, this.state.postsToShow).map((post, i) => {
            let generatedPostImageThumb = post.node.postImage
            if (post.node.postImage.indexOf('glossbossuploader') > -1) {
              generatedPostImageThumb.replace(
                'glosbossimages',
                'glosbossuploader'
              )
            }
            const linkGlossboss = config.activeBosse.has(post.node.author) ? (
              <a href={`/glossbosse/${post.node.author.toLowerCase()}`}>
                {post.node.author}
              </a>
            ) : (
              post.node.author
            )
            return (
              <CardItem key={post.node.fields.fullUrl}>
                <Card>
                  <CardImage
                    image={
                      post.node.postImageThumb ||
                      generatedPostImageThumb.replace(
                        'amazonaws.com',
                        'amazonaws.com/thumbnails'
                      )
                    }
                    to={post.node.fields.fullUrl}
                    title={post.node.title + ' ' + post.node.subTitle}
                  />
                  <CardContent>
                    <CardText isMeta>
                      von {linkGlossboss} &middot; {post.node.fields.prettyDate}{' '}
                      &middot;{' '}
                      <a href={`/${post.node.category.toLowerCase()}`}>
                        {post.node.category}
                      </a>
                    </CardText>
                    <CardTitle
                      to={post.node.fields.fullUrl}
                      title={post.node.title + ' ' + post.node.subTitle}
                    >
                      {post.node.title}
                    </CardTitle>
                    <CardSubTitle>{post.node.subTitle}</CardSubTitle>
                    <CardButton
                      to={post.node.fields.fullUrl}
                      title={post.node.title + ' ' + post.node.subTitle}
                    >
                      {post.node.category === 'Videos' ? 'ansehen' : 'lesen'}
                    </CardButton>
                  </CardContent>
                </Card>
              </CardItem>
            )
          })}
        </Cards>
        {this.state.posts.length > this.state.postsToShow && (
          <LoadMore
            isLoadMore
            onClick={() => this.loadMorePosts(true)}
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus-square"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <div>
              weitere{' '}
              {Math.min(
                config.reloadPosts,
                this.state.posts.length - this.state.postsToShow
              )}{' '}
              Beiträge laden
            </div>
          </LoadMore>
        )}
      </MainLayout>
    )
  }
}

export default RenderCategory
