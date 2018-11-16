import styled from "styled-components"
import {borderStyles, squareSize} from "./Square"

const Board = styled.div`
  width: ${props => squareSize * props.width}px;
  height: ${props => squareSize * props.height}px;
  display: flex;
  flex-wrap: wrap;

  :active .Square:hover {
    ${borderStyles.clicked};
  }
`

export default Board
