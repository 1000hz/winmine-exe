import React from "react"
import styled, {css} from "styled-components"
import {squareSize} from "./Board"
import {MineCount, Mine, Flag, Question, X} from "./Icons"

export const borderStyles = {
  initial: css`
    border: 0;
    box-shadow: inset -1px -1px ${props => props.theme.colors.gray[0]},
      inset 1px 1px ${props => props.theme.colors.gray[3]},
      inset -2px -2px ${props => props.theme.colors.gray[1]};
  `,
  pressed: css`
    border: 1px solid transparent;
    border-right: 1px dotted ${props => props.theme.colors.gray[0]};
    border-bottom: 1px dotted ${props => props.theme.colors.gray[0]};
    box-shadow: none;
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
  background-color: ${props =>
    props.exploded ? props.theme.colors.red : props.theme.colors.gray[2]};

  ${({pressed}) => (pressed ? borderStyles.pressed : borderStyles.initial)};

  line-height: 1;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  outline: 0;
  user-select: none;
`

const Square = React.memo(
  ({square, flag, question, pressed, revealed, exploded, disabled, ...props}) => {
    const child =
      disabled && flag && !square.mine ? (
        <X />
      ) : (flag && !revealed) || (flag && square.mine) ? (
        <Flag />
      ) : revealed && square.mine && !flag ? (
        <Mine />
      ) : revealed && square.surroundingMines ? (
        <MineCount value={square.surroundingMines} />
      ) : question ? (
        <Question />
      ) : (
        undefined
      )

    return (
      <StyledSquare
        {...props}
        pressed={((pressed || revealed) && !flag) || (disabled && flag && !square.mine)}
        flag={flag}
        exploded={exploded}
        disabled={disabled}
      >
        {child}
      </StyledSquare>
    )
  }
)

export default Square
