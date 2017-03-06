import React from 'react'
import styled from 'styled-components'
import { Form, Row, Input, Button } from './styled'

const Center = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default function LoginForm ({ onSub }) {
  let name
  let pass

  return (
    <Center>
      <Form>
        <Row>
          <Input type='name' placeholder='Имя' innerRef={nm => { name = nm }} />
        </Row>
        <Row>
          <Input type='password' innerRef={ps => { pass = ps }} style={{visibility: 'hidden'}} />
          <Button onClick={(e) => {
            e.preventDefault()
            onSub(name.value, pass.value)
          }}>
            Далее
          </Button>
        </Row>
      </Form>
    </Center>
  )
}
