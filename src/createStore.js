import { createStore as cs, applyMiddleware } from 'redux'
import example from './reducers/reducer'

const ws = new window.WebSocket('ws://localhost:1234')

function createSocketMiddleware (socket) {
  const send = (data) => ws.send(JSON.stringify(data))

  return ({ dispatch }) => {
    socket.addEventListener('message', e => {
      const msg = JSON.parse(e.data)
      console.log(msg)
      dispatch(msg)
    })

    return next => action => {
      if (typeof action === 'function') {
        next(action(send))
      } else {
        return next(action)
      }
    }
  }
}

const middlws = createSocketMiddleware(ws)

export default function createStore () {
  return cs(example, {messages: [], isAuthenticated: false}, applyMiddleware(middlws))
}

