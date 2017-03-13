import React from 'react'
import styled, { keyframes } from 'styled-components'
import { AllCenter } from './styled'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`

const color = keyframes`
  100%,
  0% {
    stroke: ${props => props.theme.colors.main};
  }
  50% {
    stroke: ${props => props.theme.colors.second};
  }
`

const LoaderWraper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`

const Svg = styled.svg`
  position: absolute;
  animation: ${rotate} 2s linear infinite;
  transform-origin: center center;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const Circle = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite,
    ${color} 6s ease-in-out infinite;
  stroke-linecap: round;
`

export default function Loader () {
  return (
    <AllCenter>
      <LoaderWraper>
        <Svg viewBox='25 25 50 50'>
          <Circle cx='50' cy='50' r='20' fill='none'
            stroke-width='2' stroke-miterlimit='10'
          />
        </Svg>
      </LoaderWraper>
    </AllCenter>
  )
}
