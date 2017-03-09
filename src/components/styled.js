import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;

  transition: opacity .35s ease;

  padding-bottom: 10px;

  &:last-child {
    padding-bottom: 0;
  }
`

export const Input = styled.input`
  flex: 1 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #555;
  border-radius: 2px;

  transition: visibility .35s ease,
    opacity .35s ease;

  &:active, &:focus {
    border: 1px solid #000;
  }
`

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #fff;
  color: #555;
  border: 1px solid #555;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color .35s ease;
  margin-left: 10px;

  &:hover {
    background-color: #eee;
  }

  &:active {
    transform: translateY(2px)
  }
`

export const AllCenter = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
