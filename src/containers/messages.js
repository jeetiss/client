import React from 'react'
import AutoScrollContainer from '../components/autoscrollcontainer'
import Header from '../components/header'
import { connect } from 'react-redux'
import { selectMessages, selectAnimationNeed, composeSelectors } from '../selectors'
import { Message } from '../components/message'


const needName = (name, arr, index) =>
  index - 1 < 0 || arr[index - 1].name !== name

function MessagesView ({ theme, messages, animationNeed, dispatch }) {
  console.log(theme)
  return (
    <AutoScrollContainer>
      <Header />
      { messages.map((message, index, arr) => {
        const props = {
          key: message.time,
          name: needName(message.name, arr, index) ? message.name : undefined,
          text: message.text,
          animated: animationNeed,
          onAnimationEnd: animationNeed ? () => dispatch({type: 'animationEnd'}) : undefined
        }

        return <Message {...props} />
      }) }
    </AutoScrollContainer>
  )
}

const Messages = connect(
  composeSelectors(selectMessages, selectAnimationNeed)
)(MessagesView)
export default Messages
