import styled from "styled-components"

const Button = styled.button.attrs({
  type: "button"
})`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  vertical-align: top;
  height: 23px;
  margin: 6px;
  padding: 6px 10px 8px 9px;
  font-family: ${props => props.theme.fontFamilies.default};
  font-size: ${props => props.theme.fontSizes[0]};
  background: ${props => props.theme.colors.gray[2]};
  border: 0;
  box-shadow: inset -1px -1px ${props => props.theme.colors.gray[0]},
    inset 1px 1px ${props => props.theme.colors.gray[3]},
    inset -2px -2px ${props => props.theme.colors.gray[1]};
  outline: 0;

  & + & {
    margin-left: 0;
  }

  :focus {
    box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[0]},
      inset -2px -2px ${props => props.theme.colors.gray[0]},
      inset 2px 2px ${props => props.theme.colors.gray[3]},
      inset -3px -3px ${props => props.theme.colors.gray[1]};
  }

  :focus:after {
    content: "";
    display: block;
    position: absolute;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
    border: 1px dotted ${props => props.theme.colors.gray[0]};
  }

  .isLeftClicking &:active:hover {
    box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[0]},
      inset 0 0 0 2px ${props => props.theme.colors.gray[1]};
    padding: 7px 9px 7px 10px;
  }

  :disabled {
    color: ${props => props.theme.colors.gray[1]};
  }
`

export default Button
