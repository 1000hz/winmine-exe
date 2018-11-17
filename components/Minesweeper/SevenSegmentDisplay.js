import React from "react"

/*
  Segment values are represented as a 7-bit bitmap where the
  least-significant bit represents the segment labeled "A"
  and the most-significant bit represents the segment labeled "G"
  in the following ASCII diagram:

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
  9: 0b1101111
}

const Segment = ({active}) => <div />

const SevenSegmentDisplay = ({value}) => {
  return <div>{value}</div>
}

export default SevenSegmentDisplay
