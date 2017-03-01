import { createStore as cs, applyMiddleware, combineReducers } from 'redux'
import { messageReducer as messages, userReducer as user } from './reducers/reducer'

const ws = new window.WebSocket('ws://localhost:1234')

function createSocketMiddleware (socket) {
  const send = (data) => ws.send(JSON.stringify(data))

  return ({ dispatch }) => {
    socket.addEventListener('message', e => {
      const msg = JSON.parse(e.data)
      dispatch(msg)
    })

    return next => action => {
      if (action.type.startsWith('ws/')) {
        send(action)
      }

      return next(action)
    }
  }
}

const middlws = createSocketMiddleware(ws)

export default function createStore () {
  return cs(combineReducers({
    messages, user
  }), applyMiddleware(middlws))
}

