import React from 'react'
import AnimatedText from './animatedtext'
import styled from 'styled-components'

const Body = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px 0 10px 0;
`

const Item = styled.div`
  color: ${props => props.theme.colors.second};
  font-size: 10px;
`

export const Message = ({ text, name, time, animated, onAnimationEnd }) => (
  <Body>
    { name ? <Header>
      <Item>{ name }</Item>
    </Header>
    : ''
    }
    <AnimatedText
      text={text}
      animated={animated}
      onAnimationEnd={onAnimationEnd}
    />
  </Body>
)
