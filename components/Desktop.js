import React from "react"
import styled, {ThemeProvider} from "styled-components"
import win95Theme from "~/lib/win95Theme"
import useEventListener from "~/lib/useEventListener"
import Taskbar from "~/components/_ui/Taskbar"
import {useActiveClickClassname} from "~/lib/useActiveClickClassname"

const StyledDesktop = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.colors.teal};
  color: ${props => props.theme.colors.gray[3]};
  overflow: hidden;
  font-family: ${props => props.theme.fontFamilies.default};
  font-size: ${props => props.theme.fontSizes[0]};
  user-select: none;
  cursor: ${props => props.theme.cursors.default};
  -webkit-font-smoothing: none;

  * {
    cursor: inherit;
  }

  img {
    pointer-events: none;
    image-rendering: pixelated;
  }
`

const Desktop = ({children}) => {
  useEventListener("contextmenu", e => e.preventDefault())
  useActiveClickClassname("win95-activeClick")

  return (
    <ThemeProvider theme={win95Theme}>
      <StyledDesktop>
        {children}
        <Taskbar />
      </StyledDesktop>
    </ThemeProvider>
  )
}
export default Desktop
