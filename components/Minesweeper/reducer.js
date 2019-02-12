import handleActions from "~/lib/handleActions"
import {Board} from "./models"

export const defaultState = {
  settings: null,
  squares: null,
  started: false,
  won: false,
  exploded: null,
  revealed: [],
  flags: [],
  questions: [],
  time: 0
}

export const reducer = handleActions({
  NEW_GAME: (state, action) => {
    const {settings} = action.payload
    const boardArea = settings.width * settings.height
    return {
      ...defaultState,
      settings,
      revealed: [...Array(boardArea)],
      flags: [...Array(boardArea)],
      questions: [...Array(boardArea)],
      squares: new Board(settings.height, settings.width, settings.mineCount).squares
    }
  },
  REVEAL_SQUARE: (state, action) => {
    const {id} = action.payload

    if (state.won || state.exploded != null || state.revealed[id] || state.flags[id]) return state

    state = revealSquare(state, id)

    state = select(state).isMine(id)
      ? select(state).isStarted()
        ? explodeAndRevealMines(state, id)
        : revealSafeNeighbors(passMineToFirstSafeSquare(state, id), id)
      : revealSafeNeighbors(state, id)

    state = select(state).isStarted() ? state : startGame(state)

    state = select(state).isEverySafeSquareRevealed() ? winGame(state) : state

    return state
  },
  TOGGLE_FLAG: (state, action) => {
    const {id} = action.payload
    const flags = [...state.flags]
    const questions = [...state.questions]

    if (state.revealed[id]) return state

    if (!flags[id] && !questions[id]) {
      flags[id] = true
    } else if (flags[id]) {
      flags[id] = false
      questions[id] = true
    } else {
      questions[id] = false
    }

    return {
      ...state,
      flags,
      questions
    }
  },
  UPDATE_TIME: (state, action) => {
    if (!state.started || state.won || state.exploded != null) return state
    return {
      ...state,
      time: Math.min(state.time + 1, 999)
    }
  }
})

function select(state) {
  return {
    isStarted: () => state.started,
    isMine: id => state.squares[id].mine,
    isEverySafeSquareRevealed: () =>
      state.revealed.every((isRevealed, id) => (state.squares[id].mine ? !isRevealed : isRevealed))
  }
}

function startGame(state) {
  return {
    ...state,
    started: true,
    time: 1
  }
}

function passMineToFirstSafeSquare(state, id) {
  const squares = [...state.squares]
  const square = squares[id].clone()
  const safeSquare = squares.find(square => !square.mine).clone()
  const mine = square.mine

  square.mine = safeSquare.mine
  safeSquare.mine = mine

  squares[id] = square
  squares[safeSquare.id] = safeSquare

  square.board.squares = squares

  return {
    ...state,
    squares
  }
}

function revealSquare(state, id) {
  const revealed = [...state.revealed]
  const flags = [...state.flags]
  const questions = [...state.questions]

  revealed[id] = true
  flags[id] = false
  questions[id] = false

  return {
    ...state,
    revealed,
    flags,
    questions
  }
}

function explodeAndRevealMines(state, id) {
  const revealed = [...state.revealed]
  state.squares.filter(square => square.mine).forEach(mine => (revealed[mine.id] = true))
  return {
    ...state,
    revealed,
    exploded: id
  }
}

function revealSafeNeighbors(state, id) {
  const {flags, questions} = state
  const revealed = [...state.revealed]

  const visited = [state.squares[id]]
  while (visited.length) {
    const current = visited.shift()

    if (flags[current.id] || questions[current.id]) {
      continue
    }

    if (current.surroundingMines === 0) {
      current.neighbors.forEach(neighbor => {
        if (!revealed[neighbor.id] && !flags[neighbor.id]) {
          visited.push(neighbor)
          revealed[neighbor.id] = true
        }
      })
      revealed[current.id] = true
    }
  }

  return {
    ...state,
    revealed
  }
}

function winGame(state) {
  const flags = [...state.flags]
  state.squares.filter(square => square.mine).forEach(mine => (flags[mine.id] = true))

  return {
    ...state,
    flags,
    won: true
  }
}
