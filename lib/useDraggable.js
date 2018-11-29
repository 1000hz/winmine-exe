import {useReducer, useEffect, useMutationEffect, useRef} from "react"

const noop = () => {}

function useDraggable(handleRef, {onDragStart = noop, onDragUpdate = noop, onDragEnd = noop} = {}) {
  const delta = useRef({x: null, y: null})
  const defaultState = {
    isDragging: false,
    startPosition: null,
    delta
  }

  const reducer = (state, action) => {
    const {pageX: x, pageY: y} = action.payload
    switch (action.type) {
      case "DRAG_START": {
        delta.current = {x: 0, y: 0}
        return {
          ...state,
          startPosition: {x, y}
        }
      }
      case "DRAG_UPDATE": {
        delta.current = {x: x - state.startPosition.x, y: y - state.startPosition.y}
        return state.isDragging
          ? state
          : {
              ...state,
              isDragging: true
            }
      }
      case "DRAG_END": {
        delta.current = {x: null, y: null}
        return defaultState
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(
    () => {
      if (handleRef.current) {
        const mousedown = e => {
          if (
            (e.button === 0 || (e.touches && e.touches.length === 1)) &&
            e.target === handleRef.current
          ) {
            dispatch({type: "DRAG_START", payload: e})
            onDragStart({...state, delta: delta.current})
          }
        }

        handleRef.current.addEventListener("mousedown", mousedown)
        handleRef.current.addEventListener("touchstart", mousedown, {passive: true})
        return () => {
          handleRef.current.removeEventListener("mousedown", mousedown)
          handleRef.current.removeEventListener("touchstart", mousedown)
        }
      }
    },
    [handleRef.current]
  )

  useMutationEffect(
    () => {
      const mousemove = e => {
        if (state.startPosition !== null) {
          e.preventDefault()
          const payload = e.touches ? e.touches[0] : e
          dispatch({type: "DRAG_UPDATE", payload})
          onDragUpdate({...state, delta: delta.current})
        }
      }

      const mouseup = e => {
        if (state.startPosition !== null) {
          onDragEnd({...state, delta: delta.current})
          dispatch({type: "DRAG_END", payload: e})
          document.removeEventListener("mousemove", mousemove)
          document.removeEventListener("touchmove", mousemove)
          document.removeEventListener("mouseup", mouseup)
          document.removeEventListener("touchend", mouseup)
        }
      }

      document.addEventListener("mousemove", mousemove)
      document.addEventListener("touchmove", mousemove, {passive: false})
      document.addEventListener("mouseup", mouseup)
      document.addEventListener("touchend", mouseup)
      return () => {
        document.removeEventListener("mousemove", mousemove)
        document.removeEventListener("touchmove", mousemove)
        document.removeEventListener("mouseup", mouseup)
        document.removeEventListener("touchend", mouseup)
      }
    },
    [state.startPosition]
  )

  return {
    ...state,
    delta: delta.current
  }
}

export default useDraggable
