const defaultMessageState = []
export function messageReducer (state, action) {
  switch (action.type) {
    case 'message':
      return state.concat({
        time: action.time,
        text: action.message,
        name: action.name
      })

    case 'ws/select':
      return []

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

const defaultAnimationState = false
export function animationReducer (state, action) {
  switch (action.type) {
    case 'animationEnd':
      return true
    default:
      return state || defaultAnimationState
  }
}
