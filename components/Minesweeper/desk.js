import styled from "styled-components"
import {borderStyles, squareSize} from "./square"

const Desk = styled.div`
  width: ${props => squareSize * props.boardSize}px;
  height: ${props => squareSize * props.boardSize}px;
  display: flex;
  flex-wrap: wrap;

  :active .Square:hover {
    ${borderStyles.clicked};
  }
`

export default Desk
