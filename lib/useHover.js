import {useState} from "react"
import useEventListener from "~/lib/useEventListener"

function useHover(ref) {
  const [isHovered, setIsHovered] = useState(false)
  const hoverIn = e => {
    e.stopImmediatePropagation()
    setIsHovered(true)
  }
  const hoverOut = e => {
    e.stopImmediatePropagation()
    setIsHovered(false)
  }

  useEventListener(ref, "touchstart", hoverIn, {passive: true})
  useEventListener(ref, "touchend", hoverOut, {passive: true})
  useEventListener(ref, "mouseover", hoverIn)
  useEventListener(ref, "mouseout", hoverOut)

  return isHovered
}
export default useHover
