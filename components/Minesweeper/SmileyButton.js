import styled from "styled-components"
import {SmileyHappy, SmileySurprise, SmileyDead, SmileySunglasses} from "./Icons"

const Button = styled.button.attrs({
  type: "button"
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: 0;
  padding: 0;
  background: ${props => props.theme.colors.gray[2]};
  border: 0;
  outline: 0;
  box-shadow: inset 1px 1px ${props => props.theme.colors.gray[1]},
    inset -1px -1px ${props => props.theme.colors.gray[0]},
    inset 2px 2px ${props => props.theme.colors.gray[3]},
    inset -2px -2px ${props => props.theme.colors.gray[1]},
    1px 1px ${props => props.theme.colors.gray[1]};

  &.win95-activeClick {
    transform: translate3d(1px, 1px, 0);
    box-shadow: inset -1px -1px ${props => props.theme.colors.gray[1]},
      inset 1px 1px ${props => props.theme.colors.gray[0]},
      inset -2px -2px ${props => props.theme.colors.gray[3]},
      inset 2px 2px ${props => props.theme.colors.gray[1]},
      -1px -1px ${props => props.theme.colors.gray[1]};
  }
`
const SmileyButton = ({isClicking, exploded, won, children, ...props}) => (
  <Button {...props}>
    {exploded ? (
      <SmileyDead />
    ) : won ? (
      <SmileySunglasses />
    ) : isClicking ? (
      <SmileySurprise />
    ) : (
      <SmileyHappy />
    )}
  </Button>
)

export default SmileyButton
