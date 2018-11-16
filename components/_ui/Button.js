import styled, {css} from "styled-components"

const Button = styled.button.attrs({
  type: "button"
})`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px;
  padding: 6px;
  font-family: ${props => props.theme.fontFamilies.default};
  font-size: ${props => props.theme.fontSizes[0]};
  background: ${props => props.theme.colors.gray[2]};
  border: 1px solid ${props => props.theme.colors.gray[3]};
  border-right-color: ${props => props.theme.colors.gray[0]};
  border-bottom-color: ${props => props.theme.colors.gray[0]};
  box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[1]};
  outline: none;
  position: relative;

  & + & {
    margin-left: 0;
  }

  :focus {
    border: 1px solid ${props => props.theme.colors.gray[0]};
    box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[0]},
      inset 1px 1px 0 ${props => props.theme.colors.gray[3]}, inset -2px -2px 0 ${props => props.theme.colors.gray[1]};
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

  :active {
    border: 1px solid ${props => props.theme.colors.gray[0]};
    box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[1]};
    padding-top: 7px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    vertical-align: top;
  }

  :disabled {
    color: ${props => props.theme.colors.gray[1]};
  }
`

export default Button
