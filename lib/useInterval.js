import {useEffect} from "react"

export default function useInterval(callback, time, inputs = []) {
  useEffect(() => {
    const interval = setInterval(callback, time)
    return () => clearInterval(interval)
  }, inputs)
}
