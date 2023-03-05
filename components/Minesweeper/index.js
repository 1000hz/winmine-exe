import createApplication from "~/lib/createApplication"
import Minesweeper from "./Minesweeper"

import imgIconSm from "./images/icon-sm.png"
import imgIconLg from "./images/icon-lg.png"

export default createApplication(Minesweeper, {
  title: "Minesweeper",
  iconSmall: imgIconSm.src,
  iconLarge: imgIconLg.src,
  singleton: true,
  canMaximize: false
})
