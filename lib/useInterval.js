import {useEffect} from "react"

export default function useInterval(callback, time, deps = []) {
  useEffect(() => {
    const interval = setInterval(callback, time)
    return () => clearInterval(interval)
  }, deps)
}
