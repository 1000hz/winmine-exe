import React from "react"
import styled from "styled-components"
import Text from "~/components/_ui/Text"
import TaskbarIcon from "./TaskbarIcon"
import useSystemTime from "~/lib/useSystemTime"

const StyledClock = styled.div`
  margin: 0 6px;
`

const Clock = () => {
  const time = useSystemTime()
  return (
    <StyledClock>
      <Text>{time.toLocaleTimeString(undefined, {hour: "numeric", minute: "numeric"})}</Text>
    </StyledClock>
  )
}

const StyledSystemTray = styled.div`
  display: flex;
  flex: none;
  align-items: center;
  margin: 2px;
  margin-left: auto;
  padding: 2px;
  box-shadow: inset -1px -1px ${props => props.theme.colors.gray[3]},
    inset 1px 1px ${props => props.theme.colors.gray[1]};
`

const SystemTray = ({trayTasks = []}) => {
  return (
    <StyledSystemTray>
      {trayTasks.map(trayTask => <TaskbarIcon key={trayTask.id} src={task.icon} />)}
      <Clock />
    </StyledSystemTray>
  )
}

export default SystemTray
