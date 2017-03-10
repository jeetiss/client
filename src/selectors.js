export const selectUser = state => ({user: state.user})

export const selectMessages = store =>
  ({ messages: store.messages.messages })

export const selectRooms = store => ({ rooms: store.rooms })

export const selectSelectedRoom = store =>
  ({ selectedRoom: store.selectedRoom })

export const selectAnimationDone = store =>
  ({animationDone: store.messages.endedAnimation})

export const selectAnimationNeed = store =>
  ({animationNeed: store.messages.needAnimation})


export const composeSelectors = (...selectors) => store => Object.assign(
  ...selectors.map(selector => selector(store))
)
