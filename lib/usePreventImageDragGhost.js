import {useEffect} from "react"

function usePreventImageDragGhost() {
  useEffect(() => {
    const mousedown = e => e.target instanceof Image && e.preventDefault()
    document.addEventListener("mousedown", mousedown)
    return () => document.removeEventListener("mousedown", mousedown)
  }, [])
}

export default usePreventImageDragGhost
