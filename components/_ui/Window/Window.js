import React, {useState, useRef, useEffect} from "react"
import WindowFrame from "./WindowFrame"
import WindowDragOutline from "./WindowDragOutline"
import TitleBar, {DEFAULT_TITLEBAR_BUTTONS} from "./TitleBar"
import {MenuBar, MenuBarItem} from "./MenuBar"
import Portal from "~/lib/Portal"
import useApplicationContext from "~/lib/useApplicationContext"
import useDraggable from "~/lib/useDraggable"
import useBoundingRect from "~/lib/useBoundingRect"

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
        <Portal parent={app.windowRef.current.parentElement}>
          <WindowDragOutline resizableWindow={resizable} bounds={bounds} delta={delta} />
        </Portal>
      )}
    </>
  )
}

export default Window
