import {useReducer} from "react"
import useInterval from "~/lib/useInterval"
import {reducer, defaultState} from "./reducer"

const useMinesweeper = settings => {
  const init = defaultState =>
    reducer(defaultState, {
      type: "NEW_GAME",
      payload: {settings}
    })

  const [state, dispatch] = useReducer(reducer, defaultState, init)

  useInterval(() => dispatch({type: "UPDATE_TIME"}), 1000, [])

  const handlers = {
    onSquareMouseUp: id => e => {
      if (e.button === 0) {
        e.buttons === 2
          ? dispatch({type: "REVEAL_BULK_SQUARES", payload: {id}})
          : dispatch({type: "REVEAL_SQUARE", payload: {id}})
      }

      if (e.button === 1 && e.buttons === 0) {
        dispatch({type: "REVEAL_BULK_SQUARES", payload: {id}})
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
