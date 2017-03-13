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

import {
  createSocketMiddleware,
  logger,
  sendAndSaveToken
} from './middlewares'

const ws = new window.WebSocket(process.env.WSSERVER)

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
