import React, {useState, useRef, useEffect} from "react"
import WindowFrame from "./WindowFrame"
import WindowDragOutline from "./WindowDragOutline"
import TitleBar, {DEFAULT_TITLEBAR_BUTTONS} from "./TitleBar"
import {MenuBar, MenuBarItem} from "./MenuBar"
import Portal from "~/lib/Portal"
import useTaskManager from "~/lib/useTaskManager"
import useApplicationContext from "~/lib/useApplicationContext"
import useDraggable from "~/lib/useDraggable"
import useBoundingRect from "~/lib/useBoundingRect"
import useEventListener from "~/lib/useEventListener"
import {useOnMousedownOutside} from "~/lib/useOnClickOutside"

const Window = ({
  icon,
  title,
  titlebarButtons = DEFAULT_TITLEBAR_BUTTONS,
  menuItems,
  resizable,
  children
}) => {
  const {activeTask, setTaskActiveStatus} = useTaskManager()
  const app = useApplicationContext()
  const bounds = useBoundingRect(app.windowRef)
  const titleBarRef = useRef()
  const [position, setPosition] = useState({x: app.x, y: app.y})
  const {isDragging, delta} = useDraggable(titleBarRef, {
    onDragStart() {
      setTaskActiveStatus(app.id, true)
    },
    onDragEnd({delta}) {
      setPosition(position => ({x: position.x + delta.x, y: position.y + delta.y}))
    }
  })

  useEventListener(app.windowRef, "mousedown", () => setTaskActiveStatus(app.id, true))
  useEventListener(app.windowRef, "touchstart", () => setTaskActiveStatus(app.id, true), {
    passive: true
  })
  useOnMousedownOutside(app.windowRef, () => setTaskActiveStatus(app.id, false))

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
          active={app.id === activeTask}
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
