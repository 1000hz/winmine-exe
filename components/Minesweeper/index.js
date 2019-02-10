import createApplication from "~/lib/createApplication"
import Minesweeper from "./Minesweeper"

export default createApplication(Minesweeper, {
  title: "Minesweeper",
  iconSmall: require("./images/icon-sm.png"),
  iconLarge: require("./images/icon-lg.png"),
  singleton: true,
  canMaximize: false
})
