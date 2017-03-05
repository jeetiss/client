import React from 'react'
import { connect } from 'react-redux'
import { selectRooms, selectSelectedRoom, composeSelectors } from '../selectors'

function AdminView ({ rooms, selectedRoom, dispatch }) {
  return (
    <div>
      <div>это админка</div>
      <select onChange={
        e => {
          const name = e.target.value === 'None' ? null : e.target.value
          dispatch({ type: 'ws/select', name })
        }
      }>
        { selectedRoom ? <option selected>None</option> : <option>None</option> }
        { rooms.map(
          room => selectedRoom === room
          ? <option key={room} selected>{room}</option>
          : <option key={room}>{room}</option>
        ) }
      </select>
    </div>
  )
}

const Admin = connect(
  composeSelectors(selectRooms, selectSelectedRoom)
)(AdminView)

export default Admin
