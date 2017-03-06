import React from 'react'
import styled from 'styled-components'
import { withState } from 'recompose'
import { Form, Row, Input, Button } from './styled'

const Center = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const enhance = withState('passVisibility', 'setVisibility', false)

export default enhance(({ onSub, passVisibility, setVisibility }) => {
  let name
  let pass

  const visibility = passVisibility ? 'visible' : 'hidden'
  const inputHandler = (e) => {
    if (e.target.value === process.env.SUPA_NAME !== passVisibility) {
      setVisibility(prev => !prev)
    }
  }

  const clickHandler = (e) => {
    e.preventDefault()
    onSub(name.value, pass.value)
  }

  return (
    <Center>
      <Form>
        <Row>
          <Input
            type='name'
            placeholder='Имя'
            onInput={inputHandler}
            innerRef={nm => { name = nm }}
          />
        </Row>
        <Row>
          <Input
            type='password'
            innerRef={ps => { pass = ps }}
            style={{visibility}}
          />
          <Button onClick={clickHandler}>
            Далее
          </Button>
        </Row>
      </Form>
    </Center>
  )
})
