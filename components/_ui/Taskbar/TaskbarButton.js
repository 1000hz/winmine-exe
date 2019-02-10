import styled from "styled-components"

export const taskBoxShadow = theme =>
  `inset -1px -1px ${theme.colors.gray[0]},
   inset 1px 1px ${theme.colors.gray[3]},
   inset -2px -2px ${theme.colors.gray[1]};`
export const taskActiveBoxShadow = theme =>
  `inset -1px -1px ${theme.colors.gray[3]}, inset 1px 1px ${theme.colors.gray[0]},
   inset -2px -2px ${theme.colors.gray[2]}, inset 2px 2px ${theme.colors.gray[1]},
   inset 0 3px ${theme.colors.gray[3]};`
export const taskClickedBoxShadow = theme =>
  `inset -1px -1px ${theme.colors.gray[3]},
   inset 1px 1px ${theme.colors.gray[0]},
   inset -2px -2px ${theme.colors.gray[2]},
   inset 2px 2px ${theme.colors.gray[1]};`

const TaskbarButton = styled.button.attrs({
  type: "button"
})`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 0 1 160px;
  height: 22px;
  padding: 3px 4px;
  margin: 2px;
  vertical-align: top;
  background: ${props => props.theme.colors.gray[2]};
  border: 0;
  box-shadow: ${props => taskBoxShadow(props.theme)};
  outline: 0;
`

export default TaskbarButton
