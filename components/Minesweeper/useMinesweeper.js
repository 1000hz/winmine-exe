import {useState, useRef, useEffect, useReducer, useCallback} from "react"
import useTimeout from "~/lib/useTimeout"
import {reducer, defaultState} from "./reducer"

const useMinesweeper = settings => {
  const [state, dispatch] = useReducer(reducer, defaultState, {
    type: "NEW_GAME",
    payload: {settings}
  })

  const {started, revealed, flags, exploded, won, time} = state

  useTimeout(
    () => {
      if (started && !exploded && !won) {
        dispatch({type: "UPDATE_TIME"})
      }
    },
    1000,
    [time, started, exploded, won]
  )

  const [clickTarget, setClickTarget] = useState(null)
  useEffect(() => {
    document.addEventListener("mouseup", e => setClickTarget(null))
  }, [])

  const handlers = {
    onSquareMouseDown: id => e => {
      e.stopPropagation()
      if (e.button === 0) {
        setClickTarget("Square")
      }
    },
    onSquareMouseUp: id => e => {
      if (clickTarget === "Square" && e.button === 0) {
        dispatch({type: "REVEAL_SQUARE", payload: {id}})
      }
    },
    onSquareContextMenu: id => e => {
      e.preventDefault()
      dispatch({type: "TOGGLE_FLAG", payload: {id}})
    },
    onGameMouseDown: e => {
      setClickTarget("Game")
    },
    onSmileyButtonMouseDown: e => {
      e.stopPropagation()
    },
    onSmileyButtonClick: e => {
      dispatch({type: "NEW_GAME", payload: {settings}})
    }
  }

  return {
    state,
    handlers,
    clickTarget
  }
}

export default useMinesweeper
