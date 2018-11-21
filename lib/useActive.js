import {useState, useEffect} from "react"

export default function useActive(ref) {
  const [isActive, setIsActive] = useState(false)
  useEffect(
    () => {
      const onMouseDown = e => {
        if (e.button === 0) {
          setIsActive(true)
          document.addEventListener("mouseup", onMouseUp)
        }
      }

      const onMouseUp = e => {
        setIsActive(false)
        document.removeEventListener("mouseup", onMouseUp)
      }

      ref.current.addEventListener("mousedown", onMouseDown)

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("mousedown", onMouseDown)
        }
      }
    },
    [ref.current]
  )

  return isActive
}
