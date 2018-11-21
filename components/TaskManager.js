import React, {useState, useLayoutEffect} from "react"

export const TaskManagerContext = React.createContext({})

const id = () =>
  Math.random()
    .toString(0x10)
    .slice(2, 10)

function useApplicationLoading() {
  const [isLoadingApplication, setIsLoadingApplication] = useState(false)
  useLayoutEffect(
    () => {
      if (typeof document !== "undefined") {
        const method = isLoadingApplication ? "add" : "remove"
        document.body.classList[method]("isLoadingApplication")
      }
    },
    [isLoadingApplication]
  )

  return setIsLoadingApplication
}

const TaskManager = ({children}) => {
  const [tasks, setTasks] = useState({})
  const isLoading = useApplicationLoading()

  function createTask({application, isActive}) {
    if (application.singleton) {
      const running = Object.values(tasks).find(task => task.application === application)
      if (running) {
        return running.taskId
      }
    }

    isLoading(true)
    setTimeout(() => isLoading(false), 1000)

    const taskId = id()
    const windowRef = React.createRef()
    const taskbarRef = React.createRef()
    const task = {
      id: taskId,
      application,
      windowRef,
      taskbarRef,
      isActive
    }

    setTasks(tasks => ({...tasks, [taskId]: task}))
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

  return (
    <TaskManagerContext.Provider value={{tasks, createTask, endTask}}>
      {children}
    </TaskManagerContext.Provider>
  )
}

export default TaskManager
