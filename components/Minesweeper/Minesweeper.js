import {useState, useMemo, useCallback} from "react"
import styled from "styled-components"
import Window from "~/components/_ui/Window"
import Board from "./Board"
import SmileyButton from "./SmileyButton"
import Square from "./Square"
import SevenSegmentDisplay from "./SevenSegmentDisplay"
import useMinesweeper from "./useMinesweeper"

const Well = styled.div`
  background: ${props => props.theme.colors.gray[2]};
  border: ${props => props.depth}px solid
    ${props => (props.outset ? props.theme.colors.gray[3] : props.theme.colors.gray[1])};
  border-right-color: ${props =>
    props.outset ? props.theme.colors.gray[1] : props.theme.colors.gray[3]};
  border-bottom-color: ${props =>
    props.outset ? props.theme.colors.gray[1] : props.theme.colors.gray[3]};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`

const StatusWell = styled(Well)`
  display: flex;
  justify-content: space-between;
`

const Settings = {
  EASY: {
    height: 8,
    width: 8,
    mineCount: 10
  },
  INTERMEDIATE: {
    height: 16,
    width: 16,
    mineCount: 40
  },
  EXPERT: {
    height: 16,
    width: 30,
    mineCount: 99
  }
}

const Minesweeper = () => {
  const [settings, setSettings] = useState(Settings.EASY)
  const {state, handlers, clickTarget} = useMinesweeper(settings)
  const {squares, revealed, exploded, won, flags, questions, time} = state
  const flagCount = useMemo(() => flags.filter(_ => _).length, [flags])

  return (
    <Window
      title="Minesweeper"
      icon={require("./images/icon-sm.png")}
      x={300}
      y={200}
      menuItems={["Game", "Help"]}
    >
      <Well outset depth={3} margin="0 2px 0 0" onMouseDown={handlers.onGameMouseDown}>
        <StatusWell depth={2} margin="6px" padding="4px 7px 4px 5px">
          <SevenSegmentDisplay value={settings.mineCount - flagCount} />
          <SmileyButton
            onMouseDown={handlers.onSmileyButtonMouseDown}
            onClick={handlers.onSmileyButtonClick}
            isClicking={clickTarget}
            exploded={exploded}
            won={won}
          />
          <SevenSegmentDisplay value={time} />
        </StatusWell>
        <Well depth={3} margin="6px">
          <Board width={settings.width} height={settings.height} clickTarget={clickTarget}>
            {squares.map((square, i) => (
              <Square
                key={i}
                square={square}
                disabled={exploded || won}
                exploded={i === exploded}
                revealed={revealed[i]}
                flag={flags[i]}
                question={questions[i]}
                isClicking={clickTarget === "Square"}
                onMouseDown={useCallback(handlers.onSquareMouseDown(i))}
                onMouseUp={useCallback(handlers.onSquareMouseUp(i))}
                onContextMenu={useCallback(handlers.onSquareContextMenu(i))}
              />
            ))}
          </Board>
        </Well>
      </Well>
    </Window>
  )
}

export default Minesweeper
