import React from "react"
import styled from "styled-components"
import {IconWithLabel, ApplicationIcon} from "~/components/_ui/DesktopIcon"
import Taskbar from "~/components/_ui/Taskbar/Taskbar"
import Minesweeper from "~/components/Minesweeper"
import About from "~/components/About"
import useEventListener from "~/lib/useEventListener"
import useTaskManager from "~/lib/useTaskManager"
import useWindowManager from "~/lib/useWindowManager"

import imgGithub from "~/components/About/images/github.png"

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
      icon={imgGithub.src}
      title="GitHub Repo"
      onOpen={() => window.open("https://github.com/1000hz/winmine-exe")}
    />
  </>
)

const Desktop = () => {
  const {tasks, activeTask} = useTaskManager()
  const windows = useWindowManager(tasks, activeTask)

  useEventListener(global.document, "contextmenu", (e) => e.preventDefault())

  return (
    <>
      <StyledDesktop>
        {icons}
        {windows}
      </StyledDesktop>
      <Taskbar tasks={tasks} activeTask={activeTask} />
    </>
  )
}

export default Desktop
