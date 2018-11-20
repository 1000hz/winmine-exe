const handleActions = reducers => {
  return (state, action) => {
    const reducer = reducers[action.type]
    return reducer ? reducer(state, action) : state
  }
}

export default handleActions
