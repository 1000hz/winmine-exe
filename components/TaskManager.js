import React, {useState} from "react"
import id from "~/lib/id"

export const TaskManagerContext = React.createContext({})

const LOADING_CLASSNAME = "isLoadingApplication"

const TaskManager = ({children}) => {
  const [tasks, setTasks] = useState({})
  const [activeTask, setActiveTask] = useState(null)

  function createTask({application, ...runtimeProps}) {
    if (application.singleton) {
      const running = Object.values(tasks).find((task) => task.application === application)
      if (running) {
        setActiveTask(running.id)
        return running.id
      }
    }

    document.body.classList.add(LOADING_CLASSNAME)
    setTimeout(() => document.body.classList.remove(LOADING_CLASSNAME), 1000)

    const taskId = id()
    const windowRef = React.createRef()
    const taskbarRef = React.createRef()
    const task = {
      ...runtimeProps,
      id: taskId,
      application,
      windowRef,
      taskbarRef
    }

    setTasks((tasks) => ({...tasks, [taskId]: task}))
    setActiveTask(taskId)
    return taskId
  }

  async function endTask(taskId, {force} = {}) {
    const nextTasks = {...tasks}
    const task = tasks[taskId]

    if (typeof task.taskWillEnd === "function" && !force) {
      await task.taskWillEnd()
    }

    delete nextTasks[taskId]
    setTasks(nextTasks)
  }

  function setTaskActiveStatus(taskId, isActive) {
    if (isActive && taskId !== activeTask) {
      setActiveTask(taskId)
    } else if (!isActive && taskId === activeTask) {
      setActiveTask(null)
    }
  }

  return (
    <TaskManagerContext.Provider
      value={{tasks, createTask, endTask, activeTask, setTaskActiveStatus}}
    >
      {children}
    </TaskManagerContext.Provider>
  )
}

export default TaskManager
