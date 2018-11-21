import {useEffect} from "react"

export default function useTimeout(callback, time, inputs = []) {
  useEffect(() => {
    const timeout = setTimeout(callback, time)
    return () => clearTimeout(timeout)
  }, inputs)
}
