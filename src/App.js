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

function LoginForm ({ onSub }) {
  let name
  let pass

  return (
    <form>
      <input type='name' ref={nm => { name = nm }} />
      <br />
      <input type='pass' ref={ps => { pass = ps }} />
      <br />
      <button onClick={(e) => {
        e.preventDefault()
        onSub(name.value, pass.value)
      }}>Submit</button>
    </form>
  )
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

          dispatch({type: 'ws/message', text: value})
          textarea.value = ''
        }}>
          submit
        </button>
      </form>
    </div>
  )
}

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

const PR = ({ user, component, ...rest }) => (
  <Route {...rest} render={props =>
    user.isAuthenticated
    ? React.createElement(component, props)
    : <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />
  } />
)

const sttopr = state => ({user: state.user})
const PrivateRoute = connect(sttopr)(PR)


function Login ({ dispatch, user }) {
  if (user.isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />
  } else {
    return <LoginForm
      onSub={(name, pass) => dispatch(
        { type: 'ws/auth', name, pass }
      )}
    />
  }
}

const CLogin = connect(sttopr)(Login)

export default App
