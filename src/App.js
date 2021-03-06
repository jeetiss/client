import React from 'react'
import Login from './containers/login'
import Messages from './containers/messages'
import Chat from './containers/chat'
import Admin from './containers/admin'
import Loader from './components/loader'
import theme from './theme'
import { connect } from 'react-redux'
import { selectUser } from './selectors'
import { CenteredDiv } from './components/centereddiv'
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${theme.colors.back};
    color: ${theme.colors.main}
    font-family: 'Roboto', sans-serif;
  }
`

const AppContainer = styled.div`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  overflow: hidden;
`

const AppView = ({ user }) => {
  if (user.tryAuth) {
    return <Loader />
  } else if (!user.isAuthenticated) {
    return <Login />
  } else {
    return (
      <AppContainer>
        <CenteredDiv>
          { user.isSupa ? <Admin /> : ''}
          <Messages />
          <Chat />
        </CenteredDiv>
      </AppContainer>
    )
  }
}

const App = connect(selectUser)(AppView)

export default App
