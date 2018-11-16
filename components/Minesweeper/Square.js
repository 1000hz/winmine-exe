import React from "react"
import styled, {css} from "styled-components"
import Flag from "./flag"

export const squareSize = 16

export const borderStyles = {
  initial: css`
    border: 1px solid ${props => props.theme.colors.gray[3]};
    border-right-color: ${props => props.theme.colors.gray[0]};
    border-bottom-color: ${props => props.theme.colors.gray[0]};
    box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[1]};
  `,
  clicked: css`
    border: 1px dotted ${props => props.theme.colors.gray[0]};
    border-right: none;
    border-bottom: none;
  `
}

const StyledSquare = styled.button.attrs({
  type: "button",
  className: "Square"
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${squareSize}px;
  height: ${squareSize}px;
  padding: 0;
  cursor: ${props => (props.clicked ? "initial" : "pointer")};
  background-color: ${props => (props.exploded ? props.theme.colors.red : props.theme.colors.gray[2])};
  ${props => (props.clicked ? borderStyles.clicked : borderStyles.initial)};
  line-height: 1;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  outline: none;
  user-select: none;
`

const Square = ({onClick, onContextMenu, flag, clicked, exploded, children}) => {
  return (
    <StyledSquare onMouseUp={onClick} onContextMenu={onContextMenu} clicked={clicked} exploded={exploded}>
      {clicked ? children : flag ? <Flag /> : undefined}
    </StyledSquare>
  )
}

export default Square
