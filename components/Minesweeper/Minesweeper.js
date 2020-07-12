import {useState, useEffect, useMemo, useRef} from "react"
import styled from "styled-components"
import useMouseButtons from "~/lib/useMouseButtons"
import Window from "~/components/_ui/Window/Window"
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
  const {state, handlers} = useMinesweeper(settings)
  const {squares, revealed, exploded, won, flags, questions, time} = state
  const flagCount = useMemo(() => flags.filter(_ => _).length, [flags])
  const gameRef = useRef(null)
  const [hoveredSquare, setHoveredSquare] = useState(null)
  const {isLeftClicking, isRightClicking, isMiddleClicking} = useMouseButtons(gameRef)
  const isChording = (isLeftClicking && isRightClicking) || isMiddleClicking

  useEffect(() => {
    setHoveredSquare(null)
  }, [squares, exploded, won])

  return (
    <Window
      title="Minesweeper"
      icon={require("./images/icon-sm.png")}
      x={300}
      y={200}
      menuItems={["Game", "Help"]}
    >
      <Well
        ref={gameRef}
        outset
        depth={3}
        margin="0 2px 0 0"
        onClick={hoveredSquare && handlers.onSquareMouseUp(hoveredSquare.id)}
        onAuxClick={hoveredSquare && handlers.onSquareMouseUp(hoveredSquare.id)}
      >
        <StatusWell depth={2} margin="6px" padding="4px 7px 4px 5px">
          <SevenSegmentDisplay value={settings.mineCount - flagCount} />
          <SmileyButton
            isClickingGame={isLeftClicking}
            exploded={exploded != null}
            won={won}
            onClick={handlers.onSmileyButtonClick}
          />
          <SevenSegmentDisplay value={time} />
        </StatusWell>
        <Well depth={3} margin="6px">
          <Board
            width={settings.width}
            height={settings.height}
            onMouseOut={e => setHoveredSquare(null)}
          >
            {squares.map((square, i) => (
              <Square
                key={i}
                square={square}
                disabled={exploded != null || won}
                exploded={exploded ? exploded.includes(i) : false}
                pressed={
                  ((isLeftClicking || isChording) && hoveredSquare === square) ||
                  (isChording && hoveredSquare?.neighbors.includes(square))
                }
                revealed={revealed[i]}
                flag={flags[i]}
                question={questions[i]}
                onMouseEnter={e => setHoveredSquare(square)}
                onContextMenu={
                  isLeftClicking || isChording ? undefined : handlers.onSquareContextMenu(i)
                }
              />
            ))}
          </Board>
        </Well>
      </Well>
    </Window>
  )
}

Minesweeper.title = "Minesweeper"
Minesweeper.iconSmall = require("./images/icon-sm.png")
Minesweeper.iconLarge = require("./images/icon-lg.png")
Minesweeper.singleton = true

export default Minesweeper
