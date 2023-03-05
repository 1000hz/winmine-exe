import styled from "styled-components"

import imgMineCount1 from "./images/1.png"
import imgMineCount2 from "./images/2.png"
import imgMineCount3 from "./images/3.png"
import imgMineCount4 from "./images/4.png"
import imgMineCount5 from "./images/5.png"
import imgMineCount6 from "./images/6.png"
import imgMineCount7 from "./images/7.png"
import imgMineCount8 from "./images/8.png"
import imgMine from "./images/mine.png"
import imgFlag from "./images/flag.png"
import imgQuestion from "./images/question.png"
import imgX from "./images/x.png"
import imgSmileyHappy from "./images/smiley-happy.png"
import imgSmileySurprise from "./images/smiley-surprise.png"
import imgSmileyDead from "./images/smiley-dead.png"
import imgSmileySunglasses from "./images/smiley-sunglasses.png"

const MINE_COUNT_IMGS = [
  imgMineCount1,
  imgMineCount2,
  imgMineCount3,
  imgMineCount4,
  imgMineCount5,
  imgMineCount6,
  imgMineCount7,
  imgMineCount8
]

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

export const MineCount = styled(Icon).attrs((props) => ({
  src: MINE_COUNT_IMGS[props.value - 1]?.src ?? undefined
}))``

export const Mine = styled(Icon).attrs({
  src: imgMine.src
})``

export const Flag = styled(Icon).attrs({
  src: imgFlag.src
})``

export const Question = styled(Icon).attrs({
  src: imgQuestion.src
})``

export const X = styled(Icon).attrs({
  src: imgX.src
})``

export const SmileyHappy = styled(Smiley).attrs({
  src: imgSmileyHappy.src
})``

export const SmileySurprise = styled(Smiley).attrs({
  src: imgSmileySurprise.src
})``

export const SmileyDead = styled(Smiley).attrs({
  src: imgSmileyDead.src
})``

export const SmileySunglasses = styled(Smiley).attrs({
  src: imgSmileySunglasses.src
})``
