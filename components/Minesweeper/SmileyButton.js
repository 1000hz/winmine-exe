import {useRef} from "react"
import styled from "styled-components"
import {SmileyHappy, SmileySurprise, SmileyDead, SmileySunglasses} from "./Icons"
import useActive from "~/lib/useActive"

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

  box-shadow: inset -1px -1px ${props => props.theme.colors.gray[0]},
    inset 1px 1px ${props => props.theme.colors.gray[3]},
    inset -2px -2px ${props => props.theme.colors.gray[1]},
    1px 1px ${props => props.theme.colors.gray[1]}, -1px -1px ${props => props.theme.colors.gray[1]};

  .isLeftClicking &:active:hover {
    padding: 1px 0 0 2px;
    box-shadow: inset 1px 1px ${props => props.theme.colors.gray[0]},
      inset -1px -1px ${props => props.theme.colors.gray[3]},
      inset 2px 2px ${props => props.theme.colors.gray[1]},
      1px 1px ${props => props.theme.colors.gray[1]},
      -1px -1px ${props => props.theme.colors.gray[1]};
  }
`
const SmileyButton = ({gameRef, exploded, won, children, ...props}) => {
  const ref = useRef()
  const isClickingButton = useActive(ref)
  const isClickingGame = useActive(gameRef)

  return (
    <Button ref={ref} {...props}>
      {exploded ? (
        <SmileyDead />
      ) : won ? (
        <SmileySunglasses />
      ) : isClickingGame && !isClickingButton ? (
        <SmileySurprise />
      ) : (
        <SmileyHappy />
      )}
    </Button>
  )
}

export default SmileyButton
