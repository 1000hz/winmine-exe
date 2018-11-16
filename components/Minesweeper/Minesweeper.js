import {useState, useCallback} from "react"

// game components
import Board from "./Board"
import Square from "./_Square"
import Mine from "./mine"
import SevenSegmentDisplay from "./SevenSegmentDisplay"
import * as models from "~/components/Minesweeper/models"
import useAudio from "~/lib/useAudio"

const Minesweeper = ({size}) => {
  const [exploded, setExploded] = useState(null)
  const [board, setBoard] = useState(new models.Board(size, size, 10))
  const [flagged, setFlagged] = useState([].fill(false))
  const [clicked, setClicked] = useState([].fill(false))

  const onClick = key => e => {
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
  const audio = useAudio("/static/startup.mp3")
  return (
    <>
      <SevenSegmentDisplay value="000" />
      <button onClick={() => (audio.paused ? audio.play() : audio.load())}>ENO</button>
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
    </>
  )
}

export default Minesweeper
