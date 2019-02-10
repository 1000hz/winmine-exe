import {useReducer, useEffect, useLayoutEffect, useRef} from "react"
import useEventListener from "~/lib/useEventListener"

const noop = () => {}

function useDraggable(handleRef, {onDragStart = noop, onDragUpdate = noop, onDragEnd = noop} = {}) {
  const defaultState = {
    isDragging: false,
    startPosition: null,
    delta: null
  }

  const reducer = (state, action) => {
    const {pageX: x, pageY: y} = action.payload

    switch (action.type) {
      case "DRAG_START": {
        return {
          ...state,
          startPosition: {x, y},
          delta: {x: 0, y: 0}
        }
      }
      case "DRAG_UPDATE": {
        if (state.startPosition === null) {
          return state
        }
        const delta = {x: x - state.startPosition.x, y: y - state.startPosition.y}

        return {
          ...state,
          delta,
          isDragging: true
        }
      }
      case "DRAG_END": {
        return defaultState
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState)

  const mousedown = e => {
    if (
      (e.button === 0 || (e.touches && e.touches.length === 1)) &&
      e.target === handleRef.current
    ) {
      dispatch({type: "DRAG_START", payload: e})
      onDragStart(state)
    }
  }

  const mousemove = e => {
    if (state.startPosition !== null) {
      e.preventDefault()
      const payload = e.touches ? e.touches[0] : e
      dispatch({type: "DRAG_UPDATE", payload})
      onDragUpdate(state)
    }
  }

  const mouseup = e => {
    if (state.startPosition !== null) {
      onDragEnd(state)
      dispatch({type: "DRAG_END", payload: e})
    }
  }

  useEventListener(handleRef, "mousedown", mousedown)
  useEventListener(handleRef, "touchstart", mousedown, {passive: true})
  useEventListener(document, "mousemove", mousemove)
  useEventListener(document, "touchmove", mousemove, {passive: false})
  useEventListener(document, "mouseup", mouseup)
  useEventListener(document, "touchend", mouseup)

  return state
}

export default useDraggable
