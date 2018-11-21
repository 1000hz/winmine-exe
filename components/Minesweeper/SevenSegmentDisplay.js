import React from "react"
import {times, flatten} from "lodash-es"
import styled from "styled-components"

/*
  Segment values are represented as a 7-bit bitmap where the
  least-significant bit represents the segment labeled "A"
  and the most-significant bit represents the segment labeled "G"
  in the following diagram:

                      A
                     ---
                  F | G | B
                     ---
                  E | D | C
                     ---
*/
const DISPLAY_SEGMENTS = {
  0: 0b0111111,
  1: 0b0000110,
  2: 0b1011011,
  3: 0b1001111,
  4: 0b1100110,
  5: 0b1101101,
  6: 0b1111101,
  7: 0b0000111,
  8: 0b1111111,
  9: 0b1101111,
  a: 0b1110111,
  b: 0b1111100,
  c: 0b0111001,
  d: 0b1011110,
  e: 0b1111001,
  f: 0b1110001,
  g: 0b0111101,
  h: 0b1110100,
  i: 0b0110000,
  j: 0b0011111,
  "-": 0b1000000
}

const DIM_RED = "#a80b55"

function segmentPixels({index, height, width, active, theme}) {
  if (active && index === 6) {
    width += 2
  }

  const color = active ? theme.colors.red : DIM_RED

  const shouldDisplayPixel = (x, y) => {
    const isShortenedPortionOfMiddleSegment =
      index === 6 && y < Math.trunc(height / 2) && (x <= 1 || x >= width - 2)
    const isDitheredAway = (x * x + (index != 0 && index != 3)) % 2 === 0

    return !isShortenedPortionOfMiddleSegment && (active || !isDitheredAway)
  }

  const pixels = times(height, y =>
    times(width - 2 * y, x => shouldDisplayPixel(x, y) && `${1 + x + y}px ${y}px ${color}`)
  )

  return `box-shadow: ${flatten(pixels)
    .filter(_ => _)
    .join()}`
}

function segmentPosition({index, height, width, active}) {
  // prettier-ignore
  return (
    index === 1 ? `transform: translate3d(${width + 1}px, 0, 0) rotate(90deg)` :
    index === 2 ? `transform: translate3d(${width + 1}px, ${width + 1}px, 0) rotate(90deg)` :
    index === 3 ? `transform: translate3d(${width + 1}px, ${2 * (width + 1)}px, 0) rotate(180deg)` :
    index === 4 ? `transform: translate3d(0, ${2 * (width + 1)}px, 0) rotate(270deg)` :
    index === 5 ? `transform: translate3d(0, ${width + 1}px, 0) rotate(270deg)` :
    index === 6 ? `transform: translate3d(${width + 1 + active}px, ${width + 2}px, 0) rotate(180deg)` : ""
  )
}

const Segment = styled.div.attrs(props => ({
  height: props.size,
  width: props.size * 3
}))`
  position: absolute;
  height: 1px;
  width: 1px;
  ${segmentPixels};
  ${segmentPosition};
`

const StyledDigit = styled.div`
  height: ${props => props.size * 6 + 3}px;
  width: ${props => props.size * 3 + 2}px;
  margin: 1px;
  position: relative;
`

const Digit = ({value, size}) => {
  return (
    <StyledDigit size={size}>
      {times(7, i => (
        <Segment key={i} index={i} size={size} active={(DISPLAY_SEGMENTS[value] >> i) & 1} />
      ))}
    </StyledDigit>
  )
}

const StyledSevenSegmentDisplay = styled.div`
  display: inline-flex;
  margin: 1px;
  background: ${props => props.theme.colors.gray[0]};
  box-shadow: 1px 1px ${props => props.theme.colors.gray[3]},
    -1px -1px ${props => props.theme.colors.gray[1]};
`

const SevenSegmentDisplay = ({value, digits}) => {
  const isNegative = value < 0
  const displayValues = Math.abs(value)
    .toString()
    .padStart(digits, "0")
    .split("")
    .slice(-digits)

  return (
    <StyledSevenSegmentDisplay>
      {displayValues.map((digit, i) => (
        <Digit key={i} value={isNegative && i === 0 ? "-" : digit} size={3} />
      ))}
    </StyledSevenSegmentDisplay>
  )
}

SevenSegmentDisplay.defaultProps = {
  digits: 3
}

export default SevenSegmentDisplay
