import styled from "styled-components"
import {squareSize} from "./Square"

const Board = styled.div`
  width: ${props => squareSize * props.width}px;
  height: ${props => squareSize * props.height}px;
  display: flex;
  flex-wrap: wrap;
`

export default Board
