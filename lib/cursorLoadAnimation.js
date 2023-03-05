import {keyframes} from "styled-components"
import win95Theme from "~/lib/win95Theme"

const cursorLoadAnimation = keyframes`
  0% {
    cursor: ${win95Theme.cursors.wait};
  }

  20% {
    cursor: ${win95Theme.cursors.progress};
  }
`

export default cursorLoadAnimation
