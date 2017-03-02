import { createStore as cs, applyMiddleware, combineReducers, compose } from 'redux'
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
  return cs(
    combineReducers({
      messages, user
    }),
    compose(
      applyMiddleware(middlws),
      sendSaveToken({
        sendToken: token => {
          ws.onopen = () => {
            ws.send(JSON.stringify({type: 'ws/auth', token}))
          }
        },
        selectToken: state => state.user.token
      })
    )
  )
}

function sendSaveToken ({ sendToken, selectToken, key = 'fuckredux' }) {
  let prevToken = window.localStorage.getItem(key)

  if (prevToken) {
    sendToken(prevToken)
  }

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

    return store
  }
}
