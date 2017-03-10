import React from 'react'
import AutoScrollContainer from '../components/autoscrollcontainer'
import { connect } from 'react-redux'
import { selectMessages } from '../selectors'
import { Message } from '../components/message'


const needName = (name, arr, index) =>
  index - 1 < 0 || arr[index - 1].name !== name

function MessagesView ({ messages, dispatch }) {
  return (
    <AutoScrollContainer>
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
    </AutoScrollContainer>
  )
}

const Messages = connect(selectMessages)(MessagesView)
export default Messages
