import React from 'react'
import { withState } from 'recompose'
import { Form, Row, Input, Button, AllCenter } from './styled'

const enhance = withState('passVisibility', 'setVisibility', false)

export default enhance(({ onSub, passVisibility, setVisibility }) => {
  let name
  let pass

  const visibility = passVisibility ? 'visible' : 'hidden'
  const opacity = passVisibility ? 1 : 0
  const inputHandler = (e) => {
    if (e.target.value === process.env.SUPA_NAME !== passVisibility) {
      setVisibility(prev => !prev)
    }
  }

  const clickHandler = (e) => {
    e.preventDefault()
    const nm = name.value.trim()
    const ps = pass.value.trim()

    if (!nm || passVisibility && !ps) return

    onSub(name.value, pass.value)
  }

  return (
    <AllCenter>
      <Form>
        <Row visible>Представьтесь:</Row>
        <Row visible>
          <Input
            type='name'
            placeholder='Имя'
            onInput={inputHandler}
            innerRef={nm => { name = nm }}
          />
        </Row>
        <Row visible>
          <Input
            type='password'
            innerRef={ps => { pass = ps }}
            style={{visibility, opacity}}
          />
          <Button onClick={clickHandler}>
            Далее
          </Button>
        </Row>
      </Form>
    </AllCenter>
  )
})
