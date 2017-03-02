const defaultMessageState = []
export function messageReducer (state, action) {
  switch (action.type) {
    case 'message':
      return state.concat({
        time: action.time,
        text: action.message
      })

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
