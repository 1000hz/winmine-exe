import {useState, useEffect} from "react"
import useEventListener from "~/lib/useEventListener"

const ancestors = element => {
  const ancestors = []
  while (element.parentElement !== null) {
    element = element.parentElement
    ancestors.push(element)
  }
  return ancestors
}

export function useActiveClickClassname(classname) {
  const [element, setElement] = useState(null)
  useEventListener("mousedown", e => e.button === 0 && setElement(e.target))
  useEventListener("mouseover", e => element && setElement(e.target))
  useEventListener("mouseup", e => element && setElement(null))

  useEffect(
    () => {
      if (element) {
        element.classList.add(classname, `${classname}--target`)
        ancestors(element).map(ancestor => ancestor.classList.add(classname))

        return () => {
          element.classList.remove(classname, `${classname}--target`)
          ancestors(element).map(ancestor => ancestor.classList.remove(classname))
        }
      }
    },
    [element]
  )
}
