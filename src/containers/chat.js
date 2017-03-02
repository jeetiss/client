import React from 'react'
import { connect } from 'react-redux'
import { selectMessages } from '../selectors'

function ChatView ({ messages, dispatch }) {
  let textarea

  return (
    <div>
      <div>
        { messages.map(message => (
          <div key={message.time}>
            { message.text }
          </div>
        )) }
      </div>

      <form>
        <input ref={v => { textarea = v }} />
        <button onClick={e => {
          e.preventDefault()
          const value = textarea.value.trim()
          if (!value) {
            return
          }

          dispatch({type: 'ws/message', text: value})
          textarea.value = ''
        }}>
          submit
        </button>
      </form>
    </div>
  )
}


const Chat = connect(selectMessages)(ChatView)
export default Chat
