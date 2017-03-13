import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createStore from './createStore'
import theme from './theme'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ThemeProvider } from 'styled-components'

const mountPoint = document.getElementById('root')
const store = createStore()

const getApp = App => (
  <AppContainer>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </AppContainer>
)

ReactDOM.render(getApp(App), mountPoint)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default

    ReactDOM.render(getApp(NewApp), mountPoint)
  })
}
