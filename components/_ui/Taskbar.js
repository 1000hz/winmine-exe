import styled from "styled-components"
import Button from "~/components/_ui/Button"

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

const Taskbar = ({tasks}) => (
  <StyledTaskbar>
    <StartButton />
  </StyledTaskbar>
)

export default Taskbar
