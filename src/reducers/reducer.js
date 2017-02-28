export default function socketReducer (state, action) {
  if (action.type === 'send') {
    const { type } = action.data

    if (type === 'auth') {
      return {...state, isAuthenticated: true}
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
