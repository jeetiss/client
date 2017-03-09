import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 0;
`

const Container = styled.div`
  flex: 0 1 690px;

  display: flex;
  flex-direction: column;
`

export const CenteredDiv = ({ children }) => (
  <Wrap>
    <Container>
      { children }
    </Container>
  </Wrap>
)
