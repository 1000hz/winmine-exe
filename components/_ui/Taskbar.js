import {useCallback} from "react"
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

const Taskbar = ({tasks}) => {
  const audio = useAudio("/static/startup.mp3")
  const onStartButtonClick = useCallback(() => (audio.paused ? audio.play() : audio.load()))

  return (
    <StyledTaskbar>
      <StartButton onClick={onStartButtonClick} />
    </StyledTaskbar>
  )
}

export default Taskbar
