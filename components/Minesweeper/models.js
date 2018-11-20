import {shuffle, take, clone} from "lodash-es"
import invariant from "invariant"

const SURROUNDING_MINES = Symbol("Square#surroundingMines")
const NEIGHBORS = Symbol("Square#neighbors")
const TO_ARRAY = Symbol("Board#toArray")

export class Square {
  constructor(board, x, y, mine = false) {
    this.x = x
    this.y = y
    this.board = board
    this.mine = mine
    this.id = y * board.width + x
  }

  get neighbors() {
    const {x, y, board} = this

    if (this[NEIGHBORS]) {
      return this[NEIGHBORS]
    }

    const minX = Math.max(0, x - 1)
    const minY = Math.max(0, y - 1)
    const maxX = Math.min(x + 1, board.width - 1)
    const maxY = Math.min(y + 1, board.height - 1)

    this[NEIGHBORS] = []

    for (let curY = minY; curY <= maxY; curY++) {
      for (let curX = minX; curX <= maxX; curX++) {
        if (curY !== y || curX !== x) {
          this[NEIGHBORS].push(board.get(curX, curY))
        }
      }
    }

    return this[NEIGHBORS]
  }

  get surroundingMines() {
    if (this[SURROUNDING_MINES]) {
      return this[SURROUNDING_MINES]
    }

    this[SURROUNDING_MINES] = this.neighbors.filter(
      square => square.mine
    ).length
    return this[SURROUNDING_MINES]
  }

  clone() {
    const cloned = clone(this)
    cloned[NEIGHBORS] = undefined
    cloned[SURROUNDING_MINES] = undefined
    return cloned
  }
}

export class Board {
  constructor(height, width, mineCount) {
    invariant(
      height > 0 && width > 0,
      `Invalid dimensions (${height}x${width}) for board. Must be greater than zero.`
    )
    invariant(
      mineCount > 0 && mineCount <= (height - 1) * (width - 1),
      `Invalid number of mines (${mineCount}) for ${height}x${width} board. Minimum of 1 and maximum of (height - 1)x(width - 1).`
    )

    this.height = height
    this.width = width
    this.mineCount = mineCount
    this.squares = [...Array(height * width)].map(
      (_, i) => new Square(this, Math.trunc(i % width), Math.trunc(i / height))
    )

    take(shuffle(this.squares), mineCount).forEach(
      square => (square.mine = true)
    )
  }

  get(x, y) {
    return this.squares[y * this.width + x]
  }

  toArray() {
    if (this[TO_ARRAY]) {
      return this[TO_ARRAY]
    }

    this[TO_ARRAY] = [...Array(this.height)].map((_, y) =>
      this.squares.slice(y * this.width, y * this.width + this.width)
    )

    return this[TO_ARRAY]
  }

  static generate({height, width, mineCount}) {
    const squares = [...Array(height * width)].map(
      (_, i) => new Square(this, Math.trunc(i % width), Math.trunc(i / height))
    )

    take(shuffle(this.squares), mineCount).forEach(
      square => (square.mine = true)
    )

    return squares
  }
}

export default Board
