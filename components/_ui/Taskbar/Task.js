import React from "react"
import styled from "styled-components"
import TaskbarButton, {
  taskBoxShadow,
  taskActiveBoxShadow,
  taskClickedBoxShadow
} from "./TaskbarButton"
import TaskbarIcon from "./TaskbarIcon"
import Text from "~/components/_ui/Text"
import ditherBackground from "~/lib/ditherBackground"

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

const Task = React.forwardRef(({id, title, icon, isActive}, ref) => (
  <StyledTask ref={ref} isActive={isActive}>
    {icon ? <TaskbarIcon src={icon} /> : ""} <Text bold={isActive}>{title}</Text>
  </StyledTask>
))

export default Task
