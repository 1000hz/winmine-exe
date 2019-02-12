import styled from "styled-components"

export const WindowFrame = styled.div.attrs(({x, y}) => ({
  style: {
    transform: `translate3d(${x}px, ${y}px, 0)`
  }
}))`
  visibility: ${props => (props.isMinimized ? "hidden" : "visible")};
  position: absolute;
  padding: ${props => (props.resizable ? 4 : 3)}px;
  background: ${props => props.theme.colors.gray[2]};
  box-shadow: inset -1px -1px 0 ${props => props.theme.colors.gray[0]},
    inset 1px 1px 0 ${props => props.theme.colors.gray[2]},
    inset -2px -2px 0 ${props => props.theme.colors.gray[1]},
    inset 2px 2px 0 ${props => props.theme.colors.gray[3]};
  outline: 0;
`

export default WindowFrame
