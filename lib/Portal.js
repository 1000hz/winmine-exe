import {useRef, useMutationEffect} from "react"
import {createPortal} from "react-dom"

const Portal = ({parent = document.body, children}) => {
  const node = useRef(document.createElement("div"))

  useMutationEffect(
    () => {
      parent && parent.appendChild(node.current)
      return () => {
        parent && parent.removeChild(node.current)
      }
    },
    [parent]
  )

  return createPortal(children, node.current)
}

export default Portal
