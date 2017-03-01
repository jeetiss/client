export default function socketReducer (state, action) {
  if (action.type === 'user') {
    return {
      ...state,
      user: {
        isAuthenticated: true,
        isSupa: action.isSupa,
        name: action.name
      }
    }
  } else if (action.type === 'message') {
    return {
      ...state,
      messages: state.messages.concat(
        {
          time: action.time,
          text: action.message
        }
      )
    }
  }

  return state
}
