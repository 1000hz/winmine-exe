import createApplication from "~/lib/createApplication"
import About from "./About"

import imgIconLg from "./images/icon-lg.png"
import imgIconSm from "./images/icon-sm.png"

export default createApplication(About, {
  title: "About",
  iconLarge: imgIconLg.src,
  iconSmall: imgIconSm.src,
  canMaximize: false,
  x: 120,
  y: 120
})
