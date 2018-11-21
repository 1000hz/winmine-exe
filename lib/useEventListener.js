import {useEffect} from "react"

export function useEventListener(event, listener, capture, inputs = []) {
  useEffect(
    () => {
      document.addEventListener(event, listener, capture)
      return () => document.removeEventListener(event, listener)
    },
    [event, listener, capture, ...inputs]
  )
}

export default useEventListener
