import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Container = styled.div`
  flex: 0 1 960px;
`

export const CenteredDiv = ({ children }) => (
  <Wrap>
    <Container>
      { children }
    </Container>
  </Wrap>
)
