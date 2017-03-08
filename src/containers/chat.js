import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { selectMessages } from '../selectors'
import { CenteredDiv } from '../components/centereddiv'
import { Message } from '../components/message'
import { Form, Row, Input, Button } from '../components/styled'

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const needName = (name, arr, index) =>
  index - 1 < 0 || arr[index - 1].name !== name

function ChatView ({ messages, dispatch }) {
  let textarea

  return (
    <CenteredDiv>
      <MsgContainer>
        { messages.map((message, index, arr) => (
          <Message
            key={message.time}
            name={needName(message.name, arr, index) ? message.name : undefined}
            text={message.text}
            animated={arr.length === 1}
          />
        )) }
      </MsgContainer>

      <Form>
        <Row>
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
    </CenteredDiv>
  )
}

const Chat = connect(selectMessages)(ChatView)
export default Chat
