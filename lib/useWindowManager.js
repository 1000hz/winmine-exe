import {useState, useEffect} from "react"

function useWindowManager(tasks, activeTask) {
  const [windowOrder, setWindowOrder] = useState(Object.values(tasks))
  useEffect(
    () => {
      setWindowOrder(prevTasks => {
        return [
          ...prevTasks.filter(taskId => taskId in tasks && taskId !== activeTask),
          activeTask
        ].filter(_ => _)
      })
    },
    [tasks, activeTask]
  )

  const windows = windowOrder.map(taskId => {
    const task = tasks[taskId]
    if (!task || !task.application || !task.application.AppComponent) return
    const {AppComponent} = task.application
    return <AppComponent key={task.id} {...task} />
  })

  return windows
}

export default useWindowManager
