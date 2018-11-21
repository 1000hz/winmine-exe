import React, {useState} from "react"

export const TaskManagerContext = React.createContext({})

const id = () =>
  Math.random()
    .toString(0x10)
    .slice(2, 10)

const TaskManager = ({children}) => {
  const [tasks, setTasks] = useState({})

  function createTask({application, isActive}) {
    if (application.singleton) {
      const running = Object.values(tasks).find(task => task.application === application)
      if (running) {
        return running.taskId
      }
    }

    const taskId = id()
    const windowRef = React.createRef()
    const taskbarRef = React.createRef()
    const task = {
      id: taskId,
      application,
      windowRef,
      taskbarRef,
      isActive,
      close: () => endTask(taskId)
    }

    setTasks(tasks => ({...tasks, [taskId]: task}))
    return taskId
  }

  async function endTask(taskId, {force}) {
    const nextTasks = {...tasks}
    const task = tasks[taskId]

    if (typeof task.taskWillEnd === "function" && !force) {
      await task.taskWillEnd()
    }

    delete tasks[taskId]
    setTasks(nextTasks)
  }

  return (
    <TaskManagerContext.Provider value={{tasks, createTask, endTask}}>
      {children}
    </TaskManagerContext.Provider>
  )
}

export default TaskManager
