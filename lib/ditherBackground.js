import {css} from "styled-components"

const DEFAULT_COLOR2 = "transparent"

function ditherBackground(color, color2 = DEFAULT_COLOR2, size = 2) {
  if (typeof color2 === "number") {
    size = color2
    color2 = DEFAULT_COLOR2
  }

  return css`
    background-image: linear-gradient(
        45deg,
        ${color} 26%,
        transparent 25%,
        transparent 75%,
        ${color} 75%
      ),
      linear-gradient(45deg, ${color} 26%, ${color2} 25%, ${color2} 75%, ${color} 75%);
    background-position: 0 0, ${size / 2}px ${size / 2}px;
    background-size: ${size}px ${size}px;
  `
}

export default ditherBackground
