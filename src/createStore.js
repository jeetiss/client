import {
  createStore as cs,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'

import {
  messageReducer as messages,
  userReducer as user,
  roomsReducer as rooms,
  selectedRoomReducer as selectedRoom
} from './reducers/reducer'

const ws = new window.WebSocket(process.env.WSSERVER)

function createSocketMiddleware (socket) {
  const innerSend = obj => socket.send(JSON.stringify(obj))
  const send = (data) => {
    if (socket.readyState === window.WebSocket.OPEN) {
      innerSend(data)
    } else {
      const handler = () => {
        innerSend(data)
        socket.removeEventListener('open', handler)
      }

      socket.addEventListener('open', handler)
    }
  }

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

const logger = ({ getState }) => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  const result = next(action)
  console.log('next state', getState())
  console.groupEnd(action.type)
  return result
}

const prodMiddls = [
  createSocketMiddleware(ws)
]

const devMiddls = [
  logger
]

const middlws = process.env.NODE_ENV === 'development'
  ? prodMiddls.concat(devMiddls)
  : prodMiddls

export default function createStore () {
  return cs(
    combineReducers({
      messages, user, rooms, selectedRoom
    }),
    compose(
      sendAndSaveToken({
        actionCreator: token => ({type: 'ws/auth', token}),
        selectToken: state => state.user.token
      }),
      applyMiddleware(
        ...middlws
      ),
    )
  )
}

function sendAndSaveToken ({ actionCreator, selectToken, key = 'fuckredux' }) {
  let prevToken = window.localStorage.getItem(key)

  return next => (reducer, initialState, enhanter) => {
    const store = next(reducer, initialState, enhanter)

    store.subscribe(() => {
      const token = selectToken(store.getState())
      if (token && token !== prevToken) {
        console.log(`store ${token}`)
        window.localStorage.setItem(key, token)
        prevToken = token
      }
    })

    if (prevToken) {
      store.dispatch(actionCreator(prevToken))
    }

    return store
  }
}
