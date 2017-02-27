import React from 'react'
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

function App () {
  return (
    <div>
      приветики
    </div>
  )
}

export default App
