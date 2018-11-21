import {reducer, defaultState} from "./reducer"

function generateBoardState(height, width, mineIds) {
  const state = reducer(defaultState, {
    type: "NEW_GAME",
    payload: {settings: {height, width, mineCount: 1}}
  })
  state.squares.forEach(square => (square.mine = false))
  mineIds.forEach(id => (state.squares[id].mine = true))
  return state
}

describe("NEW_GAME", () => {
  const EASY = {height: 8, width: 8, mineCount: 10}
  const action = settings => ({type: "NEW_GAME", payload: {settings}})

  test("returns a correct size board", () => {
    const {settings, revealed, flags, questions, squares} = reducer(defaultState, action(EASY))
    const area = settings.height * settings.width
    expect(settings).toEqual(EASY)
    expect(revealed).toHaveLength(area)
    expect(flags).toHaveLength(area)
    expect(questions).toHaveLength(area)
    expect(squares).toHaveLength(area)
  })
})

describe("REVEAL_SQUARE", () => {
  const action = id => ({type: "REVEAL_SQUARE", payload: {id}})

  test("adds empty square to revealed list", () => {
    const state = generateBoardState(5, 5, [0])
    const nextState = reducer(state, action(1))
    expect(nextState.revealed[1]).toBeTruthy()
    expect(nextState.won).toBeFalsy()
  })

  test("revealing the first square starts the game", () => {
    const state = generateBoardState(5, 5, [0])
    const nextState = reducer(state, action(1))
    expect(state.started).toBeFalsy()
    expect(state.time).toBe(0)
    expect(nextState.started).toBeTruthy()
    expect(nextState.time).toBe(1)
  })

  test("revealing a mine on the first turn moves the mine to the first safe square on the board", () => {
    const state = generateBoardState(5, 5, [0])
    const nextState = reducer(state, action(0))
    expect(state.squares[0].mine).toBeTruthy()
    expect(nextState.squares[0].mine).toBeFalsy()
    expect(nextState.squares[1].mine).toBeTruthy()
  })

  test("revealing a mine on subsequent turns explodes that square", () => {
    const state = generateBoardState(5, 5, [0])
    let nextState = reducer(state, action(1))
    nextState = reducer(nextState, action(0))
    expect(nextState.squares[0].mine).toBeTruthy()
    expect(nextState.squares[1].mine).toBeFalsy()
    expect(state.exploded).toBeNull()
    expect(nextState.exploded).toBe(0)
  })

  test("revealing a mine reveals all other mines", () => {
    const state = generateBoardState(5, 5, [0, 15, 20])
    let nextState = reducer(state, action(1))
    nextState = reducer(nextState, action(0))
    expect([0, 15, 20].every(id => nextState.revealed[id])).toBeTruthy()
  })

  test("revealing a square with no surrounding mines reveals all extended neighboring safe squares", () => {
    const state = generateBoardState(5, 5, [5, 6, 7, 8, 9])
    const nextState = reducer(state, action(15))
    expect(nextState.revealed.slice(0, 10).some(_ => _)).toBeFalsy()
    expect(nextState.revealed.slice(10).every(_ => _)).toBeTruthy()
  })

  test("a safe square that has been erroneously flagged does not get revealed by neighboring safe squares", () => {
    const state = generateBoardState(5, 5, [5, 6, 7, 8, 9])
    state.flags[24] = true
    const nextState = reducer(state, action(15))
    expect(nextState.revealed[24]).toBeFalsy()
    expect(nextState.flags[24]).toBeTruthy()
  })

  test("revealing a mine on the first turn still reveals all neighboring safe squares", () => {
    const state = generateBoardState(5, 5, [8])
    const nextState = reducer(state, action(8))
    expect(nextState.revealed.slice(1, 25).every(_ => _)).toBeTruthy()
  })

  test("revealing all safe squares wins the game", () => {
    const state = generateBoardState(5, 5, [0])
    const nextState = reducer(state, action(24))
    expect(nextState.revealed.slice(1, 25).every(_ => _)).toBeTruthy()
    expect(nextState.flags[0]).toBeTruthy()
    expect(nextState.won).toBeTruthy()
  })

  test("revealing an already revealed square is a no-op", () => {
    const state = generateBoardState(5, 5, [0])
    state.revealed[5] = true
    const nextState = reducer(state, action(5))
    expect(nextState).toBe(state)
  })

  test("revealing a flagged square is a no-op", () => {
    const state = generateBoardState(5, 5, [0])
    state.flags[5] = true
    const nextState = reducer(state, action(5))
    expect(nextState).toBe(state)
  })

  test("revealing a square after the game has been won is a no-op", () => {
    const state = generateBoardState(5, 5, [0])
    state.won = true
    const nextState = reducer(state, action(5))
    expect(nextState).toBe(state)
  })

  test("revealing a square after the game has been lost is a no-op", () => {
    const state = generateBoardState(5, 5, [0])
    state.exploded = 0
    const nextState = reducer(state, action(5))
    expect(nextState).toBe(state)
  })
})

describe("TOGGLE_FLAG", () => {
  const action = id => ({type: "TOGGLE_FLAG", payload: {id}})

  test("toggling a square in its default state sets a flag", () => {
    const state = generateBoardState(5, 5, [0])
    const nextState = reducer(state, action(5))
    expect(nextState.revealed[5]).toBeFalsy()
    expect(nextState.flags[5]).toBeTruthy()
    expect(nextState.questions[5]).toBeFalsy()
  })

  test("toggling a square that's already flagged replaces the flag with a question", () => {
    const state = generateBoardState(5, 5, [0])
    state.flags[5] = true
    const nextState = reducer(state, action(5))
    expect(nextState.revealed[5]).toBeFalsy()
    expect(nextState.flags[5]).toBeFalsy()
    expect(nextState.questions[5]).toBeTruthy()
  })

  test("toggling a square that's already questioned goes back to initial state", () => {
    const state = generateBoardState(5, 5, [0])
    state.questions[5] = true
    const nextState = reducer(state, action(5))
    expect(nextState.revealed[5]).toBeFalsy()
    expect(nextState.flags[5]).toBeFalsy()
    expect(nextState.questions[5]).toBeFalsy()
  })

  test("toggling a revealed square is a no-op", () => {
    const state = generateBoardState(5, 5, [0])
    state.revealed[5] = true
    const nextState = reducer(state, action(5))
    expect(nextState).toBe(state)
  })
})

describe("UPDATE_TIME", () => {
  test("increments time by one", () => {
    const state = reducer({time: 500, started: true}, {type: "UPDATE_TIME"})
    expect(state.time).toBe(501)
  })

  test("time maxes out at 999", () => {
    const state = reducer({time: 999, started: true}, {type: "UPDATE_TIME"})
    expect(state.time).toBe(999)
  })

  test("updating time before a game has started or ended is a no-op", () => {
    let state = reducer({time: 500, started: false}, {type: "UPDATE_TIME"})
    expect(state.time).toBe(500)
    state = reducer({time: 500, won: true}, {type: "UPDATE_TIME"})
    expect(state.time).toBe(500)
    state = reducer({time: 500, exploded: 5}, {type: "UPDATE_TIME"})
    expect(state.time).toBe(500)
  })
})
