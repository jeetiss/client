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


const defaultUserState = { isAuthenticated: false }
export function userReducer (state, action) {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        isAuthenticated: action.isAuth,
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
      return state.filter(room => room !== action.room)
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