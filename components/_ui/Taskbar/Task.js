import React, {useState} from "react"
import styled from "styled-components"
import TaskbarButton, {
  taskBoxShadow,
  taskActiveBoxShadow,
  taskClickedBoxShadow
} from "./TaskbarButton"
import TaskbarIcon from "./TaskbarIcon"
import Text from "~/components/_ui/Text"
import ditherBackground from "~/lib/ditherBackground"
import useEventListener from "~/lib/useEventListener"
import useTaskManager from "~/lib/useTaskManager"

const StyledTask = styled(TaskbarButton)`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 0 1 160px;
  height: 22px;
  padding: 3px 4px;
  margin: 2px;
  vertical-align: top;
  background: ${props => props.theme.colors.gray[2]};
  ${props =>
    props.isActive
      ? ditherBackground(props.theme.colors.gray[3], props.theme.colors.gray[2], 2)
      : ""};
  border: 0;
  box-shadow: ${props =>
    props.isActive ? taskActiveBoxShadow(props.theme) : taskBoxShadow(props.theme)};
  outline: 0;

  .isLeftClicking &:active:hover {
    box-shadow: ${props =>
      props.isActive ? taskActiveBoxShadow(props.theme) : taskClickedBoxShadow(props.theme)};
  }
`

const Task = React.forwardRef(({id, title, icon}, ref) => {
  const {activeTask, setTaskActiveStatus} = useTaskManager()
  const [isBeingClickedWhileActive, setIsBeingClickedWhileActive] = useState(false)
  const isCurrentlyActive = activeTask === id || isBeingClickedWhileActive

  useEventListener(ref, "click", () => setTaskActiveStatus(id, true))
  useEventListener(ref, "mousedown", () => {
    if (activeTask === id) setIsBeingClickedWhileActive(true)
    document.addEventListener("mouseup", () => setIsBeingClickedWhileActive(false), {once: true})
  })

  return (
    <StyledTask ref={ref} isActive={isCurrentlyActive}>
      {icon ? <TaskbarIcon src={icon} /> : ""} <Text bold={isCurrentlyActive}>{title}</Text>
    </StyledTask>
  )
})

export default Task
