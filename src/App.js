import React from 'react'
import Login from './containers/login'
import Chat from './containers/chat'
import PrivateRoute from './containers/privateroute'
import { injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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

const App = () => (
  <Router>
    <div>
      <Route path='/login' component={Login} />
      <PrivateRoute path='/' component={Chat} />
    </div>
  </Router>
)



export default App
