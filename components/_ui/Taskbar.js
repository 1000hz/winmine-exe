import {useState, useEffect, useCallback} from "react"
import styled from "styled-components"
import Button from "~/components/_ui/Button"
import useAudio from "~/lib/useAudio"

const StyledTaskbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  display: flex;
  background: ${props => props.theme.colors.gray[2]};
  border-top: 1px solid ${props => props.theme.colors.gray[3]};
  box-shadow: 0 -1px 0 ${props => props.theme.colors.gray[2]};
  color: ${props => props.theme.colors.gray[0]};
`

const StartMenuIcon = styled.img.attrs({
  src: "/static/flag.png"
})`
  margin-right: 3px;
`

const StartButton = styled(Button).attrs({
  children: (
    <>
      <StartMenuIcon />
      <span>Start</span>
    </>
  )
})`
  margin: 2px;
  font-weight: bold;
`

const SystemTray = styled.div`
  display: flex;
  align-items: center;
  margin: 2px;
  margin-left: auto;
  padding: 2px;
  border: 1px solid ${props => props.theme.colors.gray[1]};
  border-right-color: ${props => props.theme.colors.gray[3]};
  border-bottom-color: ${props => props.theme.colors.gray[3]};
`

function useSystemTime() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

const StyledClock = styled.div`
  margin: 0 6px;
`

const Clock = () => {
  const time = useSystemTime()
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US"

  return <StyledClock>{time.toLocaleTimeString(locale, {hour: "numeric", minute: "numeric"})}</StyledClock>
}

const Taskbar = ({tasks}) => {
  const audio = useAudio("/static/startup.mp3")
  const onStartButtonClick = useCallback(() => (audio.paused ? audio.play() : audio.load()))

  return (
    <StyledTaskbar>
      <StartButton onClick={onStartButtonClick} />
      <SystemTray>
        <Clock />
      </SystemTray>
    </StyledTaskbar>
  )
}

export default Taskbar
