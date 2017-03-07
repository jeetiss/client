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
  let timeoutID = null

  const innerSend = obj => socket.send(JSON.stringify(obj))
  const ping = () => {
    timeoutID = setTimeout(() => {
      innerSend({type: 'ping'})
      ping()
    }, 50000)
  }

  const checkPingAndSend = obj => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    innerSend(obj)
    ping()
  }

  const send = (data) => {
    if (socket.readyState === window.WebSocket.OPEN) {
      checkPingAndSend(data)
    } else if (socket.readyState === window.WebSocket.CONNECTING) {
      const handler = () => {
        checkPingAndSend(data)
        socket.removeEventListener('open', handler)
      }

      socket.addEventListener('open', handler)
    } else {
      throw Error('socket in close state')
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
        actionCreator: token =>
          token ? {type: 'ws/auth', token} : {type: 'user'},
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
        window.localStorage.setItem(key, token)
        prevToken = token
      }
    })

    store.dispatch(actionCreator(prevToken))

    return store
  }
}
