import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;

  transition: opacity .35s ease,
    visibility .35s ease,
    transform .35s ease;

  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transform: ${props => props.visible ? 'translateY(0px)' : 'translateY(100px)'};

  padding-bottom: 10px;

  &:last-child {
    padding-bottom: 0;
  }
`

export const Input = styled.input`
  flex: 1 1;
  padding: 10px;
  font-size: 14px;
  background-color: ${props => props.theme.colors.back};
  color: ${props => props.theme.colors.main};
  border: 1px solid ${props => props.theme.colors.main};
  border-radius: 2px;

  transition: visibility .35s ease,
    opacity .35s ease;

  &:active, &:focus {
    border: 1px solid ${props => props.theme.colors.main};
  }
`

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.back};
  color: ${props => props.theme.colors.main};
  border: 1px solid ${props => props.theme.colors.main};
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color .35s ease;
  margin-left: 10px;

  &:hover {
    background-color: ${props => props.theme.colors.active};
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
