import React from 'react'
import styled from 'styled-components'

const Inner = styled.div`
  min-height: 0
`

const MsgContainer = styled.div`
  flex: 1 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default class AutoScrollContainer extends React.PureComponent {
  componentDidUpdate () {
    this.div.scrollTop = this.div.scrollHeight - this.div.offsetHeight
  }

  render () {
    const { children } = this.props

    return (
      <MsgContainer id='div' innerRef={div => { this.div = div }}>
        <Inner>
          { children }
        </Inner>
      </MsgContainer>
    )
  }
}
