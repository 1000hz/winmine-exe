import React, {useState, useRef, useEffect} from "react"
import WindowFrame from "./WindowFrame"
import WindowDragOutline from "./WindowDragOutline"
import TitleBar, {DEFAULT_TITLEBAR_BUTTONS} from "./TitleBar"
import TitleBarTransition from "./TitleBarTransition"
import {MenuBar, MenuBarItem} from "./MenuBar"
import Portal from "~/lib/Portal"
import useTaskManager from "~/lib/useTaskManager"
import useApplicationContext from "~/lib/useApplicationContext"
import useDraggable from "~/lib/useDraggable"
import useBoundingRect from "~/lib/useBoundingRect"
import useEventListener from "~/lib/useEventListener"
import {useOnMousedownOutside} from "~/lib/useOnClickOutside"

function useMinimize(titleBarTransitionRef) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  function toggleMinimize() {
    setIsTransitioning(true)
  }

  useEffect(
    () => {
      if (isTransitioning && titleBarTransitionRef.current) {
        const handler = () => {
          setIsTransitioning(false)
          setIsMinimized(isMinimized => !isMinimized)
        }
        titleBarTransitionRef.current.addEventListener("transitionend", handler, {once: true})
      }
    },
    [isTransitioning]
  )

  return {isTransitioning, isMinimized, toggleMinimize}
}

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
  const titleBarTransitionRef = useRef()
  const {isTransitioning, isMinimized, toggleMinimize} = useMinimize(titleBarTransitionRef)

  useEffect(() => setTaskActiveStatus(app.id, !isMinimized), [isMinimized])
  useEffect(
    () => {
      if (isMinimized && activeTask === app.id) {
        toggleMinimize()
      }
    },
    [activeTask]
  )

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
  useOnMousedownOutside(app.windowRef, () => setTaskActiveStatus(app.id, false))

  return (
    <app.ApplicationContext.Provider value={{...app, toggleMinimize}}>
      <WindowFrame
        ref={app.windowRef}
        x={position.x}
        y={position.y}
        resizable={resizable}
        tabIndex="0"
        isMinimized={isMinimized}
      >
        <TitleBar
          ref={titleBarRef}
          active={app.id === activeTask}
          title={title}
          buttons={titlebarButtons}
          icon={icon}
          onMinimize={toggleMinimize}
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
      {isTransitioning && (
        <Portal parent={app.windowRef.current.parentElement}>
          <TitleBarTransition
            ref={titleBarTransitionRef}
            title={title}
            icon={icon}
            srcRef={isMinimized ? app.taskbarRef : titleBarRef}
            destRef={isMinimized ? titleBarRef : app.taskbarRef}
          />
        </Portal>
      )}
    </app.ApplicationContext.Provider>
  )
}

export default Window
