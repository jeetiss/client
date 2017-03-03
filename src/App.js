import React from 'react'
import Login from './containers/login'
import Chat from './containers/chat'
import Admin from './containers/admin'
import { connect } from 'react-redux'
import { selectUser } from './selectors'
import { injectGlobal } from 'styled-components'

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

const AppView = ({ user }) => {
  if (!user.isAuthenticated) {
    return <Login />
  } else if (user.isSupa) {
    return <Admin />
  } else {
    return <Chat />
  }
}

const App = connect(selectUser)(AppView)

export default App
