import {useState} from "react"
import useInterval from "~/lib/useInterval"

export default function useSystemTime() {
  const [time, setTime] = useState(new Date())
  useInterval(() => setTime(new Date()), 1000, [])

  return time
}
