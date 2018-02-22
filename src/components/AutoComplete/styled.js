import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  > :last-child {
    margin-left: 15px;
  }
`

export const AutoCompleteContainer = styled.div`
  background-color: #f8f8f830;
  position: relative;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px, rgba(0, 0, 0, 0.16) 0px 3px 10px;
`

export const StyledInput = styled.input`
  border: none;
  outline: none;
`

export const MenuItemsContainer = styled.div`
  position: absolute;
  background-color: #000000b3;
  width: 100%;
`

export const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  cursor: pointer;
`

export const MenuItemContainer = StyledItem.extend`
  color: white;
  font-weight: 300;
  cursor: pointer;
  background-color: ${props => props.hovered && '#00000066'};
`

export const Color = styled.div`
  height: inherit;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: ${props => '#' + props.color};
`