import {useRef, useLayoutEffect} from "react"

function useBoundingRect(ref) {
  const boundingRect = useRef(ref.current ? ref.current.getBoundingClientRect() : null)
  useLayoutEffect(() => {
    if (ref.current) {
      boundingRect.current = ref.current.getBoundingClientRect()
    }
  })

  return boundingRect.current
}

export default useBoundingRect
