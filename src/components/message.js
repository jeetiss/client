import React from 'react'
import styled from 'styled-components'

const Body = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex:
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px 0 10px 0;
`

const Item = styled.div`
  color: #a5a5a5;
  font-size: 10px;
`

export const Message = ({ text, name, time }) => (
  <Body>
    { name ? <Header>
      <Item>{ name }</Item>
    </Header>
    : ''
    }
    <div> { text } </div>
  </Body>
)
