import {useState} from "react"
import Layout from "~/components/layout"
import Minesweeper from "~/components/Minesweeper/Minesweeper"

const BOARD_SIZE = 9

const Index = () => {
  return (
    <Layout title={`Minesweeper (active)`}>
      <Minesweeper size={BOARD_SIZE} />
    </Layout>
  )
}

export default Index
