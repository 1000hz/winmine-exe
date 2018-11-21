import React, {useCallback} from "react"
import styled from "styled-components"
import Minesweeper from "~/components/Minesweeper/Minesweeper"
import useEventListener from "~/lib/useEventListener"
import useTimeout from "~/lib/useTimeout"
import {useTaskManager} from "~/lib/useTaskManager"
import Taskbar from "~/components/_ui/Taskbar/Taskbar"

const StyledDesktop = styled.div`
  display: grid;
`

const Desktop = ({children}) => {
  const {tasks, createTask} = useTaskManager()
  useTimeout(() => createTask({application: Minesweeper, isActive: true}), 500)
  useEventListener("contextmenu", useCallback(e => e.preventDefault(), []))

  return (
    <>
      {Object.values(tasks).map(task => <task.application key={task.id} task={task} />)}
      <StyledDesktop />
      <Taskbar tasks={tasks} />
    </>
  )
}

export default Desktop
