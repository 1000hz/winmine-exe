import styled from "styled-components"

const WindowDragOutline = styled.div.attrs(({delta, bounds}) => ({
  style: {
    transform: `translate3d(${bounds.x + delta.x}px, ${bounds.y + delta.y}px, 0)`,
    width: bounds.width,
    height: bounds.height
  }
}))`
  content: ${props => (props.isDragging ? "" : undefined)};
  position: absolute;
  top: 0;
  left: 0;
  border: 4px dotted #fff;
  mix-blend-mode: difference;
  border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKklEQVQ4je3OsQ0AAAiEQHT/nXEHtfyKiuRKFShg1b7MgH2ZI4gggkfBALLHgx1l0HN4AAAAAElFTkSuQmCC")
    repeat;
  border-image-slice: ${props => (props.resizableWindow ? 4 : 1)};
  border-image-width: ${props => (props.resizableWindow ? 4 : 1)}px;
  image-rendering: pixelated;
`

export default WindowDragOutline
