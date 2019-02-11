import styled from "styled-components"

const Icon = styled.img`
  height: 12px;
  width: 12px;
  pointer-events: none;
`

const Smiley = styled.img`
  width: 17px;
  height: 17px;
  pointer-events: none;
`

export const MineCount = styled(Icon).attrs(props => ({
  src: props.value ? require(`./images/${props.value}.png`) : undefined
}))``

export const Mine = styled(Icon).attrs({
  src: require("./images/mine.png")
})``

export const Flag = styled(Icon).attrs({
  src: require("./images/flag.png")
})``

export const Question = styled(Icon).attrs({
  src: require("./images/question.png")
})``

export const X = styled(Icon).attrs({
  src: require("./images/x.png")
})``

export const SmileyHappy = styled(Smiley).attrs({
  src: require("./images/smiley-happy.png")
})``

export const SmileySurprise = styled(Smiley).attrs({
  src: require("./images/smiley-surprise.png")
})``

export const SmileyDead = styled(Smiley).attrs({
  src: require("./images/smiley-dead.png")
})``

export const SmileySunglasses = styled(Smiley).attrs({
  src: require("./images/smiley-sunglasses.png")
})``
