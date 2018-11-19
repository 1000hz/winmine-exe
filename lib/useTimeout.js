import {useEffect} from "react"

export default function useTimeout(callback, time, deps = []) {
  useEffect(() => {
    const timeout = setTimeout(callback, time)
    return () => clearTimeout(timeout)
  }, deps)
}
