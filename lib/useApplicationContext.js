import {useContext} from "react"
import {ApplicationContext} from "~/lib/createApplication"

export default function useApplicationContext() {
  return useContext(ApplicationContext)
}
