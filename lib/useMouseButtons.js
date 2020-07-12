import {useState} from "react"
import useEventListener from "./useEventListener"

function useMouseButtons(target = globalThis) {
  const [buttons, setButtons] = useState(0)
  useEventListener(target, "mousedown", e => setButtons(e.buttons))
  useEventListener(globalThis, "mouseup", e => setButtons(e.buttons))

  return {
    isLeftClicking: Boolean(buttons & 1),
    isRightClicking: Boolean(buttons & 2),
    isMiddleClicking: Boolean(buttons & 4)
  }
}

export default useMouseButtons
