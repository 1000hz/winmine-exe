import {useState, useCallback} from "react"
import styled from "styled-components"
import Window from "~/components/_ui/Window"
import Board from "./Board"
import Square from "./Square"
import Mine from "./mine"
import SevenSegmentDisplay from "./SevenSegmentDisplay"
import * as models from "~/components/Minesweeper/models"

const Well = styled.div`
  background: ${props => props.theme.colors.gray[2]};
  border: ${props => props.depth}px solid
    ${props => (props.outset ? props.theme.colors.gray[3] : props.theme.colors.gray[1])};
  border-right-color: ${props => (props.outset ? props.theme.colors.gray[1] : props.theme.colors.gray[3])};
  border-bottom-color: ${props => (props.outset ? props.theme.colors.gray[1] : props.theme.colors.gray[3])};
  margin: ${props => props.margin};
`

const Minesweeper = ({size}) => {
  const [exploded, setExploded] = useState(null)
  const [board, setBoard] = useState(new models.Board(size, size, 10))
  const [flagged, setFlagged] = useState([].fill(false))
  const [clicked, setClicked] = useState([].fill(false))

  const onClick = key => e => {
    if (exploded || e.button !== 0) {
      return false
    }

    const square = board.squares[key]
    setClicked(clicked => {
      clicked[key] = true
      if (square.mine) {
        setExploded(key)
        board.squares.filter(square => square.mine).forEach(mine => (clicked[mine.id] = true))
      } else {
        const visited = [square]
        while (visited.length) {
          const current = visited.shift()
          if (current.surroundingMines === 0) {
            current.neighbors.forEach(neighbor => {
              !clicked[neighbor.id] && visited.push(neighbor)
              clicked[neighbor.id] = true
            })
            clicked[current.id] = true
          }
        }
      }

      return clicked
    })
  }

  const onContextMenu = key => e => {
    e.preventDefault()
    setFlagged(flagged => {
      flagged[key] = !flagged[key]
      return flagged
    })
  }

  return (
    <Window title="Minesweeper" icon="/static/minesweeper_sm.png" x={300} y={200} menuItems={["Game", "Help"]}>
      <Well outset depth={3} margin="0 2px 0 0">
        <Well depth={2} margin="6px">
          <SevenSegmentDisplay value="000" />
        </Well>
        <Well depth={3} margin="6px">
          <Board width={size} height={size}>
            {board.squares.map((square, i) => (
              <Square
                square={square}
                key={i}
                exploded={i === exploded}
                onClick={useCallback(onClick(i))}
                onContextMenu={useCallback(onContextMenu(i))}
                clicked={clicked[i]}
                flag={flagged[i]}
              >
                {square.mine ? <Mine /> : square.surroundingMines ? square.surroundingMines : ""}
              </Square>
            ))}
          </Board>
        </Well>
      </Well>
    </Window>
  )
}

export default Minesweeper
