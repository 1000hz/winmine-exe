import React, {useCallback} from "react"
import styled from "styled-components"
import DesktopIcon from "~/components/_ui/DesktopIcon"
import Taskbar from "~/components/_ui/Taskbar/Taskbar"
import Minesweeper from "~/components/Minesweeper"
import About from "~/components/About"
import useEventListener from "~/lib/useEventListener"
import {useTaskManager} from "~/lib/useTaskManager"

const StyledDesktop = styled.div`
  display: grid;
  grid-auto-columns: 64px;
  grid-auto-rows: 64px;
  padding: 2px 4px;
`

const appShortcuts = [Minesweeper, About]

const Desktop = ({children}) => {
  const {tasks, createTask} = useTaskManager()
  useEventListener("contextmenu", useCallback(e => e.preventDefault(), []))

  return (
    <>
      <StyledDesktop>
        {appShortcuts.map((app, id) => <DesktopIcon key={id} application={app} />)}
        {Object.values(tasks).map(task => (
          <task.application.AppComponent key={task.id} {...task} />
        ))}
      </StyledDesktop>
      <Taskbar tasks={tasks} />
    </>
  )
}

export default Desktop
