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
      <Link href='https://docs.google.com/document/d/1_85mQcwYpuIGWBTOVnNIgKlwoaYn0bLR4ovVUH-S9VA/edit?usp=sharing' target='_blank'>CV</Link>
      <Link href='https://github.com/jeetiss' target='_blank'>github</Link>
      <Link href='https://twitter.com/jeetiss' target='_blank'>twitter</Link>
    </Links>
  )
}
