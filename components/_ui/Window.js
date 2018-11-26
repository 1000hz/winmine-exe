import React, {useState, useRef, useEffect} from "react"
import styled from "styled-components"
import useApplicationContext from "~/lib/useApplicationContext"
import useTaskManager from "~/lib/useTaskManager"
import useDraggable from "~/lib/useDraggable"
import useBoundingRect from "~/lib/useBoundingRect"

export const WindowFrame = styled.div.attrs(({x, y}) => ({
  style: {
    transform: `translate3d(${x}px, ${y}px, 0)`
  }
}))`
  position: absolute;
  padding: ${props => (props.resizable ? 4 : 3)}px;
  background: ${props => props.theme.colors.gray[2]};
  box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[0]},
    inset 1px 1px 0 ${props => props.theme.colors.gray[2]},
    inset -2px -2px 0 ${props => props.theme.colors.gray[1]},
    inset 2px 2px 0 ${props => props.theme.colors.gray[3]};
  outline: 0;
`

const WindowDragOutline = styled.div.attrs(({delta, bounds}) => ({
  style: {
    transform: `translate3d(${bounds.x + delta.x}px, ${bounds.y + delta.y}px, 0)`,
    width: bounds.width,
    height: bounds.height
  }
}))`
  content: ${props => (props.isDragging ? "" : undefined)};
  position: absolute;
  top: 0;
  left: 0;
  border: 4px dotted #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKklEQVQ4je3OsQ0AAAiEQHT/nXEHtfyKiuRKFShg1b7MgH2ZI4gggkfBALLHgx1l0HN4AAAAAElFTkSuQmCC")
    repeat;
  border-image-slice: ${props => (props.resizableWindow ? 4 : 1)};
  border-image-width: ${props => (props.resizableWindow ? 4 : 1)}px;
  image-rendering: pixelated;
`

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

const TitleBar = React.forwardRef(({active, icon, title, buttons}, ref) => (
  <StyledTitleBar ref={ref} active={active}>
    <Icon src={icon} />
    <Title>{title}</Title>
    <div>{buttons}</div>
  </StyledTitleBar>
))

const AppMaximizeButton = () => {
  const app = useApplicationContext()
  if (app.maximize === null) return null
  return <MaximizeButton disabled={app.maximize === false} onClick={() => {}} />
}

const AppCloseButton = () => {
  const app = useApplicationContext()
  const {endTask} = useTaskManager()
  if (app.close === null) return null
  return <CloseButton disabled={app.close === false} onClick={() => endTask(app.id)} />
}

const DEFAULT_TITLEBAR_BUTTONS = (
  <>
    <MinimizeButton />
    <AppMaximizeButton />
    <AppCloseButton />
  </>
)

const MenuBar = styled.div`
  display: flex;
`

const MenuBarItem = styled.button.attrs({
  type: "button"
})`
  margin: 1px 0;
  padding: 3px 6px;
  color: ${props => props.theme.colors.gray[0]};
  background: ${props => props.theme.colors.gray[2]};
  border: 0;
  font-family: ${props => props.theme.fontFamilies.default};
  outline: 0;

  ${MenuBar}:focus-within &:hover:not(:disabled) {
    color: ${props => props.theme.colors.gray[3]};
    background: ${props => props.theme.colors.navy};
  }

  :disabled {
    color: ${props => props.theme.colors.gray[1]};
  }
`

const Window = ({
  x,
  y,
  icon,
  title,
  titlebarButtons = DEFAULT_TITLEBAR_BUTTONS,
  menuItems,
  resizable,
  task,
  children
}) => {
  const app = useApplicationContext()
  useEffect(() => app.windowRef.current.focus(), [])
  const titleBarRef = useRef()
  const [position, setPosition] = useState({x: app.x, y: app.y})
  const {isDragging, delta} = useDraggable(titleBarRef, {
    onDragEnd({delta}) {
      setPosition(position => ({x: position.x + delta.x, y: position.y + delta.y}))
    }
  })
  const bounds = useBoundingRect(app.windowRef)

  return (
    <>
      <WindowFrame
        ref={app.windowRef}
        x={position.x}
        y={position.y}
        resizable={resizable}
        tabIndex="0"
      >
        <TitleBar
          ref={titleBarRef}
          active={true}
          title={title}
          buttons={titlebarButtons}
          icon={icon}
        />
        {menuItems ? (
          <MenuBar>
            {menuItems.map((menuItem, i) => <MenuBarItem key={i}>{menuItem}</MenuBarItem>)}
          </MenuBar>
        ) : (
          undefined
        )}
        {children}
      </WindowFrame>
      {isDragging && (
        <WindowDragOutline resizableWindow={resizable} bounds={bounds} delta={delta} />
      )}
    </>
  )
}

export default Window
