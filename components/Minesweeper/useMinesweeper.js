import {useReducer} from "react"
import useInterval from "~/lib/useInterval"
import {reducer, defaultState} from "./reducer"

const useMinesweeper = settings => {
  const [state, dispatch] = useReducer(reducer, defaultState, {
    type: "NEW_GAME",
    payload: {settings}
  })

  useInterval(() => dispatch({type: "UPDATE_TIME"}), 1000, [])

  const handlers = {
    onSquareMouseUp: id => e => {
      if (e.button === 0) {
        dispatch({type: "REVEAL_SQUARE", payload: {id}})
      }
    },
    onSquareContextMenu: id => e => {
      dispatch({type: "TOGGLE_FLAG", payload: {id}})
    },
    onSmileyButtonClick: e => {
      dispatch({type: "NEW_GAME", payload: {settings}})
    }
  }

  return {state, handlers}
}

export default useMinesweeper
