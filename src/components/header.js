import React from 'react'
import styled from 'styled-components'
import url from 'file-loader!../../CV.pdf'

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
      <Link href={url} target='_blank'>CV</Link>
      <Link href='https://github.com/jeetiss' target='_blank'>github</Link>
      <Link href='https://twitter.com/jeetiss' target='_blank'>twitter</Link>
    </Links>
  )
}
