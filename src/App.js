import React from 'react'
import Login from './containers/login'
import Chat from './containers/chat'
import Admin from './containers/admin'
import Loader from './components/loader'
import { connect } from 'react-redux'
import { selectUser } from './selectors'
import styled, { injectGlobal } from 'styled-components'

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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AppView = ({ user }) => {
  if (user.tryAuth) {
    return <Loader />
  } else if (!user.isAuthenticated) {
    return <Login />
  } else {
    return (
      <AppContainer>
        { user.isSupa ? <Admin /> : ''}
        <Chat />
      </AppContainer>
    )
  }
}

const App = connect(selectUser)(AppView)

export default App
