import styled, { css } from 'styled-components'

export const Container = styled.div`
  background-color: #f2f2f230;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InputDiv = styled.div`
  position: relative;
  padding: 24px 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    font-family: 'Roboto';
    font-size: 16px;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

export const StyledInput = styled.input`
  position: absolute;
  border: none;
  outline: none;
  background: none;
  width: 100%;
`

export const StyledChosed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const AnimatedDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 0;
  ${props => props.focused && css`
    width: 100%;
  `}
  height: 2px;
  background-color: #DCE775;
  transition: width 0.2s linear;
`
