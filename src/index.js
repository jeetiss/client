import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createStore from './createStore'
import theme from './theme'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

const mountPoint = document.getElementById('root')
const store = createStore()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  mountPoint
)
