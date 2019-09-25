import styled from "styled-components"

export const MenuBar = styled.div`
  display: flex;
`
export const MenuBarItem = styled.button.attrs({
  type: "button"
})`
  margin: 1px 0;
  padding: 3px 6px;
  color: ${props => props.theme.colors.gray[0]};
  background: ${props => props.theme.colors.gray[2]};
  border: 0;
  font-family: ${props => props.theme.fontFamilies.default};
  outline: 0;

  ${MenuBar}:focus-within &:hover:not(:disabled) {
    color: ${props => props.theme.colors.gray[3]};
    background: ${props => props.theme.colors.navy};
  }

  :disabled {
    color: ${props => props.theme.colors.gray[1]};
  }
`

export default MenuBar
