import {useState, useEffect} from "react"

function useAudio(src) {
  if (typeof Audio !== "undefined") {
    const [audio, setAudio] = useState(new Audio(src))
    useEffect(() => setAudio(new Audio(src)), [src])
    return audio
  } else
    return {
      play() {},
      pause() {}
    }
}

export default useAudio
