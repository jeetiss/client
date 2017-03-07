import React from 'react'
import styled, { keyframes } from 'styled-components'
import { AllCenter } from './styled'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Circle = styled.div`
  height: 20px;
  width: 20px;
  background-color: #b1b1b1;
  border-radius: 50%;
`

const elements = 2
const dur = 2.5
const delay = dur / elements

const Area = styled.div`
  display: flex;
  position: absolute;
  height: 100px;
  width: 100px;
  align-items: flex-start;
  justify-content: center;
  animation: ${rotate360} ${dur}s ease-in-out infinite; 
`

const Box = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
`


export default function Loader () {
  return (
    <AllCenter>
      <Box>
        { Array(elements).fill(0).map((val, idx) => (
          <Area style={{animationDelay: `${delay * idx}s`}} key={idx}>
            <Circle />
          </Area>
        )) }
      </Box>
    </AllCenter>
  )
}
