import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { selectMessages } from '../selectors'
import { Message } from '../components/message'

const MsgContainer = styled.div`
  flex: 1 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Inner = styled.div`
  min-height: 0
`

const needName = (name, arr, index) =>
  index - 1 < 0 || arr[index - 1].name !== name

function MessagesView ({ messages, dispatch }) {
  return (
    <MsgContainer>
      <Inner>
        { messages.map((message, index, arr) => {
          const props = {
            key: message.time,
            name: needName(message.name, arr, index) ? message.name : undefined,
            text: message.text,
            animated: arr.length === 1,
            onAnimationEnd: arr.length === 1 ? () => dispatch({type: 'animationEnd'}) : undefined
          }

          return <Message {...props} />
        }) }
      </Inner>
    </MsgContainer>
  )
}

const Messages = connect(selectMessages)(MessagesView)
export default Messages
