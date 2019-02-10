import {useEffect} from "react"
import styled, {ThemeProvider, keyframes} from "styled-components"
import win95Theme from "~/lib/win95Theme"
import cursorLoadAnimation from "~/lib/cursorLoadAnimation"
import Desktop from "~/components/Desktop"
import TaskManager from "~/components/TaskManager"
import useMouseButtonIdentifier from "~/lib/useMouseButtonIdentifier"
import usePreventImageDragGhost from "~/lib/usePreventImageDragGhost"

const Windows95 = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${win95Theme.colors.teal};
  color: ${win95Theme.colors.gray[3]};
  overflow: hidden;
  font-family: ${win95Theme.fontFamilies.default};
  font-size: ${win95Theme.fontSizes[0]};
  user-select: none;
  cursor: ${win95Theme.cursors.default};
  cursor: ${win95Theme.cursors.webkitDefault};
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;

  * {
    cursor: inherit;
  }

  img {
    image-rendering: pixelated;
  }

  .isLoadingApplication & {
    animation: ${cursorLoadAnimation} 2s;
  }
`

const Index = () => {
  useMouseButtonIdentifier()
  usePreventImageDragGhost()

  return (
    <Windows95>
      <ThemeProvider theme={win95Theme}>
        <TaskManager>
          <Desktop />
        </TaskManager>
      </ThemeProvider>
    </Windows95>
  )
}

export default Index
