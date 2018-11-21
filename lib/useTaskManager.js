import {useContext} from "react"
import {TaskManagerContext} from "~/components/TaskManager"

export function useTaskManager() {
  return useContext(TaskManagerContext)
}

export default useTaskManager
