const defaultMessageState = {
  messages: [],
  needAnimation: true,
  endedAnimation: false
}

export function messageReducer (state, action) {
  switch (action.type) {
    case 'message':
      const { messages: msg, endedAnimation, needAnimation } = state
      const messages = msg.concat(action.m)

      return {
        ...state,
        messages,
        needAnimation: needAnimation && messages.length === 1,
        endedAnimation: endedAnimation || messages.length !== 1
      }

    case 'animationEnd':
      return {
        ...state,
        endedAnimation: true
      }

    case 'ws/select':
      return {
        ...state,
        messages: []
      }

    default:
      return state || defaultMessageState
  }
}

const defaultUserState = { tryAuth: true, isAuthenticated: false }
export function userReducer (state, action) {
  switch (action.type) {
    case 'ws/auth':
      return {
        ...state,
        tryAuth: true
      }

    case 'user':
      return {
        ...state,
        tryAuth: false,
        isAuthenticated: action.isAuth || false,
        isSupa: action.isSupa,
        name: action.name,
        token: action.token
      }

    default:
      return state || defaultUserState
  }
}

const defaultRoomState = []
export function roomsReducer (state, action) {
  switch (action.type) {
    case 'room_all':
      return action.room
    case 'room_add':
      return state.concat(action.room)
    case 'room_rem':
      return state.filter(room => room.key !== action.room.key)
    default:
      return state || defaultRoomState
  }
}

const defaultSelectedRoomState = null
export function selectedRoomReducer (state, action) {
  switch (action.type) {
    case `ws/select`:
      return action.name
    default:
      return state || defaultSelectedRoomState
  }
}
