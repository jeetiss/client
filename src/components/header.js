import React from 'react'
import styled from 'styled-components'

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Link = styled.a`
  color: ${props => props.theme.colors.second};
  margin-left: 10px;

  &:hover {
    color: ${props => props.theme.colors.main};
  }

  &:first-child {
    margin-left: 0px;
  }
`

export default function Header () {
  return (
    <Links>
      <Link href>CV</Link>
      <Link href>github</Link>
      <Link href>twitter</Link>
    </Links>
  )
}
