import React from 'react'
import { connect } from 'react-redux'
import { injectGlobal } from 'styled-components'

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: white;
    font-family: 'Roboto', sans-serif;
  }
`

class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hiddenPass: true
    }

    this.onSub = props.onSub
    this.onSubmitHandler = this.onSubmit.bind(this)
    this.onInputHandler = this.onInput.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    const name = this.name.value
    const pass = this.pass.value

    this.onSub(name, pass)
  }

  onInput (e) {
    const hiddenPass = this.name.value !== 'jeetiss'
    if (this.state.hiddenPass !== hiddenPass) {
      this.setState({ hiddenPass })
    }
  }

  render () {
    const { hiddenPass } = this.state
    const display = hiddenPass ? 'none' : 'inline-block'

    return (
      <form>
        <input type='name' ref={name => { this.name = name }} onInput={this.onInputHandler}/>
        <br />
        <input type='pass' ref={pass => { this.pass = pass }} style={{display}} />
        <br />
        <button onClick={this.onSubmitHandler}>Submit</button>
      </form>
    )
  }
}

function sendMessage (data) {
  return (send) => {
    send(data)

    return { type: 'send', data }
  }
}

function Chat ({ messages, dispatch }) {
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

          dispatch(sendMessage({type: 'message', text: value}))
          textarea.value = ''
        }}>
          submit
        </button>
      </form>
    </div>
  )
}
      // <LoginForm onSub={(...args) => console.log(args)} />
const stop = store => ({ messages: store.messages })
const CChat = connect(stop)(Chat)

const App = () => (
  <Router>
    <div>
      <Route path='/login' component={CLogin} />
      <PrivateRoute path='/' component={CChat} />
    </div>
  </Router>
)

const PR = ({ isAuthenticated, component, ...rest }) => (
  <Route {...rest} render={props =>
    isAuthenticated
    ? React.createElement(component, props)
    : <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />
  } />
)

const sttopr = state => ({isAuthenticated: state.isAuthenticated})
const PrivateRoute = connect(sttopr)(PR)


function Login ({ dispatch, isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />
  } else {
    return <LoginForm
      onSub={(name, pass) => dispatch(
        sendMessage({ type: 'auth', name, pass })
      )}
    />
  }
}

const CLogin = connect(sttopr)(Login)

export default App
