import {Board, Square} from "./models"

describe("Square", () => {
  test("assigns values from its constructor", () => {
    const board = {}
    const square = new Square(board, 3, 4, true)
    expect(square.x).toBe(3)
    expect(square.y).toBe(4)
    expect(square.board).toBe(board)
    expect(square.mine).toBe(true)
  })

  test("returns neighbors", () => {
    const board = new Board(5, 5, 5)
    const {neighbors} = board.get(2, 2)

    expect(neighbors.length).toBe(8)
    expect(neighbors[0]).toBe(board.get(1, 1))
    expect(neighbors[7]).toBe(board.get(3, 3))
  })

  test("neighbors don't go out of bounds", () => {
    const board = new Board(5, 5, 5)
    const {neighbors} = board.get(0, 0)

    expect(neighbors.length).toBe(3)
    expect(neighbors[0]).toBe(board.get(1, 0))
  })

  test("returns surrounding mines", () => {
    const board = new Board(5, 5, 5)
    const square = board.get(2, 2)
    square.neighbors.forEach(square => (square.mine = true))

    expect(square.surroundingMines).toBe(8)
  })
})

describe("Board", () => {
  test("has the right number of squares", () => {
    const board = new Board(10, 10, 50)
    expect(board.squares).toHaveLength(100)
  })

  test("has the right number of mines", () => {
    const board = new Board(10, 10, 50)
    expect(board.squares.filter(square => square.mine)).toHaveLength(50)
  })

  test("get()", () => {
    const board = new Board(5, 5, 5)
    const square = board.get(3, 2)
    expect(square.x).toBe(3)
    expect(square.y).toBe(2)
  })

  test("generates squares in the right order", () => {
    const board = new Board(5, 5, 5)
    expect(board.squares[13]).toBe(board.get(3, 2))
  })

  test("toArray()", () => {
    const board = new Board(5, 5, 5)
    const array = board.toArray()
    expect(array).toHaveLength(5)
    expect(array[0]).toHaveLength(5)
    expect(array[0][0]).toBe(board.get(0, 0))
    expect(array[3][4]).toBe(board.get(4, 3))
  })

  test("invalid arguments throw an exception", () => {
    expect(() => new Board(5, 5, 0)).toThrow()
    expect(() => new Board(5, 5, 16)).not.toThrow()
    expect(() => new Board(5, 5, 17)).toThrow()
    expect(() => new Board(-5, 5, 5)).toThrow()
    expect(() => new Board(5, -5, 5)).toThrow()
  })
})
