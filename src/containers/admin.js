import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { selectRooms, selectSelectedRoom, composeSelectors } from '../selectors'

const SelDiv = styled.div`
  background-color: ${props => props.active ? 'red' : 'white'}
`

function AdminView ({ rooms, selectedRoom, dispatch }) {
  const createClickHandler = name => e => {
    dispatch({ type: 'ws/select', name })
  }

  return (
    <div>
      <SelDiv
        onClick={createClickHandler(null)}
        active={!selectedRoom}
      >None</SelDiv>
      { rooms.map(room => (
        <SelDiv
          active={room.key === selectedRoom}
          key={room.key}
          onClick={createClickHandler(room.key)}
        >
          {room.name}
        </SelDiv>
      )) }
    </div>
  )
}

const Admin = connect(
  composeSelectors(selectRooms, selectSelectedRoom)
)(AdminView)

export default Admin
