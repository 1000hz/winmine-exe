import {useEffect} from "react"

export function useEventListener(event, listener, capture, deps = []) {
  useEffect(
    () => {
      document.addEventListener(event, listener, capture)
      return () => document.removeEventListener(event, listener)
    },
    [event, listener, capture, ...deps]
  )
}

export default useEventListener
