import styled from "styled-components"

export const Text = styled.span`
  font-family: ${props => props.fontFamily || props.theme.fontFamilies.default};
  font-size: ${props => props.fontSize || props.theme.fontSizes[0]};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
`

export const TitleText = styled(Text).attrs({
  bold: true
})``

export default Text
