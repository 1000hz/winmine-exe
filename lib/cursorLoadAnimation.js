import {keyframes} from "styled-components"
import win95Theme from "~/lib/win95Theme"

const cursorLoadAnimation = keyframes`
  0% {
    cursor: ${win95Theme.cursors.wait};
    cursor: ${win95Theme.cursors.webkitWait};
  }

  20% {
    cursor: ${win95Theme.cursors.progress};
    cursor: ${win95Theme.cursors.webkitProgress};
  }
`

export default cursorLoadAnimation
