import {useEffect} from "react"
import Head from "next/head"
import styled, {createGlobalStyle, ThemeProvider} from "styled-components"
import win95Theme from "~/lib/win95Theme"
import cursorLoadAnimation from "~/lib/cursorLoadAnimation"
import useMouseButtons from "~/lib/useMouseButtons"
import usePreventImageDragGhost from "~/lib/usePreventImageDragGhost"
import Desktop from "~/components/Desktop"
import TaskManager from "~/components/TaskManager"

const GlobalStyles = createGlobalStyle`
  * { 
    box-sizing: border-box; 
    cursor: inherit;
  }

  body {
    margin: 0;
    overflow: hidden;
  }

  button {
    font-size: ${(props) => props.theme.fontSizes[0]};
  }

  img {
    image-rendering: pixelated;
  }
`

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
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;

  .isLoadingApplication & {
    animation: ${cursorLoadAnimation} 2s;
  }
`

const Index = () => {
  usePreventImageDragGhost()
  const {isLeftClicking, isRightClicking, isMiddleClicking} = useMouseButtons()
  useEffect(() => {
    if (typeof document !== "undefined") {
      isLeftClicking && document.body.classList.add("isLeftClicking")
      isRightClicking && document.body.classList.add("isRightClicking")
      isMiddleClicking && document.body.classList.add("isMiddleClicking")

      return () => {
        document.body.classList.remove("isLeftClicking", "isMiddleClicking", "isRightClicking")
      }
    }
  }, [isLeftClicking, isRightClicking, isMiddleClicking])

  return (
    <Windows95>
      <Head>
        <title>Windows 95</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <style
          dangerouslySetInnerHTML={{
            __html: win95Theme.fontFaces["MS Sans Serif"]
          }}
        />
      </Head>
      <ThemeProvider theme={win95Theme}>
        <GlobalStyles />
        <TaskManager>
          <Desktop />
        </TaskManager>
      </ThemeProvider>
    </Windows95>
  )
}

export default Index
