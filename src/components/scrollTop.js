/*eslint-disable*/
import React from 'react'
import styled from 'react-emotion'

import config from '../config'

const Arrow = styled.span`
  color: white;
`
const Scroll = styled.button`
  opacity: 0.3;
  background-color: ${config.glossbossBlue};
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 5px;
  border: none;

  &:hover {
    opacity: 1;
  }
`

export default class ScrollTop extends React.Component {
  constructor() {
    super()

    this.state = {
      intervalId: 0,
      steps: 0
    }
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      this.setState(() => {
        steps: 0
      })
      clearInterval(this.state.intervalId)
    }
    //accelerate
    this.setState(prevState => {
      steps: prevState.steps++
    })
    window.scroll(
      0,
      window.pageYOffset - this.props.scrollStepInPx * this.state.steps
    )
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    )
    this.setState({ intervalId: intervalId })
  }

  render() {
    return (
      <Scroll
        title="Back to top"
        onClick={() => {
          this.scrollToTop()
        }}
      >
        <Arrow>
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
            className="feather feather-arrow-up"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </Arrow>
      </Scroll>
    )
  }
}
