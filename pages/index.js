import Desktop from "~/components/Desktop"
import Minesweeper from "~/components/Minesweeper/Minesweeper"

const BOARD_SIZE = 9

const Index = () => {
  return (
    <Desktop>
      <Minesweeper size={BOARD_SIZE} />
    </Desktop>
  )
}

export default Index
