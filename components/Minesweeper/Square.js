import React from "react"
import styled, {css} from "styled-components"
import Board, {squareSize} from "./Board"
import {MineCount, Mine, Flag, Question, X} from "./Icons"

export const borderStyles = {
  initial: css`
    border: 0;
    box-shadow: inset -1px -1px ${props => props.theme.colors.gray[0]},
      inset 1px 1px ${props => props.theme.colors.gray[3]},
      inset -2px -2px ${props => props.theme.colors.gray[1]};
  `,
  revealed: css`
    border: 1px solid transparent;
    border-right: 1px dotted ${props => props.theme.colors.gray[0]};
    border-bottom: 1px dotted ${props => props.theme.colors.gray[0]};
    box-shadow: none;
  `
}

const border = ({revealed}) => (revealed ? borderStyles.revealed : borderStyles.initial)

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
  background-color: ${props =>
    props.exploded ? props.theme.colors.red : props.theme.colors.gray[2]};
  ${border};
  line-height: 1;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  outline: none;
  user-select: none;

  ${Board}:active &:hover {
    ${({flag}) => (flag ? "" : borderStyles.revealed)};
  }
`

const Square = ({
  onMouseDown,
  onMouseUp,
  onContextMenu,
  square,
  flag,
  question,
  revealed,
  exploded,
  disabled
}) => {
  return (
    <StyledSquare
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onContextMenu={onContextMenu}
      revealed={revealed}
      exploded={exploded}
      disabled={disabled}
    >
      {revealed ? (
        square.mine ? (
          flag ? (
            <X />
          ) : (
            <Mine />
          )
        ) : (
          <MineCount value={square.surroundingMines} />
        )
      ) : flag ? (
        <Flag />
      ) : question ? (
        <Question />
      ) : (
        undefined
      )}
    </StyledSquare>
  )
}

export default Square
