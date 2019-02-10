import styled from "styled-components"
import useApplicationContext from "~/lib/useApplicationContext"
import useTaskManager from "~/lib/useTaskManager"

const StyledTitleBar = styled.div`
  display: grid;
  grid-template-columns: min-content fit-content(100%) auto;
  align-items: center;
  justify-items: end;
  height: 18px;
  padding: 1px 3px 2px 2px;
  color: ${props => (props.active ? props.theme.colors.gray[3] : props.theme.colors.gray[2])};
  background: ${props => (props.active ? props.theme.colors.navy : props.theme.colors.gray[1])};
`

const Icon = styled.img`
  width: 16px;
  height: 16px;
`

const Title = styled.div`
  font-weight: bold;
  margin: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
`

const TitleBarButton = styled.button`
  margin: 0;
  padding: 2px;
  width: 16px;
  height: 14px;
  font-family: ${props => props.theme.fontFamilies.default};
  font-size: 8px;
  background: ${props => props.theme.colors.gray[2]};
  background-size: 13px 11px;
  background-position: 1px 1px;
  border: 0;
  box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[0]},
    inset 1px 1px 0 ${props => props.theme.colors.gray[3]},
    inset -2px -2px 0 ${props => props.theme.colors.gray[1]};
  outline: 0;

  .isLeftClicking &:active:hover {
    padding: 3px 1px 1px 3px;
    box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[3]},
      inset 1px 1px 0 ${props => props.theme.colors.gray[0]},
      inset -2px -2px 0 ${props => props.theme.colors.gray[2]},
      inset 2px 2px 0 ${props => props.theme.colors.gray[1]};
    background-position: 2px 2px;
    vertical-align: top;
  }
`

const MinimizeButton = styled(TitleBarButton)`
  background-image: url(${require("./images/minimize.png")});
`
const MaximizeButton = styled(TitleBarButton)`
  background-image: url(${({disabled}) =>
    require(`./images/maximize${disabled ? "-disabled" : ""}.png`)});
`
const HelpButton = styled(TitleBarButton)`
  background-image: url(${require("./images/help.png")});
`
const CloseButton = styled(TitleBarButton)`
  background-image: url(${require("./images/close.png")});
  margin-left: 2px;
`

const AppMinimizeButton = () => {
  const app = useApplicationContext()
  if (app.canMinimize === null) return null
  const {taskbarRef} = app

  return <MinimizeButton disabled={app.canMinimize === false} onClick={() => {}} />
}

const AppMaximizeButton = () => {
  const app = useApplicationContext()
  if (app.canMaximize === null) return null
  return <MaximizeButton disabled={app.canMaximize === false} onClick={() => {}} />
}

const AppCloseButton = () => {
  const app = useApplicationContext()
  const {endTask} = useTaskManager()
  if (app.canClose === null) return null
  return <CloseButton disabled={app.canClose === false} onClick={() => endTask(app.id)} />
}

export const DEFAULT_TITLEBAR_BUTTONS = (
  <>
    <AppMinimizeButton />
    <AppMaximizeButton />
    <AppCloseButton />
  </>
)

export const TitleBar = React.forwardRef(({active, icon, title, buttons}, ref) => (
  <StyledTitleBar ref={ref} active={active}>
    <Icon src={icon} />
    <Title>{title}</Title>
    <div>{buttons}</div>
  </StyledTitleBar>
))

export default TitleBar
