import React from "react"
import styled from "styled-components"
import {IconWithLabel, ApplicationIcon} from "~/components/_ui/DesktopIcon"
import Taskbar from "~/components/_ui/Taskbar/Taskbar"
import Minesweeper from "~/components/Minesweeper"
import About from "~/components/About"
import useEventListener from "~/lib/useEventListener"
import {useTaskManager} from "~/lib/useTaskManager"

const StyledDesktop = styled.div`
  display: grid;
  grid-auto-columns: 75px;
  grid-auto-rows: 75px;
  padding: 4px 0;
`

const icons = (
  <>
    <ApplicationIcon application={Minesweeper} />
    <ApplicationIcon application={About} />
    <IconWithLabel
      icon={require("~/components/About/images/github.png")}
      title="GitHub Repo"
      onOpen={() => window.open("https://github.com/1000hz/winmine-exe")}
    />
  </>
)

const Desktop = ({children}) => {
  const {tasks, createTask} = useTaskManager()
  useEventListener(global.document, "contextmenu", e => e.preventDefault())

  return (
    <>
      <StyledDesktop>
        {Object.values(tasks).map(task => (
          <task.application.AppComponent key={task.id} {...task} />
        ))}
        {icons}
      </StyledDesktop>
      <Taskbar tasks={tasks} />
    </>
  )
}

export default Desktop
