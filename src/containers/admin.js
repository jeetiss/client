import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { selectRooms, selectSelectedRoom, composeSelectors } from '../selectors'

const Select = styled.div`
  display:flex;
  flex-flow: row wrap;
  padding: 10px;
`

const Option = styled.div`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#141414' : '#BABABA'};
  color: ${props => props.active ? '#FFF' : '#000'};
  border-radius: 2px;
  margin-right: 10px;
  cursor: pointer;

  transition: background-color .35s ease,
    color .35s ease;

  &:hover {
    background-color: ${props => props.active ? '#343434' : '#D1D1D1'}
  }

  &:active {
    transform: translateY(2px);
  }

  &:last-child {
    margin-right: 0px;
  }
`

function AdminView ({ rooms, selectedRoom, dispatch }) {
  const createClickHandler = name => e => {
    if (name !== selectedRoom) {
      dispatch({ type: 'ws/select', name })
    }
  }

  return (
    <Select>
      <Option
        onClick={createClickHandler(null)}
        active={!selectedRoom}
      >None</Option>
      { rooms.map(room => (
        <Option
          active={room.key === selectedRoom}
          key={room.key}
          onClick={createClickHandler(room.key)}
        >
          {room.name}
        </Option>
      )) }
    </Select>
  )
}

const Admin = connect(
  composeSelectors(selectRooms, selectSelectedRoom)
)(AdminView)

export default Admin
