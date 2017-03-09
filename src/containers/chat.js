import React from 'react'
import { connect } from 'react-redux'
import { selectAnimationDone } from '../selectors'
import { Form, Row, Input, Button } from '../components/styled'

function ChatView ({ animationDone, dispatch }) {
  let textarea

  return (
    <Form>
      <Row style={{opacity: animationDone ? 1 : 0}}>
        <Input innerRef={v => { textarea = v }} />
        <Button onClick={e => {
          e.preventDefault()
          const value = textarea.value.trim()
          if (!value) {
            return
          }

          dispatch({type: 'ws/message', text: value})
          textarea.value = ''
        }}>
          Отправить
        </Button>
      </Row>
    </Form>
  )
}

const Chat = connect(selectAnimationDone)(ChatView)
export default Chat
